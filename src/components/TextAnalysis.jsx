import React, { useEffect, useState } from "react";
import { Button, Card, Space, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import {
  getCacheFromLocalStorage,
  updateLocalStorageBooksAndHistory,
} from "../utils/cache";
import { getSummary, getAnalysisOnSummary } from "../utils/groqApi";
import useFullText from "../hooks/useFullText";

export default ({ bookId, onError }) => {
  const cache = getCacheFromLocalStorage();
  const preferences = cache.preferences;
  const book = cache.books[bookId] ?? {};

  const fullText = useFullText({ bookId, onError });

  const [summary, setSummary] = useState("");
  const [sentimentAnalysis, setSentimentAnalysis] = useState("");
  const [keyCharacters, setKeyCharacters] = useState("");
  const [language, setLanguage] = useState("");

  const handleLoadSummary = () => {
    setSummary("");
    getSummary({
      chunkSize: preferences.CHUNK_SIZE,
      fullText,
      onError,
    })
      .then((responseContent) => {
        if (responseContent) {
          setSummary(responseContent);
          updateLocalStorageBooksAndHistory({
            book: { id: bookId, summary: responseContent },
          });
        }
      })
      .catch((error) => onError(error));
  };

  const handleLoadSentimentAnalysis = () => {
    setSentimentAnalysis("");
    getAnalysisOnSummary({
      prefixPrompt: preferences.PREFIX_PROMPT_SENTIMENT_ANALYSIS,
      summary,
      onError,
    })
      .then((responseContent) => {
        if (responseContent) {
          setSentimentAnalysis(responseContent);
          updateLocalStorageBooksAndHistory({
            book: { id: bookId, sentiment_analysis: responseContent },
          });
        }
      })
      .catch((error) => onError(error));
  };

  const handleLoadKeyCharacters = () => {
    setKeyCharacters("");
    getAnalysisOnSummary({
      prefixPrompt: preferences.PREFIX_PROMPT_KEY_CHARACTERS,
      summary,
      onError,
    })
      .then((responseContent) => {
        if (responseContent) {
          setKeyCharacters(responseContent);
          updateLocalStorageBooksAndHistory({
            book: { id: bookId, key_characters: responseContent },
          });
        }
      })
      .catch((error) => onError(error));
  };

  const handleLoadLanguage = () => {
    setLanguage("");
    getAnalysisOnSummary({
      prefixPrompt: preferences.PREFIX_PROMPT_LANGUAGE,
      summary,
      onError,
    })
      .then((responseContent) => {
        if (responseContent) {
          setLanguage(responseContent);
          updateLocalStorageBooksAndHistory({
            book: { id: bookId, language: responseContent },
          });
        }
      })
      .catch((error) => onError(error));
  };

  useEffect(() => {
    if (bookId) {
      setSummary(book.summary || "");
      setSentimentAnalysis(book.sentiment_analysis || "");
      setKeyCharacters(book.key_characters || "");
      setLanguage(book.language || "");
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId && fullText) {
      if (!book.summary) {
        handleLoadSummary();
      } else {
        setSummary(book.summary);
      }
    }
  }, [bookId, fullText]);

  useEffect(() => {
    if (bookId && summary) {
      if (!book.sentiment_analysis) {
        handleLoadSentimentAnalysis();
      } else {
        setSentimentAnalysis(book.sentiment_analysis);
      }
    }
  }, [bookId, summary]);

  useEffect(() => {
    if (bookId && summary) {
      if (!book.key_characters) {
        handleLoadKeyCharacters();
      } else {
        setKeyCharacters(book.key_characters);
      }
    }
  }, [bookId, summary]);

  useEffect(() => {
    if (bookId && summary) {
      if (!book.language) {
        handleLoadLanguage();
      } else {
        setLanguage(book.language);
      }
    }
  }, [bookId, summary]);

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Card
        loading={!summary}
        size="small"
        title="Summary"
        extra={
          <Tooltip placement="left" title="Regenerate Response">
            <Button
              icon={<ReloadOutlined />}
              size="small"
              onClick={handleLoadSummary}
            />
          </Tooltip>
        }
      >
        {summary}
      </Card>
      <Card
        loading={!sentimentAnalysis}
        size="small"
        title="Sentiment Analysis"
        extra={
          <Tooltip placement="left" title="Regenerate Response">
            <Button
              icon={<ReloadOutlined />}
              size="small"
              onClick={handleLoadSentimentAnalysis}
            />
          </Tooltip>
        }
      >
        {sentimentAnalysis}
      </Card>
      <Card
        loading={!keyCharacters}
        size="small"
        title="Key Characters"
        extra={
          <Tooltip placement="left" title="Regenerate Response">
            <Button
              icon={<ReloadOutlined />}
              size="small"
              onClick={handleLoadKeyCharacters}
            />
          </Tooltip>
        }
      >
        {keyCharacters}
      </Card>
      <Card
        loading={!language}
        size="small"
        title="Language"
        extra={
          <Tooltip placement="left" title="Regenerate Response">
            <Button
              icon={<ReloadOutlined />}
              size="small"
              onClick={handleLoadLanguage}
            />
          </Tooltip>
        }
      >
        {language}
      </Card>
    </Space>
  );
};
