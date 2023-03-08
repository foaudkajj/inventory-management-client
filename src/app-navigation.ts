export const navigation: NavigationItem[] = [
  {
    text: "navigation.home-page",
    path: "/home",
    icon: "home",
  },
  // {
  //   text: "Examples",
  //   icon: "folder",
  //   items: [
  //     {
  //       text: "Profile",
  //       path: "/profile",
  //     },
  //     {
  //       text: "Display Data",
  //       path: "/display-data",
  //     },
  //   ],
  // },
];

type NavigationItem = {
  text: string;
  path: string;
  icon: string;
  items?: NavigationItem[];
};
