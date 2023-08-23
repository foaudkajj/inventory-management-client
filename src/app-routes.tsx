import { withNavigationWatcher } from "./contexts/navigation";
import {
  ProfilePage,
  HomePage,
  Currencies,
  Colors,
  Branches,
  GenericLists,
  GenericListItems,
  PaymentMethods,
  Users,
  SellingPage,
  Products,
  ProductCategories,
  Units,
} from "./pages";

const routes = [
  {
    path: "/profile",
    component: <ProfilePage />,
  },
  {
    path: "/home",
    component: <HomePage />,
  },
  {
    path: "/currencies",
    component: <Currencies />,
  },
  {
    path: "/colors",
    component: <Colors />,
  },
  {
    path: "/branches",
    component: <Branches />,
  },
  {
    path: "/users",
    component: <Users />,
  },
  {
    path: "/genericLists",
    component: <GenericLists />,
  },
  {
    path: "/genericListItems",
    component: <GenericListItems />,
  },
  {
    path: "/paymentMethods",
    component: <PaymentMethods />,
  },
  {
    path: "/sellingPage",
    component: <SellingPage />,
  },
  {
    path: "/products",
    component: <Products />,
  },
  {
    path: "/productCategories",
    component: <ProductCategories />,
  },
  {
    path: "/units",
    component: <Units />,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
