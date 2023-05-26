import { withNavigationWatcher } from "./contexts/navigation";
import { Colors,Currencies, HomePage, ProfilePage } from "./pages";

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
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
