export const navigation: NavigationItem[] = [
  {
    text: "navigation.home-page",
    path: "/home",
    icon: "home",
  },
  {
    text: "navigation.core-data",
    icon: "folder",
    items: [
      {
        text: "navigation.colors",
        path: "/colors",
      },
      {
        text: "navigation.currencies",
        path: "/currencies",
      },
      {
        text: "navigation.branches",
        path: "/branches",
      },
      {
        text: "navigation.users",
        path: "/users",
      },
    ],
  },

];

type NavigationItem = {
  text: string;
  path?: string;
  icon?: string;
  items?: NavigationItem[];
};
