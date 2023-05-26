import { withNavigationWatcher } from "./contexts/navigation";
import { Currencies, HomePage, ProfilePage } from "./pages";

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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
