export const getBookContentById = async (bookId, onError) =>
  await fetch(`https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`)
    .then((response) => response.text())
    .catch((error) => onError(error));

export const getBookMetaDataById = async (bookId, onError) =>
  await fetch(`https://gutendex.com/books/?ids=${bookId}`)
    .then((response) => response.json())
    .catch((error) => onError(error));

export const getBookMetaDataByTitle = async (title, onError) =>
  await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(title)}`)
    .then((response) => response.json())
    .catch((error) => onError(error));
