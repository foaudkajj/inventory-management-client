import { withNavigationWatcher } from "./contexts/navigation";
import { HomePage, ProfilePage } from "./pages";

const routes = [
  {
    path: "/profile",
    component: <ProfilePage />,
  },
  {
    path: "/home",
    component: <HomePage />,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    component: withNavigationWatcher(route.component),
  };
});
