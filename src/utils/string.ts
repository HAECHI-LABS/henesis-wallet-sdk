export const toSnakeCase = (s: string) =>
  s.replace(/[\w]([A-Z])/g, m => `${m[0]}_${m[1]}`).toLowerCase();

export const toCamelCase = (s: string) =>
  s.replace(/([-_][a-z])/gi, ($1) =>
    $1.toUpperCase().replace("-", "").replace("_", "")
  );
