import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ importa Link

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [certification, setCertification] = useState("N/A");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR&page=1",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        const data = await res.json();

        if (!data.results || data.results.length === 0)
          throw new Error("Nenhum filme encontrado no Brasil");

        const firstMovie = data.results[0];
        setMovie(firstMovie);

        const certRes = await fetch(
          `https://api.themoviedb.org/3/movie/${firstMovie.id}/release_dates`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        const certData = await certRes.json();
        const brRelease = certData.results.find((r) => r.iso_3166_1 === "BR");

        if (brRelease && brRelease.release_dates.length > 0) {
          setCertification(brRelease.release_dates[0].certification || "N/A");
        }
      } catch (err) {
        console.error("Erro ao carregar filme:", err);
      }
    }

    fetchMovie();
  }, []);

  if (!movie) {
    return (
      <section className="hero-banner">
        <div className="container hero-content">
          <p>Carregando filme em destaque...</p>
        </div>
      </section>
    );
  }

  function getRatingClass(cert) {
    if (!cert || cert === "N/A") return "rating rating-na";
    if (cert === "L") return "rating rating-livre";
    return `rating rating-${cert}`;
  }

  return (
    <section
      className="hero-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-left">
          <div className="kicker">🎬 Em destaque nos cinemas</div>
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-sub">{movie.overview}</p>

          <div className="hero-ctas">
            {/* ✅ Link para a página de detalhes */}
            <Link to={`/movie/${movie.id}`} className="btn btn-ghost">
              Detalhes
            </Link>
          </div>

          <div className="hero-meta">
            <span className={getRatingClass(certification)}>
              {certification}
            </span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
