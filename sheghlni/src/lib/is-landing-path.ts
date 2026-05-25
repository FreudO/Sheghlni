export function isLandingPath(pathname: string): boolean {
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;
  return normalized === "" || normalized === "/";
}

export function isFullWidthPath(pathname: string): boolean {
  const normalized =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;
  return (
    isLandingPath(pathname) ||
    normalized.startsWith("/search") ||
    normalized.startsWith("/inbox")
  );
}
