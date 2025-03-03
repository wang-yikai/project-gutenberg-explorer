import React from "react";
import { Button, Card, Row, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import DOMPurify from "dompurify";
import { convertTextToHTML } from "../utils/format";
import useFullText from "../hooks/useFullText";

export default ({ bookId, onError, onCopy }) => {
  const fullText = useFullText({ bookId, onError });

  return (
    <Card loading={!fullText} size="small">
      <Row justify="end">
        <Tooltip placement="left" title="Copy">
          <Button
            icon={<CopyOutlined />}
            onClick={() => onCopy(fullText)}
            size="small"
          />
        </Tooltip>
      </Row>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(convertTextToHTML(fullText || "")),
        }}
      />
    </Card>
  );
};
