import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MediaDataFetchedContext } from "../context/Context.js";
import { FavoritesContext } from "../context/FavoritesContext.jsx";
import { PaginationContext } from "../context/PaginationContext.jsx";

import MediaListCard from "../components/MediaListCard.jsx";
import Pagination from "../components/Pagination";
import SpinningLoader from "./SpinningLoader.jsx";

import "../styles/components/MediaList.scss";

export default function MediaList({ mediaDataState }) {
  const location = useLocation();

  const { favoritesState } = useContext(FavoritesContext);
  const { isPageExcluded } = useContext(PaginationContext);
  const { areMediaDataFetched } = useContext(MediaDataFetchedContext);

  const isFavoritesRoute = location.pathname === "/favorites";
  const mediaList = isFavoritesRoute ? favoritesState : mediaDataState;

  return (
    <>
      {(areMediaDataFetched || isFavoritesRoute) && (
        <div className="media-list">
          {mediaList.length === 0 && (
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
          {mediaList.length >= 1 && (
            <>
              <ul className="media-list__content">
                {mediaList.map((mediaItem, index) => (
                  <MediaListCard key={index} {...{ mediaItem}} />
                ))}
              </ul>
              {!isPageExcluded && <Pagination />}
            </>
          )}
        </div>
      )}
      {(!areMediaDataFetched && !isFavoritesRoute) && <SpinningLoader />}
    </>
  );
}
