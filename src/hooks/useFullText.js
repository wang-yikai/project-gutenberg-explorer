import { useEffect, useState } from "react";
import {
  getCacheFromLocalStorage,
  updateLocalStorageBooksAndHistory,
} from "../utils/cache";
import { getBookContentById } from "../utils/projectGutenbergApi";

export default ({ bookId, onError }) => {
  const cache = getCacheFromLocalStorage();
  const book = cache.books[bookId] || {};

  const [fullText, setFullText] = useState("");

  useEffect(() => {
    if (bookId) {
      if (!book.full_text) {
        getBookContentById(book.id, onError)
          .then((responseContent) => {
            if (typeof responseContent === "string") {
              setFullText(responseContent);
              updateLocalStorageBooksAndHistory({
                book: { id: bookId, full_text: responseContent },
              });
            }
          })
          .catch((error) => onError(error));
      } else {
        setFullText(book.full_text);
      }
    }
  }, [bookId]);

  return fullText;
};
