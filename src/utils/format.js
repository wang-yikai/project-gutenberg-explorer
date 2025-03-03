export const convertTextToHTML = (text) => {
  const lines = text.replace(/\r/g, "").split("\n");
  let html = "";
  let paragraphStarted = false;

  for (const line of lines) {
    if (line.trim() === "") {
      if (paragraphStarted) {
        html += "</p>";
        paragraphStarted = false;
      }
    } else {
      if (!paragraphStarted) {
        html += "<p>";
        paragraphStarted = true;
      }
      html += line + " ";
    }
  }

  if (paragraphStarted) {
    html += "</p>";
  }

  return html;
};
