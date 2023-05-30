import { withNavigationWatcher } from "./contexts/navigation";
import { Branches, Colors,Currencies, HomePage, ProfilePage } from "./pages";
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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
