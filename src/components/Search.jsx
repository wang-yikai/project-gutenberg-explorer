import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Flex,
  Input,
  Segmented,
  Select,
  Space,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import DetailsSettingsModal from "./DetailsSettingsModal";
import { SearchSettingsView, SearchSettingsMode } from "../utils/constants";

const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default ({
  searchSettings,
  onChangeSearchSettings,
  onSearch,
  onSearchValueChange,
  onCacheClear,
  loading,
}) => {
  const [openDetailsSettings, setOpenDetailsSettings] = useState(false);

  const handleOpenDetailSettings = () => {
    setOpenDetailsSettings(true);
  };

  const handleCloseDetailSettings = () => {
    setOpenDetailsSettings(false);
  };

  return (
    <Form>
      <Row justify="center">
        <Col span={14}>
          <Space.Compact>
            <Select
              value={searchSettings.mode}
              onChange={(mode) =>
                onChangeSearchSettings({ view: searchSettings.view, mode })
              }
              options={Object.values(SearchSettingsMode).map((mode) => ({
                value: mode,
                label:
                  mode === SearchSettingsMode.TITLE_OR_AUTHOR
                    ? "Title or Author"
                    : capitalize(mode),
              }))}
              style={{
                minWidth: 132,
              }}
            />
            <Input.Search
              placeholder={`Search in ${
                searchSettings.view === SearchSettingsView.CATALOGUE_RESULTS
                  ? "Project Gutenberg"
                  : "recent history"
              } by ${searchSettings.mode}`}
              onSearch={onSearch}
              onChange={onSearchValueChange}
              loading={loading}
              allowClear
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row
        justify="center"
        style={{
          marginTop: 16,
        }}
      >
        <Col span={14}>
          <Flex justify="space-between">
            <Segmented
              options={Object.values(SearchSettingsView).map((view) => ({
                value: view,
                label: view
                  .split(" ")
                  .map((word) => capitalize(word))
                  .join(" "),
              }))}
              onChange={(view) =>
                onChangeSearchSettings({ view, mode: searchSettings.mode })
              }
            />
            <Button
              icon={<SettingOutlined />}
              onClick={handleOpenDetailSettings}
            />
          </Flex>
        </Col>
      </Row>
      <DetailsSettingsModal
        open={openDetailsSettings}
        onClose={handleCloseDetailSettings}
        onCacheClear={onCacheClear}
      />
    </Form>
  );
};
