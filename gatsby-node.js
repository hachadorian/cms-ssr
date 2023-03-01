const path = require("path");

//Add regex to GraphQL query to match URLs in the navigation JSON
exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type !== "nav") return;

  const iterateTree = async (node, parent) => {
    const child = {
      ...node,
      id: createNodeId(node.href),
      children: [],
      parent: (parent && parent.id) || null,
      internal: {
        type: "NavItem",
        contentDigest: createContentDigest(node),
        description: node.href,
      },
    };
    await createNode(child);
    parent && createParentChildLink({ parent, child });
    if (child.links) {
      for (const grand of child.links) iterateTree(grand, child);
    }
  };

  try {
    const nodeContent = await loadNodeContent(node);
    const arr = JSON.parse(nodeContent);
    await iterateTree(arr, null);
  } catch (error) {
    console.error(error);
  }
};

//Add optional fields to GraphQL
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type nav implements Node {
        style: String
        class: String
      }
      type NavItem implements Node {
        style: String
        class: String
      }
    `;
  createTypes(typeDefs);
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  deletePage(page);
  const regex = page.context.path__alias
    ? `/^${page.context.path__alias.replace(/\//g, "/")}\/?$/i`
    : "/^/$/";

  const isDataCenterPage = new RegExp("^/data/?(?:[^/]+/?)*$").test(
    page.context.path__alias
  );
  if (isDataCenterPage) {
    return createPage({
      ...page,
      component: path.resolve(`src/pages/data/{NodePage.path__alias}.js`),
      context: {
        ...page.context,
        regex,
        layout: false,
      },
    });
  } else {
    return createPage({
      ...page,
      context: {
        ...page.context,
        regex,
        layout: !!page.context.__params,
      },
    });
  }
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    menu_link_content__menu_link_content: {
      entity: {
        type: ["node__data_center_featured_apps"],
        resolve: async (source, _, context) => {
          const { entries } = await context.nodeModel.findAll({
            type: "node__data_center_featured_apps",
          });

          return Array.from(entries).filter((node) => {
            // source.link.uri = entity:node/[nid]
            const [referenceType, nodeRef] = source?.link?.uri?.split(":");
            const [entityType, nodeId] = nodeRef?.split("/");

            // don't continue if source.link.uri doesn't follow pattern
            if (referenceType !== "entity" || entityType !== "node") {
              return false;
            }
            return node?.drupal_internal__nid?.toString() === nodeId;
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};
