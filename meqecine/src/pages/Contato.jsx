import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl p-8">
        
        {/* Formulário */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Entre em Contato</h2>
          <p className="text-gray-500 mb-6">
            Tem alguma dúvida ou sugestão? Envie uma mensagem!
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Mensagem</label>
              <textarea
                rows="4"
                placeholder="Escreva sua mensagem..."
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Informações */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" />
            <p className="text-gray-700">+55 (11) 98765-4321</p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <p className="text-gray-700">contato@exemplo.com</p>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <p className="text-gray-700">Av. Paulista, 1000 - São Paulo, SP</p>
          </div>

          {/* Redes Sociais */}
          <div className="flex gap-5 mt-6">
            <a href="#" className="text-gray-500 hover:text-blue-600 transition">
              <Facebook size={28} />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600 transition">
              <Instagram size={28} />
            </a>
            <a href="#" className="text-gray-500 hover:text-sky-500 transition">
              <Twitter size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
