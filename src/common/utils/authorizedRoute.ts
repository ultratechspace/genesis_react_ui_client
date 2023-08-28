export function userIsAuth(): boolean {
  let attribs = false;
  const parse = JSON.parse(localStorage.getItem("allowedRoutes") || "");
  attribs = parse.includes(window.location.pathname);
  return attribs;
}
