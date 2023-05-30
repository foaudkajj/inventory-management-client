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
        text: "Colors",
        path: "/colors",
      },
      {
        text: "Currencies",
        path: "/currencies",
      },
      {
        text: "Branches",
        path: "/branches",
      },
      {
        text: "Users",
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
