export const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const includesSearch = (value: string | undefined, query: string) =>
  !!value && normalizeSearchText(value).includes(normalizeSearchText(query));
