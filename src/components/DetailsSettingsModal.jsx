import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Slider,
  Modal,
  Space,
  Typography,
  Tooltip,
  Popconfirm,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { DefaultPreferences } from "../utils/constants";
import {
  getPreferencesFromLocalStorage,
  updateLocalStoragePreferences,
} from "../utils/cache";

export default ({ open, onClose, onCacheClear }) => {
  const [chunkSize, setChunkSize] = useState(DefaultPreferences.CHUNK_SIZE);
  const [prefixPromptSentimentAnalysis, setPrefixPromptSentimentAnalysis] =
    useState(DefaultPreferences.PREFIX_PROMPT_SENTIMENT_ANALYSIS);
  const [prefixPromptKeyCharacters, setPrefixPromptKeyCharacters] = useState(
    DefaultPreferences.PREFIX_PROMPT_KEY_CHARACTERS
  );
  const [prefixPromptLanguage, setPrefixPromptLanguage] = useState(
    DefaultPreferences.PREFIX_PROMPT_LANGUAGE
  );

  const handleResetChunkSize = () => {
    setChunkSize(DefaultPreferences.CHUNK_SIZE);
  };

  const handleResetPrefixPromptSentimentAnalysis = () => {
    setPrefixPromptSentimentAnalysis(
      DefaultPreferences.PREFIX_PROMPT_SENTIMENT_ANALYSIS
    );
  };

  const handleResetPrefixPromptKeyCharacters = () => {
    setPrefixPromptKeyCharacters(
      DefaultPreferences.PREFIX_PROMPT_KEY_CHARACTERS
    );
  };

  const handleResetPrefixPromptLanguage = () => {
    setPrefixPromptLanguage(DefaultPreferences.PREFIX_PROMPT_LANGUAGE);
  };

  const handleOnCacheClear = () => {
    onClose();
    onCacheClear();
    handleResetChunkSize();
    handleResetPrefixPromptSentimentAnalysis();
    handleResetPrefixPromptKeyCharacters();
    handleResetPrefixPromptLanguage();
  };

  const handleCancel = () => {
    onClose();
    const preferences = getPreferencesFromLocalStorage();
    setChunkSize(preferences.CHUNK_SIZE);
    setPrefixPromptSentimentAnalysis(
      preferences.PREFIX_PROMPT_SENTIMENT_ANALYSIS
    );
    setPrefixPromptKeyCharacters(preferences.PREFIX_PROMPT_KEY_CHARACTERS);
    setPrefixPromptLanguage(preferences.PREFIX_PROMPT_LANGUAGE);
  };

  const handleApply = () => {
    onClose();
    updateLocalStoragePreferences({
      CHUNK_SIZE: chunkSize,
      PREFIX_PROMPT_SENTIMENT_ANALYSIS: prefixPromptSentimentAnalysis,
      PREFIX_PROMPT_KEY_CHARACTERS: prefixPromptKeyCharacters,
      PREFIX_PROMPT_LANGUAGE: prefixPromptLanguage,
    });
  };

  return (
    <Modal
      open={open}
      title="Settings"
      onCancel={handleCancel}
      footer={
        <Row justify="space-between">
          <Col>
            <Popconfirm
              title="Warning:"
              description={
                <>
                  Are you sure you want to clear the cache?
                  <br />
                  This will delete all preferences and recent history.
                </>
              }
              onConfirm={handleOnCacheClear}
              okText="Yes"
              cancelText="No"
            >
              <Button key="clear_cache" danger>
                Clear Cache
              </Button>
            </Popconfirm>
          </Col>
          <Col>
            <Button
              key="cancel"
              type="primary"
              onClick={handleCancel}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button key="apply" onClick={handleApply}>
              Apply Settings
            </Button>
          </Col>
        </Row>
      }
    >
      <Form>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            marginTop: 16,
          }}
        >
          <Row>
            <Row justify="space-between" style={{ width: "100%" }}>
              <Col>
                <Typography.Text>
                  Chunk size for summarizing text:
                </Typography.Text>
              </Col>
              <Col>
                <Tooltip placement="left" title="Reset to Default">
                  <Button
                    icon={<ReloadOutlined />}
                    size="small"
                    onClick={handleResetChunkSize}
                  />
                </Tooltip>
              </Col>
            </Row>
            <Row style={{ width: "100%" }}>
              <Slider
                min={2400}
                max={7200}
                step={100}
                value={chunkSize}
                onChange={(value) => setChunkSize(value)}
                style={{ width: "100%" }}
              />
            </Row>
          </Row>
          <Row justify="space-between" style={{ width: "100%" }}>
            <Col>
              <Typography.Text>
                Prefix prompt for sentiment analysis:
              </Typography.Text>
            </Col>
            <Col>
              <Tooltip placement="left" title="Reset to Default">
                <Button
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={handleResetPrefixPromptSentimentAnalysis}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Input.TextArea
              value={prefixPromptSentimentAnalysis}
              onChange={(event) =>
                setPrefixPromptSentimentAnalysis(event.target.value)
              }
              autoSize={{ minRows: 3 }}
            />
          </Row>
          <Row></Row>
          <Row justify="space-between" style={{ width: "100%" }}>
            <Col>
              <Typography.Text>
                Prefix prompt for identifying key characters:
              </Typography.Text>
            </Col>
            <Col>
              <Tooltip placement="left" title="Reset to Default">
                <Button
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={handleResetPrefixPromptKeyCharacters}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Input.TextArea
              value={prefixPromptKeyCharacters}
              onChange={(event) =>
                setPrefixPromptKeyCharacters(event.target.value)
              }
              autoSize={{ minRows: 3 }}
            />
          </Row>
          <Row></Row>
          <Row justify="space-between" style={{ width: "100%" }}>
            <Col>
              <Typography.Text>
                Prefix prompt for identifying the language of the text:
              </Typography.Text>
            </Col>
            <Col>
              <Tooltip placement="left" title="Reset to Default">
                <Button
                  icon={<ReloadOutlined />}
                  size="small"
                  onClick={handleResetPrefixPromptLanguage}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Input.TextArea
              value={prefixPromptLanguage}
              onChange={(event) => setPrefixPromptLanguage(event.target.value)}
              autoSize={{ minRows: 3 }}
            />
          </Row>
          <Row></Row>
        </Space>
      </Form>
    </Modal>
  );
};
