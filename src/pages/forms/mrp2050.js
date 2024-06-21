import React from 'react';
import { graphql, Link } from "gatsby";
import Menu from "../../components/Menu.obsolete";

import StaffContact from '../../components/StaffContact';
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";


// import bgImage from "../../images/homepagebanner_2560.jpg"

import ReusableForm from '../../components/forms/ReusableForm';
import formConfig from '../../configs/forms/mrp2050.json';

const bgImage = "url(https://cdn.dvrpc.org/sites/default/files/2022-02/2050BannerLOGO_big-04.png), url(https://cdn.dvrpc.org/sites/default/files/2022-02/2050BannerBG_big-04.jpg)"
const title = "Major Regional Project Intake";


const MRPIntakeForm = ({
    data,
    location
  }) => {
    const { userUser, nav } = data;
    return (
      <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
        <h1 className="mt-1 max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-2 md:col-start-2 md:p-0">
          {title}
        </h1>
        <div className="px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:p-0">
          <ReusableForm formConfig={formConfig} />
        </div>
        <div className="flex flex-col p-4 italic print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:items-end md:p-0">
          <Menu data={nav} />
        </div>
      </div>
      <StaffContact staffContact={userUser} location={location} title={title} />
      </>
    );
  };
  
  export const Head = ({ data: { nodeTheme } }) =>
    HeadTemplate({
      title,
      summary:
        "Major Regional Projects",
      css: `
        --color-h1: #433C59;
        --color-h2: #433C59;
        --color-h3: #433C59;
        --color-highlight: #433C59;
        --bg-cover-image: ${bgImage};
        --height-banner: 20vw;`,
    });
  
  
  export const query = graphql`
    query {
      userUser(mail: { eq: "jdavis@dvrpc.org" }) {
        id
        mail
        name: field_display_name
        title: field_title
      }
      nodeTheme(id: { eq: "0efb8b9d-ee32-58c6-897d-0a50ae2b5ac4" }) {
        field_primary_color
        field_secondary_color
        field_third_color
        field_photo_credits
        relationships {
          field_banner_2x {
            uri {
              url
            }
          }
          field_banner {
            uri {
              url
            }
          }
        }
      }
      navItem(href: { eq: "/plan/" }) {
        ...navitem
        links {
          ...navitem
        }
        parent {
          ...navitem
          ... on NavItem {
            links {
              ...navitem
            }
          }
        }
      }
    }
  `;
  
  


export default MRPIntakeForm;
