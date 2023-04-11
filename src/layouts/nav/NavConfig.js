// routes
import Routes from "../../routes";

import { getUserCookie } from "../../utils/getCookies";
// _data

// ----------------------------------------------------------------------

export const PageLinks = [
  {
    order: "1",
    // subheader: 'Marketing',
    items: [
      { title: "NFTs", path: Routes.nfts},
      { title: "Collections", path: Routes.exploreCollections },
    ],
  },
  {
    order: "2",
    // subheader: 'Career',
    items: [
      { title: "NFTs", path: Routes.createnft },
      { title: "Collections", path: Routes.exploreCollections },
    ],
  },
  {
    order: "3",
    // subheader: 'Common',
    items: [
      { title: "Services", path: Routes.maintenance },
      { title: "Case Studies", path: Routes.maintenance },
      { title: "Case Study", path: Routes.maintenance },
      { title: "Blog Posts", path: Routes.maintenance },
      { title: "Blog Post", path: Routes.maintenance },
      { title: "About", path: Routes.maintenance },
      { title: "Contact", path: Routes.maintenance },
    ],
  },
  {
    order: "4",
    // subheader: 'E-Learning',
    items: [
      { title: "Services", path: Routes.maintenance },
      { title: "Case Studies", path: Routes.maintenance },
      { title: "Case Study", path: Routes.maintenance },
      { title: "Blog Posts", path: Routes.maintenance },
      { title: "Blog Post", path: Routes.maintenance },
      { title: "About", path: Routes.maintenance },
      { title: "Contact", path: Routes.maintenance },
    ],
  },
  {
    order: "5",
    // subheader: 'Travel',
    items: [
      { title: "Services", path: Routes.maintenance },
      { title: "Case Studies", path: Routes.maintenance },
      { title: "Case Study", path: Routes.maintenance },
      { title: "Blog Posts", path: Routes.maintenance },
      { title: "Blog Post", path: Routes.maintenance },
      { title: "About", path: Routes.maintenance },
      { title: "Contact", path: Routes.maintenance },
    ],
  },
  {
    order: "6",
    // subheader: 'Coming Soon',
    items: [
      { title: "Services", path: Routes.maintenance },
      { title: "Case Studies", path: Routes.maintenance },
      { title: "Case Study", path: Routes.maintenance },
      { title: "Blog Posts", path: Routes.maintenance },
      { title: "Blog Post", path: Routes.maintenance },
      { title: "About", path: Routes.maintenance },
      { title: "Contact", path: Routes.maintenance },
    ],
  },
];
export const FooterPageLinks = [
  {
    subheader: "Products",
    items: [
      { title: "Explore", path: Routes.nfts },
      // { title: "How it works", path: Routes.maintenance },
      // { title: "Contact Us", path: Routes.maintenance },
    ],
  },
  {
    subheader: "Support",
    items: [
      // { title: "Help Center", path: Routes.maintenance },
      { title: "Terms of services", path: Routes.termsOfService },
      { title: "Contact Us", path: Routes.contactUs },
      // { title: "Leagal", path: Routes.maintenance },
      // { title: "Privacy Policy", path: Routes.maintenance },
    ],
  },
];
const cookie = getUserCookie();
export const navConfig = [
  { title: "Explore", path: "/", children: [PageLinks[0]] },
  { title: "My Profile", path: Routes.myProfile },
  // {
  //   title: 'Pages',
  //   path: Routes.pages,
  //   children: [PageLinks[0], PageLinks[4], PageLinks[1], PageLinks[3], PageLinks[2], PageLinks[5]],
  // },
];
