import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieInfo from "../components/MovieInfo"; // importa o novo componente

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Detalhes do filme
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovie(data);

        // Trailer
        const trailerRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );
        const trailerData = await trailerRes.json();

        const trailer = trailerData.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    fetchData();
  }, [id]);

  if (!movie) return <p>Carregando...</p>;

  return (
    <div className="container movie-details">
      {/* Trailer em cima */}
      {trailerKey ? (
        <div className="trailer mb-6">
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer do Filme"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-lg"
          ></iframe>
        </div>
      ) : (
        <p>Trailer não disponível 😢</p>
      )}

      {/* Poster + Detalhes */}
      <MovieInfo movie={movie} />
    </div>
  );
}
