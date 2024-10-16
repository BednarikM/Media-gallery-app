import "../styles/GenreList.scss";

export default function GenreList({formattedGenres, parentClass}) {

  return (
    <div className={`${parentClass}__genre-list`}>
    {formattedGenres.map((genre, index) => {
      return (
        <span className={`${parentClass}__genre-list-item`} key={index}>
          {genre}
        </span>
      );
    })}
    </div>
  )
}