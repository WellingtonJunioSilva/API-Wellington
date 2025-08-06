import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/detalheDemanda.css'; // Importando o CSS específico para DetalheDemanda

export default function DetalheDemanda() {
  const { id } = useParams();
  const [demanda, setDemanda] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchDemanda() {
      try {
        const res = await fetch(`http://localhost:8080/tcc/demandas/${id}`);
        const data = await res.json();
        setDemanda(data);
      } catch (error) {
        setDemanda(null);
      }
    }
    fetchDemanda();
  }, [id]);

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setSucesso(null);

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    try {
      const res = await fetch(`http://localhost:8080/tcc/mensagens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          demandaId: id,
          mensagem: mensagem,
          remetenteEmail: usuarioLogado?.email,
        }),
      });
      if (res.ok) {
        setSucesso(true);
        setMensagem("");
      } else {
        setSucesso(false);
      }
    } catch {
      setSucesso(false);
    }
    setEnviando(false);
  };

  if (demanda === null) {
    return <div className="container mt-5">Carregando detalhes...</div>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Detalhes da Demanda</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">{demanda.titulo}</h5>
          <p className="card-text">{demanda.descricao}</p>
          <p className="text-muted small mb-3">
            Postado por <strong>{demanda.usuarioNome}</strong> em{" "}
            {new Date(demanda.data_postagem).toLocaleDateString()}<br />
          </p>

          <form onSubmit={handleEnviarMensagem} className="border-top pt-3">
            <div className="mb-2">
              <label htmlFor="mensagem" className="form-label small fw-bold">
                Enviar mensagem ao responsável:
              </label>
              <textarea
                className="form-control"
                id="mensagem"
                rows="2"
                placeholder="Escreva uma mensagem rápida..."
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="d-flex align-items-center">
              <button type="submit" className="btn btn-enviar" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar"}
              </button>
              {sucesso === true && <span className="text-success small">Mensagem enviada!</span>}
              {sucesso === false && <span className="text-danger small">Erro ao enviar.</span>}
            </div>
          </form>

          <button className="btn btn-sm btn-secondary mt-4" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
