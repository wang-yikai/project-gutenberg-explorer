const getResponse = async (content, onError) =>
  await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .catch((error) => onError(error));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getSummary = async ({ fullText, chunkSize, onError }) => {
  // extract the actual story content
  const startMarker = /\*\*\* START OF THE PROJECT GUTENBERG EBOOK .*? \*\*\*/i;
  const endMarker = /\*\*\* END OF THE PROJECT GUTENBERG EBOOK .*? \*\*\*/i;
  const startMatch = fullText.match(startMarker);
  const endMatch = fullText.match(endMarker);

  let storyText = fullText;
  if (startMatch) {
    storyText = storyText.slice(startMatch.index + startMatch[0].length);
  }
  if (endMatch) {
    storyText = storyText.slice(0, endMatch.index);
  }

  // remove unnecessary newlines and carriage returns
  storyText = storyText.replace(/[\r\n]+/g, " ");

  // split text into chunks without cutting sentences
  const splitIntoChunks = (text, size, overlap = 100) => {
    const chunks = [];
    let index = 0;
    while (index < text.length) {
      let chunk = text.slice(index, index + size);
      if (index + size < text.length) {
        const lastPeriod = chunk.lastIndexOf(".");
        if (lastPeriod !== -1) {
          chunk = chunk.slice(0, lastPeriod + 1);
        }
      }
      chunks.push(chunk.trim());
      if (chunk.length - overlap) {
        index += chunk.length - overlap;
      } else {
        index += chunk.length;
      }
    }
    return chunks;
  };

  const chunks = splitIntoChunks(storyText, chunkSize);
  let summaries = [];

  // process each chunk
  await sleep(6000); // wait for 6 seconds to prevent going over API usage limit
  for (const chunk of chunks) {
    const response = await getResponse(
      `Summarize the following text while maintaining continuity with previous content. Keep the summary concise and coherent.\n\n${chunk}`,
      onError
    );
    summaries.push(response?.choices?.[0]?.message?.content || "");
    await sleep(6000); // wait for 6 seconds to prevent going over API usage limit
  }

  // final summary request
  const finalResponse = await getResponse(
    `Combine and refine these summaries into a well-structured and concise summary of the entire text:\n\n${summaries.join(
      "\n\n"
    )}`,
    onError
  );

  return finalResponse?.choices?.[0]?.message?.content || "";
};

export const getAnalysisOnSummary = async ({
  prefixPrompt,
  summary,
  onError,
}) => {
  await sleep(6000); // wait for 6 seconds to prevent going over API usage limit
  const response = await getResponse(`${prefixPrompt}:\n\n${summary}`, onError);
  return response?.choices?.[0]?.message?.content || "";
};
