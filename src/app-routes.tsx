import { withNavigationWatcher } from "./contexts/navigation";
import { ProfilePage, HomePage, Currencies, Colors, Branches, GenericLists, GenericListItems } from "./pages";
import Users from "./pages/users/users";


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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
