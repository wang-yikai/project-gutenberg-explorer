import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Metadata from "./Metadata";
import FullText from "./FullText";
import TextAnalysis from "./TextAnalysis";

export default ({ bookId, onError, onCopy }) => {
  const [activeKey, setActiveKey] = useState("metadata");

  useEffect(() => {
    setActiveKey("metadata");
  }, [bookId]);

  const handleOnChange = (key) => {
    setActiveKey(key);
  };

  return (
    <Tabs
      destroyInactiveTabPane
      activeKey={activeKey}
      tabPosition="left"
      style={{
        marginTop: 16,
      }}
      onChange={handleOnChange}
      items={[
        {
          label: "Metadata",
          key: "metadata",
          children: <Metadata bookId={bookId} />,
        },
        {
          label: "Full Text",
          key: "full_text",
          children: (
            <FullText bookId={bookId} onError={onError} onCopy={onCopy} />
          ),
        },
        {
          label: "Text Analysis",
          key: "text_analysis",
          children: <TextAnalysis bookId={bookId} onError={onError} />,
        },
      ]}
    />
  );
};
