import { useContext, useEffect } from "react";
import { GenreContext } from "../context/Context.js";

import MediaList from "../components/MediaList.jsx";

export default function Movie({ mediasData }) {
  const { setActiveMediasGenre } = useContext(GenreContext);

  useEffect(() => {
    setActiveMediasGenre("movie");
  });

  return <MediaList mediasData={mediasData} />;
}
