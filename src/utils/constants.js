export const SearchSettingsView = Object.freeze({
  CATALOGUE_RESULTS: "catalogue results",
  RECENT_HISTORY: "recent history",
});

export const SearchSettingsMode = Object.freeze({
  TITLE_OR_AUTHOR: "title or author",
  ID: "id",
});

export const DefaultPreferences = Object.freeze({
  CHUNK_SIZE: 4800,
  PREFIX_PROMPT_SENTIMENT_ANALYSIS:
    "Perform a sentiment analysis of the provided text and include the overall sentiment (e.g., positive, neutral, or negative) and a confidence score",
  PREFIX_PROMPT_KEY_CHARACTERS:
    "Identify the main characters in the provided text, including a brief role or description for each character",
  PREFIX_PROMPT_LANGUAGE: "Identify the primary language of the provided text",
});
