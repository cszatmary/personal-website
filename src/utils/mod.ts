export const constants = Object.freeze({
  email: "cs@christopherszatmary.com",
  github: "https://github.com/cszatmary",
  linkedin: "https://www.linkedin.com/in/christopherszatmary",
});

export function classNames(
  staticNames: string,
  ...additionalNames: (string | undefined)[]
): string {
  const names = [staticNames.trim()];
  for (const n of additionalNames) {
    if (typeof n === "string") {
      names.push(n);
    }
  }

  return names.join(" ");
}
