import React from "react";
import { Avatar, List, Typography } from "antd";
import { getMatchingAuthors } from "../utils/filter";

export default ({ book, searchValue, onDetailsClick }) => {
  const authorsMatchingValue = getMatchingAuthors(searchValue, book?.authors);
  const firstAuthor = authorsMatchingValue?.length
    ? authorsMatchingValue[0].name
    : book?.authors[0]?.name;
  const previewImage = book?.formats?.["image/jpeg"];
  const summary = book?.summaries?.[0];

  return (
    <List.Item
      actions={[
        <Typography.Link onClick={() => onDetailsClick({ ...book, summary })}>
          Details
        </Typography.Link>,
      ]}
    >
      <List.Item.Meta
        avatar={
          previewImage && (
            <Avatar src={previewImage} shape="square" size="large" />
          )
        }
        title={book?.title}
        description={
          firstAuthor &&
          firstAuthor + (book?.authors.length > 1 ? " and others" : "")
        }
      />
    </List.Item>
  );
};
