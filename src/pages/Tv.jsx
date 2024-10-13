import { useContext, useEffect } from "react";
import { GenreContext } from "../context/Context.js";

import MediaList from "../components/MediaList.jsx";

export default function Tv({ mediasData }) {
  const { setActiveMediasGenre } = useContext(GenreContext);

  useEffect(() => {
    setActiveMediasGenre("tv");
  });

  return <MediaList mediasData={mediasData} />;
}
