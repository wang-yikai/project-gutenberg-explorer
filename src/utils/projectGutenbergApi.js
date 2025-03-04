export const getBookContentById = async (bookId, onError) =>
  await fetch(
    `${
      // get around the CORS error
      import.meta.env.VITE_CORS_PROXY_URL
    }https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.text();
    })
    .catch((error) => onError(error));

export const getBookMetaDataById = async (bookId, onError) =>
  await fetch(`https://gutendex.com/books/?ids=${bookId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => onError(error));

export const getBookMetaDataByTitle = async (title, onError) =>
  await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(title)}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => onError(error));
