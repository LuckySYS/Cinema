import { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genresMap, setGenresMap] = useState({});

  useEffect(() => {
    async function fetchMovies() {
      try {
        // pegar gêneros
        const genresRes = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        if (!genresRes.ok) {
          throw new Error(`Erro HTTP gêneros: ${genresRes.status}`);
        }

        const genresData = await genresRes.json();
        const map = {};
        genresData.genres.forEach((g) => (map[g.id] = g.name));
        setGenresMap(map);

        // pegar filmes em cartaz
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&region=BR&page=1",
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Erro HTTP filmes: ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="app-root">
      <Header />
      <main>
        <Banner />
        <section className="container movies-section">
          <h2 className="section-title">🎬 Em Cartaz no Brasil</h2>
          <div className="movies-grid">
            {movies.slice(0, 2).map((m) => (
              <MovieCard key={m.id} movie={m} genresMap={genresMap} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
