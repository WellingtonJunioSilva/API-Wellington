import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import perfilPadrao from "../IMG/icon perfil novo.png";
import '../css/demandas.css'
// Remover import duplicado de React

export default function Demandas() {
  const [filtros, setFiltros] = useState({ tipoUsuario: null, ordenacao: null });
  const [usuario, setUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [demandas, setDemandas] = useState([]);
  const [activeTab, setActiveTab] = useState('feed'); // Corrigido: estado para activeTab
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      navigate('/login');
      return;
    }
    setUsuario({
      ...usuarioLogado,
      foto: usuarioLogado.foto || perfilPadrao,
      tipo_usuario: usuarioLogado.tipo_usuario || "Usuário",
      cidade: usuarioLogado.cidade || "Local não informado",
      nome: usuarioLogado.nome || "Usuário",
      conexoes: usuarioLogado.conexoes || 127
    });
  }, []);

  useEffect(() => {
    async function fetchDemandas() {
      try {
        const res = await fetch("http://localhost:8080/tcc/demandas");
        let data = await res.json();

        if (filtros.tipoUsuario)
          data = data.filter(d => d.usuarioTipo === filtros.tipoUsuario);

        if (filtros.ordenacao === 'recentes')
          data = data.sort((a, b) => new Date(b.data_postagem) - new Date(a.data_postagem));

        if (searchTerm)
          data = data.filter(d =>
            d.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.descricao.toLowerCase().includes(searchTerm.toLowerCase())
          );

        setDemandas(data);
      } catch (error) {
        console.error("Erro ao carregar demandas:", error);
      }
    }
    fetchDemandas();
  }, [filtros, searchTerm]);

  if (!usuario) return null;

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/inicio">
            <i className="fas fa-leaf me-2"></i>AgroTech
          </Link>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="form-select" onChange={(e) => setFiltros({ ...filtros, tipoUsuario: e.target.value || null })}>
              <option value="">Filtrar por tipo</option>
              <option value="Produtor">Produtor</option>
              <option value="Apoiador">Apoiador</option>
            </select>
            <select className="form-select" onChange={(e) => setFiltros({ ...filtros, ordenacao: e.target.value || null })}>
              <option value="">Ordenar por</option>
              <option value="recentes">Mais Recentes</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="sidebar">
              <div className="sidebar-header">
                <a href="/perfil">
                  <img src={usuario.foto} className="post-avatar" alt="Foto do usuário" />
                </a>
                <h5 id="nome-usuario">{usuario.nome}</h5>
                <p className="mb-0">
                  {usuario.tipo_usuario} • {usuario.cidade}
                </p>
              </div>
              <div className="sidebar-content">
                <ul className="sidebar-menu">
                  <li>
                    <Link 
                      to="/inicio" 
                      className={activeTab === 'feed' ? 'active' : ''}
                      onClick={() => setActiveTab('feed')}
                    >
                      <i className="fas fa-home"></i>Feed Principal
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/mensagens"
                      className={activeTab === 'mensagens' ? 'active' : ''}
                      onClick={() => setActiveTab('mensagens')}
                    >
                      <i className="fas fa-message"></i>Mensagens
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/noticias"
                      className={activeTab === 'noticias' ? 'active' : ''}
                      onClick={() => setActiveTab('noticias')}
                    >
                      <i className="fas fa-newspaper"></i>Notícias
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/demandas"
                      className={activeTab === 'conexoes' ? 'active' : ''}
                      onClick={() => setActiveTab('Dem')}
                    >
                      <i className="fas fa-handshake"></i>Demandas
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/eventos"
                      className={activeTab === 'eventos' ? 'active' : ''}
                      onClick={() => setActiveTab('eventos')}
                    >
                      <i className="fas fa-calendar"></i>Eventos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Lista de demandas */}
          <div className="col-md-8 col-lg-9">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="mb-3">Demandas</h4>
                {demandas.length === 0 ? (
                  <p className="text-muted">Nenhuma demanda encontrada.</p>
                ) : (
                  demandas.map((d) => (
                    <div className="card mb-3" key={d.id}>
                      <div className="card-body">
                        <h5 className="card-title">{d.titulo}</h5>
                        <p className="card-text">{d.descricao}</p>
                        <p className="text-muted small">
                          Postado por {d.usuarioNome} em {new Date(d.data_postagem).toLocaleDateString()} • {d.cidade}, {d.estado}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}