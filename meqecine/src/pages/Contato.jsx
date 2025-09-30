import Header from "../components/Header.jsx";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../components/Contato.css";

export default function Contato() {
  return (
    <div>
      <Header />
      <div className="contato-page">
        <div className="contato-container">
          {/* Formulário */}
          <div>
            <h2>Entre em Contato</h2>
            <p>Tem alguma dúvida ou sugestão? Envie uma mensagem!</p>
            <form>
              <div>
                <label>Nome</label>
                <input type="text" placeholder="Seu nome" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="seu@email.com" />
              </div>
              <div>
                <label>Mensagem</label>
                <textarea rows="4" placeholder="Escreva sua mensagem..." />
              </div>
              <button type="submit">Enviar</button>
            </form>
          </div>

          {/* Informações */}
          <div className="contato-info">
            <div className="info-item">
              <FaPhone />
              <p>+55 (11) 98765-4321</p>
            </div>
            <div className="info-item">
              <FaEnvelope />
              <p>contato@exemplo.com</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt />
              <p>Av. Paulista, 1000 - São Paulo, SP</p>
            </div>

            <div className="socials">
              <a href="#"><FaFacebook size={28} /></a>
              <a href="#"><FaInstagram size={28} /></a>
              <a href="#"><FaTwitter size={28} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
