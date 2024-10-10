import { useEffect, useState } from "react";
import MediaListCard from "./MediaListCard.jsx";

import "../styles/MediaList.scss";

export default function MediasList({ mediasData }) {
  const [isLoading, setIsLoading] = useState(true); //Initial render
  const [isEmpty, setIsEmpty] = useState(true); // State to track if the media list is empty

  useEffect(() => {
    setIsLoading(false);

    if (mediasData.length === 0 && isLoading) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [mediasData]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isEmpty ? (
        <div className="media-list__no-results">
          <span>No results found.</span>
          <span>Please try different keywords.</span>
        </div>
      ) : (
        <ul className="media-list">
          {mediasData.map((media, index) => {
            return <MediaListCard key={index} {...{ media, index }} />;
          })}
        </ul>
      )}
    </>
  );
}
