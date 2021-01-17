export const constants = Object.freeze({
  email: "cs@christopherszatmary.com",
  github: "https://github.com/cszatmary",
  linkedin: "https://www.linkedin.com/in/christopherszatmary",
});

/**
 * classNames creates a single class string from the given arguments.
 * It will filter any `undefined` values.
 */
export function classNames(...names: (string | undefined)[]): string {
  const buf: string[] = [];
  for (const n of names) {
    if (typeof n === "string") {
      buf.push(n.trim());
    }
  }
  return buf.join(" ");
}
