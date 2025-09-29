import { useParams } from "react-router-dom";
import Header from "../components/Header";
import MovieTrailer from "../components/MovieTrailer";

export default function MovieDetails() {
  const { id } = useParams(); // pega o ID da URL

  return (
    <div style={{ padding: "20px" }}>
      <Header></Header>
      <MovieTrailer></MovieTrailer>
    </div>
  );
}