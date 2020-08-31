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
