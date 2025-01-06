import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiLink,
} from "react-icons/fi";
import getAdminId from '../auth.js';
const adminRole = getAdminId();
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },

  {
    icon: FiSlack,
    name: "Catalog",
    roles: ["Admin"],
    routes: [
      {
        path: "/products",
        name: "Products",
      },
      {
        path: "/categories",
        name: "Categories",
      },
      {
        path: "/attributes",
        name: "Attributes",
      },
      {
        path: "/coupons",
        name: "Coupons",
      },
    ],
  },

  {
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
    roles: ["Admin"],
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
    roles: ["Admin"],
  },

  {
    path: "/platforms",
    icon: FiCompass,
    name: "Platform",
    roles: ["SuperAdmin"],
  },

  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
    roles: ["SuperAdmin"],
  },

  {
    path: "/subscriptions",
    icon: FiUser,
    name: "Subscriptions",
    roles: ["SuperAdmin"],
  },

  {
    path: "/settings",
    icon: FiSettings,
    name: "StoreSetting",
    roles: ["Admin"],
  },
  {
    icon: FiGlobe,
    name: "International",
    routes: [
      {
        path: "/languages",
        name: "Languages",
      },
      {
        path: "/currencies",
        name: "Currencies",
      },
    ],
    roles: ["SuperAdmin"],
  },
  {
    path: "/integrations",
    icon: FiLink,
    name: "Integrations",
  },
  // {
  //   icon: FiTarget,
  //   name: "ViewStore",
  //   path: "http://localhost:3000",
  //   outside: "store",
  // },

  // {
  //   icon: FiSlack,
  //   name: "Pages",
  //   routes: [
  //     // submenu

  //     {
  //       path: "/404",
  //       name: "404",
  //     },
  //     {
  //       path: "/coming-soon",
  //       name: "Coming Soon",
  //     },
  //   ],
  // },
].filter(item => !item.roles || item.roles.includes(adminRole));

export default sidebar;
