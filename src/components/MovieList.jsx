import { useContext } from "react";
import { Link } from "react-router-dom";

import { MovieContext } from "../context/Context.js";

import "../styles/MovieList.scss";

export default function MovieList({ moviesData }) {
  const { setSelectedMovie } = useContext(MovieContext);

  // function formatRoute(title) {
  //   return title.toLowerCase().replace(/\s+/g, "-");
  // }

  console.log(moviesData)

  // return (
  //   <>
  //     <ul className="movie-list">
  //       {moviesData.map((movie) => {
  //         return (
  //           <Link
  //             to={formatRoute(movie.Title)}
  //             key={index}
  //             onClick={() => setSelectedMovie(movie)}
  //           >
  //             <li className="movie-list__item">
  //               <img src={movie.Poster} alt={`${movie.title} poster`} />
  //               <div className="movie-list__item-overlay"></div>
  //             </li>
  //           </Link>
  //         );
  //       })}
  //     </ul>
  //   </>
  // );
}
