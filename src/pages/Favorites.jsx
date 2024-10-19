import { useState, useEffect } from "react";

import MediaList from "../components/MediaList.jsx";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteMedias")) || []
  );

  return <MediaList mediasData={favorites} />;
}
