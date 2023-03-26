// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mergeDeep = <T extends Record<string, any>>(a: T, b: T): T => {
  for (const key in b) {
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      const value = b[key];
      if (typeof value === "object" && value !== null && key in a) {
        a[key] = mergeDeep(a[key], value);
        continue;
      }

      a[key] = value;
    }
  }
  return a;
};

export default mergeDeep;
