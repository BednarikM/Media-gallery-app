import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { PaginationProvider } from "./context/PaginationContext.jsx";
import { MediaTypeProvider } from "./context/MediaTypeContext.jsx";

import App from "./components/App.jsx";

import "./styles/Index.scss";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MediaTypeProvider>
      <PaginationProvider>
        <App />
      </PaginationProvider>
    </MediaTypeProvider>
  </BrowserRouter>
);
