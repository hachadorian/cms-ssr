const path = require("path");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const template = path.resolve(`src/templates/App.js`);
  // Query for recipe nodes to use in creating pages.
  return graphql(`
    {
      allNodePage {
        edges {
          node {
            drupal_id
            path {
              alias
            }
            body {
              processed
              summary
            }
            relationships {
              field_staff_contact {
                name
                field_display_name
                field_title
              }
              field_theme {
                field_primary_color
                field_secondary_color
                field_photo_credits
                relationships {
                  field_banner {
                    uri {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // Create pages for each node.
    result.data.allNodePage.edges.forEach(({ node }) => {
      process.env.GATSBY_ENV === "development" && createPage({
        path: `/${node.drupal_id}`,
        component: template,
        context: {
          guid: node.drupal_id,
          regex: `/^${node.path.alias.replace(/\//g, "/")}\//i`,
        },
      });
      node.path.alias &&
        createPage({
          path: node.path.alias,
          component: template,
          context: {
            slug: node.path.alias,
            regex: `/^${node.path.alias.replace(/\//g, "/")}\//i`,
          },
        });
    });
  });
};

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  actions: { createNode, createParentChildLink },
  createNodeId,
  createContentDigest,
}) => {
  if (node.name !== "nav") return;

  const iterateTree = async (nodes, parent) => {
    const generate = async (node) => {
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
      child.links && iterateTree(child.links, child);
    };

    for (const node of nodes) {
      await generate(node);
    }
  };

  try {
    console.time("Loading navigation");
    const nodeContent = await loadNodeContent(node);
    const arr = JSON.parse(nodeContent);
    console.timeEnd("Loading navigation");
    console.time("Building navigation");
    await iterateTree(arr, null);
    console.timeEnd("Building navigation");
    console.log("success Navigation built");
  } catch (error) {
    console.error(error);
  }
};

//Add optional fields to GraphQL
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type NavLinks implements Node {
      style: String
      class: String
    }
    type NavLinksLinks implements Node {
      style: String
      class: String
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig();
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom",
    };
  }
};
