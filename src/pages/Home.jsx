import React, { useEffect, useState } from "react";
import { Card, Empty, List, notification, Row, Col, Modal } from "antd";
import Header from "../components/Header";
import Search from "../components/Search";
import Details from "../components/Details";
import Result from "../components/Result";
import {
  getBookMetaDataById,
  getBookMetaDataByTitle,
} from "../utils/projectGutenbergApi";
import {
  getCacheFromLocalStorage,
  getCachedBookHistory,
  updateLocalStorageBooksAndHistory,
} from "../utils/cache";
import { SearchSettingsView, SearchSettingsMode } from "../utils/constants";
import { getMatchingAuthors } from "../utils/filter";

export default () => {
  const [searchValue, setSearchValue] = useState("");
  const [catalogueResults, setCatalogueResults] = useState([]);
  const [historyResults, setHistoryResults] = useState([]);

  const [searchSettings, setSearchSettings] = useState({
    view: SearchSettingsView.CATALOGUE_RESULTS,
    mode: SearchSettingsMode.TITLE_OR_AUTHOR,
  });

  const [loading, setLoading] = useState(false);
  const [currentBookId, setCurrentBookId] = useState(null);

  const [notificationApi, notificationContext] = notification.useNotification();

  useEffect(() => {
    const cache = getCacheFromLocalStorage();
    setHistoryResults(getCachedBookHistory(cache));
  }, []);

  const handleChangeSearchSettings = (settings) => {
    setSearchSettings(settings);
  };

  const handleOnCacheClear = () => {
    localStorage.clear();
    setHistoryResults([]);
    notificationApi.success({
      message: "Successfully cleared cache!",
    });
  };

  const handleError = (error) => {
    console.error(error);
    notificationApi.error({
      message: "Error:",
      description: error.message,
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    notificationApi.success({
      message: "Successfully copied to clipboard!",
    });
  };

  const handleOnSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOnSearch = async (value) => {
    const cache = getCacheFromLocalStorage();
    const cachedBookHistory = getCachedBookHistory(cache);
    if (!value) {
      if (searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS) {
        // prevent loading catalogue results if value is cleared
        return;
      } else {
        // show the complete history
        setHistoryResults(cachedBookHistory);
        return;
      }
    }

    setLoading(true);
    if (searchSettings.mode === SearchSettingsMode.TITLE_OR_AUTHOR) {
      if (searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS) {
        const currentSuggestions = await getBookMetaDataByTitle(
          value,
          handleError
        );
        setCatalogueResults(currentSuggestions.results);
      } else {
        setHistoryResults(
          cachedBookHistory.filter(
            (book) =>
              book.title?.toLowerCase().includes(value.toLowerCase()) ||
              getMatchingAuthors(value, book.authors).length
          )
        );
      }
    }
    // if we are searching by id, check the cached value to avoid querying the api
    else if (Number(value) in cache.books) {
      const id = Number(value);
      const cachedData = cachedBookHistory.filter((book) => book.id === id);
      if (searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS) {
        setCatalogueResults(cachedData);
      } else {
        setHistoryResults(cachedData);
      }
    } else if (searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS) {
      const currentSuggestions = await getBookMetaDataById(value, handleError);
      setCatalogueResults(currentSuggestions.results);
    } else {
      // if we're looking by ID in the recent history by it's not in cache, then there's no result
      setHistoryResults([]);
    }
    setLoading(false);
  };

  const handleCloseBookDetails = () => {
    setCurrentBookId(null);
  };

  const handleOpenBookDetails = (newBook) => {
    updateLocalStorageBooksAndHistory({
      book: newBook,
      setHistoryResults,
    });
    setCurrentBookId(newBook.id);
  };

  const currentResults =
    searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS
      ? catalogueResults
      : // display the recent books in reverse chronological order
        historyResults.toReversed();
  return (
    <>
      {notificationContext}
      <Header />
      <Search
        searchSettings={searchSettings}
        onChangeSearchSettings={handleChangeSearchSettings}
        onSearch={handleOnSearch}
        onSearchValueChange={handleOnSearchValueChange}
        onCacheClear={handleOnCacheClear}
        loading={loading}
      />
      <Row
        justify="center"
        style={{
          marginTop: 16,
        }}
      >
        <Col span={14}>
          <Card>
            {currentResults?.length || loading ? (
              <List
                pagination={{ pageSize: 10 }}
                loading={loading}
                renderItem={(book) => (
                  <Result
                    book={book}
                    searchValue={searchValue}
                    onDetailsClick={handleOpenBookDetails}
                  />
                )}
                dataSource={currentResults}
              />
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
      </Row>
      <Modal
        title="Book Details"
        open={currentBookId}
        footer={null}
        maskClosable={false}
        onCancel={handleCloseBookDetails}
        width="75%"
      >
        <Details
          bookId={currentBookId}
          onError={handleError}
          onCopy={handleCopy}
        />
      </Modal>
    </>
  );
};
