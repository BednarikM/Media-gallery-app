import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MediasDataFetchedContext } from "../context/Context.js";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import { MediaGenresContext } from "../context/MediaGenresContext.jsx";
import { PaginationContext } from "../context/PaginationContext.jsx";

import MediaListCard from "../components/MediaListCard.jsx";
import PaginationContainer from "../components/PaginationContainer";
import LoaderContainer from "./LoaderContainer.jsx";

import "../styles/components/MediaList.scss";

export default function MediasList({ mediasData }) {
  const location = useLocation();

  const { favorites } = useContext(FavoritesContext);
  const { isPageExcluded } = useContext(PaginationContext);
  const { mediasDataFetched } = useContext(MediasDataFetchedContext);
  // const { mediaTypeState } = useContext(MediaGenresContext);

  const isFavoritesRoute = location.pathname === "/favorites";
  const listData = isFavoritesRoute ? favorites : mediasData;

  return (
    <>
      {mediasDataFetched ? (
        <div className="media-list">
          {!listData.length && (
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
          )}
          {!!listData.length && (
            <>
              <ul className="media-list__content">
                {listData.map((media, index) => (
                  <MediaListCard key={index} {...{ media, index }} />
                ))}
              </ul>
              {!isPageExcluded && <PaginationContainer />}
            </>
          )}
        </div>
      ) : (
        <LoaderContainer />
      )}
    </>
  );
}
