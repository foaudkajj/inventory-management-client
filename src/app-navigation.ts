export const navigation = [
  {
    text: "navigation.home-page",
    path: "/home",
    icon: "home",
  },
  {
    text: "navigation.management",
    icon: "fa-solid fa-people-roof",
    items: [
      {
        text: "navigation.class-lesson",
        icon: "fa-solid fa-user",
        path: "/class-lesson",
      },
      {
        text: "navigation.users",
        icon: "fa-solid fa-users",
        path: "/users",
      },
    ],
  },
  {
    text: "navigation.student-management",
    icon: "fa-solid fa-users",
    items: [
      {
        text: "navigation.students",
        icon: "fa-solid fa-user",
        path: "/students",
      },
      {
        text: "navigation.student-evaluation",
        icon: "fa-solid fa-chalkboard-user",
        path: "/student-evaluation",
      },
      {
        text: "navigation.installments",
        icon: "fa-solid fa-credit-card",
        path: "/installments",
      },
    ],
  },
  {
    text: "navigation.staff-management",
    icon: "fa-solid fa-person-chalkboard",
    items: [
      {
        text: "navigation.teachers",
        icon: "fa-solid fa-chalkboard-user",
        path: "/teachers",
      },
    ],
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
