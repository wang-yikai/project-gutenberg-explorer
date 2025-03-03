import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./main.css";
import App from "./pages/Home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }}>
      <App />
    </ConfigProvider>
  </StrictMode>
);
