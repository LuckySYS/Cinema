// src/components/MovieCard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieCard({ movie, genresMap }) {
  const [certification, setCertification] = useState("N/A");

  // pega classificação indicativa
  useEffect(() => {
    async function fetchCertification() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/release_dates`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        const brRelease = data.results.find((r) => r.iso_3166_1 === "BR");
        if (brRelease && brRelease.release_dates.length > 0) {
          setCertification(brRelease.release_dates[0].certification || "L");
        }
      } catch (err) {
        console.error("Erro ao buscar classificação:", err);
      }
    }

    fetchCertification();
  }, [movie.id]);

  const genreNames = movie.genre_ids
    .map((id) => genresMap[id])
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  // define a cor com base na classificação
  const getRatingClass = (cert) => {
    switch (cert) {
      case "L":
        return "rating rating-livre";
      case "10":
        return "rating rating-10";
      case "12":
        return "rating rating-12";
      case "14":
        return "rating rating-14";
      case "16":
        return "rating rating-16";
      case "18":
        return "rating rating-18";
      default:
        return "rating rating-na";
    }
  };

  return (
    <article className="movie-card">
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
