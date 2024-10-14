import MediaDetailField from "./MediaDetailField";
import ImageContainer from "../components/ImageContainer";
import GenreList from "../components/GenreList";

import "../styles/MediaDetailCard.scss";

export default function MediaDetailCard({ media }) {
  const {
    formattedTitle,
    backdrop_path,
    formattedReleaseDate,
    formattedGenres,
    adult,
    media_type,
    overview,
    vote_average,
    vote_count,
  } = media;

  return (
    <div className="media-detail-card">
      <MediaDetailField label="Title" value={formattedTitle} />
      <ImageContainer
        parentClass={"media-detail-card"}
        imageUrl={backdrop_path}
        imageAlt={formattedTitle}
      />

      <MediaDetailField label="Release date" value={formattedReleaseDate} />
      <MediaDetailField label="Genres">
        <GenreList formattedGenres={formattedGenres}/>
      </MediaDetailField>
      <MediaDetailField label="Age restriction" value={adult.toString()} />
      <MediaDetailField label="Media type" value={media_type} />
      <MediaDetailField label="Overview" value={overview} />
      <MediaDetailField
        label="Average rating"
        value={`${vote_average} / 10 (${vote_count} votes)`}
      />
    </div>
  );
}
