import "../styles/GenreList.scss";

export default function GenreList({formattedGenres}) {
  console.log(formattedGenres)

  return (
    <div className="genre-list">
    {formattedGenres.map((genre, index) => {
      return (
        <span className="genre-list__item" key={index}>
          {genre}
        </span>
      );
    })}
    </div>
  )
}