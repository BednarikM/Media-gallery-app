import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PaginationProvider } from "./context/PaginationContext.jsx";
import { MediaGenresProvider } from "./context/MediaGenresContext.jsx";

import App from "./components/App.jsx";

import "./styles/main.scss";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PaginationProvider>
      <MediaGenresProvider>
        <App />
      </MediaGenresProvider>
    </PaginationProvider>
  </BrowserRouter>
);
