import { useEffect, useState } from "react";

// 👉 Seu token (ideal: colocar no .env e usar import.meta.env.VITE_TMDB_TOKEN)
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDlhNTliOTVmNmIxN2FjMzgyNWNhNjA1MzU4NjBhNCIsIm5iZiI6MTc0NDY2OTc0NC4yMzMsInN1YiI6IjY3ZmQ4YzMwN2MyOWFlNWJjM2Q5NzYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.csnTCHrugNocRV526jW68yqYVbjZKF7mgtPC25MKf0I";

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [certification, setCertification] = useState("N/A");

  useEffect(() => {
    async function fetchMovie() {
      try {
        // 👉 pega o primeiro filme em cartaz
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

        if (!data.results || data.results.length === 0) {
          throw new Error("Nenhum filme encontrado no Brasil");
        }

        const firstMovie = data.results[0];
        setMovie(firstMovie);

        // 👉 busca classificação indicativa do filme no Brasil
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

  // função auxiliar para pegar cor da classificação
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
            <button className="btn btn-ghost">Ver Sessões</button>
          </div>

          <div className="hero-meta">
            <span className={getRatingClass(certification)}>
              {certification}
            </span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="hero-poster">
          <div className="poster-visual">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "12px" }}
            />
            <div className="poster-title">{movie.title.toUpperCase()}</div>
            <div className="poster-tag">EM CARTAZ</div>
          </div>
        </div>
      </div>
    </section>
  );
}
