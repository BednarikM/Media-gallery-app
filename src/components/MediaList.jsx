import { useEffect, useState, useContext } from "react";

import { MediasDataFetchedContext } from "../context/Context.js";

import MediaListCard from "../components/MediaListCard.jsx";

import "../styles/components/MediaList.scss";

export default function MediasList({ mediasData }) {
  const { mediasDataFetched } = useContext(MediasDataFetchedContext);
  const [isEmpty, setIsEmpty] = useState(true); // State to track if the media list is empty

  console.log(mediasDataFetched);

  useEffect(() => {
    if (!mediasData.length) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [mediasData]);

  return (
    <>
      {mediasDataFetched && (
        <div className="media-list">
          {isEmpty ? (
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
