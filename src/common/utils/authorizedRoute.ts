export function userIsAuth(): boolean {
  let attribs = false;
  const parse = JSON.parse(localStorage.getItem("allowedRoutes") || "");
  if (
    window.location.pathname.includes("add-user") ||
    window.location.pathname.includes("update-user")
  ) {
    attribs = parse.includes("/management/list-users");
  } else if (window.location.pathname.includes("assign-permissions")) {
    attribs = parse.includes("/management/roles");
  } else {
    attribs = parse.includes(window.location.pathname);
  }

  return attribs;
}
