import { useContext } from "react";

import { GenreContext, MediasDataFetchedContext } from "../context/Context.js";

import MediaListCard from "../components/MediaListCard.jsx";

import "../styles/components/MediaList.scss";

export default function MediasList({ mediasData }) {
  const { activeMediasGenre } = useContext(GenreContext);
  const { mediasDataFetched } = useContext(MediasDataFetchedContext);

  console.log(mediasData);

  return (
    <>
      {mediasDataFetched && (
        <div className="media-list">
          {activeMediasGenre === "search" && !mediasData.length ? (
            <div className="media-list__no-results">
              <span>No results found.</span>
              <span>Please try different keywords.</span>
            </div>
          ) : (
            <ul className="media-list__content">
              {mediasData.map((media, index) => {
                return <MediaListCard key={index} {...{ media, index }} />;
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
