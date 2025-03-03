import React from "react";
import { Descriptions, Image, Row } from "antd";
import { getCacheFromLocalStorage } from "../utils/cache";

export default ({ bookId }) => {
  const cache = getCacheFromLocalStorage();
  const book = cache.books[bookId] || {};
  const image = book.formats?.["image/jpeg"];
  const authors =
    book.authors?.map((author) => ({
      label: "Author",
      children: `${author.name} (${author.birth_year || "Unknown"} - ${
        author.death_year || "Unknown"
      })`,
      span: 3,
    })) || [];

  return (
    bookId && (
      <>
        {image && (
          <Row
            justify="center"
            style={{
              marginBottom: 16,
            }}
          >
            <Image width={200} src={image} />
          </Row>
        )}
        <Row justify="center">
          <Descriptions
            bordered
            size="small"
            items={[
              {
                label: "Title",
                children: book.title,
                span: 3,
              },
              ...authors,
              {
                label: "Id",
                children: bookId,
              },
              {
                label: "Copyright",
                // can be null
                children: book.copyright ? "True" : "False",
              },
              {
                label: "Downloads",
                children: book.download_count,
              },
              {
                label: "Subjects",
                children: (
                  <>
                    {book.subjects?.map((subject, index) => (
                      <p key={index}>{subject}</p>
                    ))}
                  </>
                ),
                span: 3,
              },
            ]}
          />
        </Row>
      </>
    )
  );
};
