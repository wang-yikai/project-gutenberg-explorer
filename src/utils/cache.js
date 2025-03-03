import { DefaultPreferences } from "./constants";

export const getPreferencesFromLocalStorage = () => {
  const preferences = localStorage.getItem("preferences")
    ? {
        // ensures we have values for older cache if we ever support more preferences
        ...DefaultPreferences,
        ...JSON.parse(localStorage.getItem("preferences") || "{}"),
      }
    : DefaultPreferences;
  return preferences;
};

export const getCacheFromLocalStorage = () => {
  const books = Object.entries(
    JSON.parse(localStorage.getItem("books") || "{}")
  ).reduce((result, [key, value]) => {
    result[Number(key)] = value;
    return result;
  }, {});
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  return {
    books,
    history,
    preferences: getPreferencesFromLocalStorage(),
  };
};

export const getCachedBookHistory = (cache) => {
  return cache.history.map((id) => cache.books[id]);
};

export const updateLocalStorageBooksAndHistory = ({
  book,
  setHistoryResults,
}) => {
  const oldCache = getCacheFromLocalStorage();
  const cachedBook = oldCache.books[book.id] || {};
  const newBook = {
    ...cachedBook,
    ...book,
  };

  localStorage.setItem(
    "books",
    JSON.stringify({
      ...oldCache.books,
      [book.id]: newBook,
    })
  );
  localStorage.setItem(
    "history",
    JSON.stringify([
      ...oldCache.history.filter((id) => id !== book.id),
      book.id,
    ])
  );
  setHistoryResults &&
    setHistoryResults((oldHistory) => [
      ...oldHistory.filter((cachedBook) => cachedBook.id !== book.id),
      newBook,
    ]);
};

export const updateLocalStoragePreferences = (preferences) => {
  localStorage.setItem("preferences", JSON.stringify(preferences));
};
