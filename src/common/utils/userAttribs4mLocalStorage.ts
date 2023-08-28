export function userAttribs(): string | null {
  const attribs = localStorage.getItem("token");
  return attribs;
}
