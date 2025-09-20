import { Link } from "react-router-dom";

export default function MovieCard({ movie, genresMap }) {
  // ... seu código

  return (
    <article className="movie-card">
      {/* Poster */}
      <div
        className="movie-poster"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="poster-eyebrow">EM CARTAZ</div>
        <div className="poster-title">
          {movie.title.split(" ").slice(0, 3).join(" ")}
        </div>
      </div>

      {/* Info */}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span>{genreNames || "Sem gênero"}</span>
          <span>•</span>
          <span>{movie.release_date.split("-")[0]}</span>
          <span>•</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>•</span>
          <span className={getRatingClass(certification)}>{certification}</span>
        </div>
        <div className="movie-actions">
          <Link to={`/movie/${movie.id}`} className="btn btn-outline">
            Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
