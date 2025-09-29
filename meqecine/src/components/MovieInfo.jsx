import "../MovieInfo.css";

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  return (
    <div className="movie-info-container">
      {/* Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />

      {/* Infos */}
      <div className="movie-text">
        <h1 className="movie-title">{movie.title}</h1>
        <p className="movie-overview">{movie.overview}</p>
        <p className="movie-meta">
          Lançamento: {movie.release_date} • ⭐ {movie.vote_average.toFixed(1)}
        </p>
        
      </div>
    </div>
  );
}
