export const getMatchingAuthors = (value, authors) =>
  authors?.filter((author) =>
    author.name.toLowerCase().includes(value.toLowerCase())
  );
