export const queryStringify = (
  query: Record<string, string | number | boolean>
): string => {
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
};
