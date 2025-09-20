import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams(); // pega o ID da URL

  return (
    <div style={{ padding: "20px" }}>
      <h1>Detalhes do Filme</h1>
      <p>ID do filme: {id}</p>
    </div>
  );
}