import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MediasDataFetchedContext } from "../context/Context.js";
import { FavoritesContext } from "../context/FavoritesContext.jsx";

import MediaListCard from "../components/MediaListCard.jsx";
import PaginationContainer from "../components/PaginationContainer";

import "../styles/components/MediaList.scss";

export default function MediasList({ mediasData }) {
  const location = useLocation();
  const { favorites } = useContext(FavoritesContext);
  const { mediasDataFetched } = useContext(MediasDataFetchedContext);

  const isFavoritesRoute = location.pathname === "/favorites";
  const listData = isFavoritesRoute ? favorites : mediasData;

  return (
    <>
      {isFavoritesRoute || mediasDataFetched ? ( // If it's the favorites route or data is fetched
        <div className="media-list">
          {!listData.length ? (
            <div className="media-list__no-results">
              <span>
                {isFavoritesRoute
                  ? "No favorite media found."
                  : "No results found."}
              </span>
              <span>
                {isFavoritesRoute
                  ? "Please add some favorites."
                  : "Please try different keywords."}
              </span>
            </div>
          ) : (
            <>
              <ul className="media-list__content">
                {listData.map((media, index) => (
                  <MediaListCard key={index} {...{ media, index }} />
                ))}
              </ul>
              <PaginationContainer propsPagesCount={5} />
            </>
          )}
        </div>
      ) : null}{" "}
    </>
  );
}
