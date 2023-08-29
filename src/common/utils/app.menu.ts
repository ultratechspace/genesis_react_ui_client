export const menus: any = [
  {
    title: "Dashboard",
    icon: "HomeIcon",
    routeName: "/dashboard",
    guard: true,
    childMenus: [{ title: "Dashboard", routeName: "", noDrawer: false }],
  },
  {
    title: "Enrollment",
    icon: "HomeIcon",
    routeName: "/enrollment",
    guard: true,
    childMenus: [{ title: "Enrollment", routeName: "", noDrawer: false }],
  },
];
