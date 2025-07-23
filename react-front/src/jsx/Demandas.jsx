import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import perfilPadrao from "../IMG/icon perfil criado recentemente.png";

const Demandas = () => {
    const [filtros, setFiltros] = useState({
        tipoUsuario: null,
        ordenacao: null
    });
    const [usuario, setUsuario] = useState(null);
    const [activeTab, setActiveTab] = useState('feed');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const carregarUsuario = () => {
            const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
            
            if (!usuarioLogado) {
                navigate('/login');
                return;
            }

            setUsuario({
                ...usuarioLogado,
                foto: usuarioLogado.foto || perfilPadrao,
                tipo_usuario: usuarioLogado.tipo_usuario || 'Usuário',
                cidade: usuarioLogado.cidade || 'Local não informado',
                nome: usuarioLogado.nome || 'Usuário'
            });
            setLoading(false);
        };

        carregarUsuario();
    }, [navigate]);

    if (loading || !usuario) {
        return <div className="text-center mt-5">Carregando...</div>;
    }

    return (
        <div className="Demandas">
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
                <div className="container">
                    <Link to="/inicio" className="navbar-brand d-flex align-items-center">
                        <i className="fas fa-seedling me-2"></i>
                        <span className="fw-bold">AgroTech</span>
                    </Link>
                    
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <div className="d-flex align-items-center ms-auto">
                            {/* Barra de Pesquisa */}
                            <div className="search-bar position-relative me-3">
                                <input 
                                    type="text" 
                                    className="form-control ps-4" 
                                    placeholder=""
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ minWidth: '250px' }}
                                />
                                <i className="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                            </div>
                            
                            {/* Dropdown de Filtros */}
                            <div className="dropdown me-2">
                                <button
                                    id="filtro"
                                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-filter me-1"></i>
                                    <span>{filtros.tipoUsuario || 'Filtrar por'}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button 
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFiltros({...filtros, tipoUsuario: 'Produtor'});
                                            }}    
                                        >
                                            <i className="fas fa-tractor me-2"></i>
                                            Produtor
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFiltros({...filtros, tipoUsuario: 'Apoiador'});
                                            }}
                                        >
                                            <i className="fas fa-hands-helping me-2"></i>
                                            Apoiador
                                        </button>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button 
                                            className="dropdown-item d-flex align-items-center text-danger"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFiltros({...filtros, tipoUsuario: null});
                                            }}
                                        >
                                            <i className="fas fa-times-circle me-2"></i>
                                            Limpar filtros
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* Dropdown de Ordenação */}
                            <div className="dropdown">
                                <button 
                                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-sort me-1"></i>
                                    <span>{filtros.ordenacao === 'recentes' ? 'Mais recentes' : 'Ordenar por'}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <button 
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setFiltros({...filtros, ordenacao: 'recentes'});
                                            }}
                                        >
                                            <i className="fas fa-clock me-2"></i>
                                            Mais Recentes
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <Link to="/perfil">
                                    <img 
                                        src={usuario.foto} 
                                        className="post-avatar" 
                                        alt="Foto do usuário" 
                                        onError={(e) => {
                                            e.target.src = perfilPadrao;
                                        }}
                                    />
                                </Link>
                                <h5>{usuario.nome}</h5>
                                <p className="mb-0">
                                    {usuario.tipo_usuario} • {usuario.cidade}
                                </p>
                                <small>127 conexões</small>
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
                                            onClick={() => setActiveTab('mensagens')}
                                        >
                                            <i className="fas fa-message"></i>Mensagens
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/clima"
                                            onClick={() => setActiveTab('clima')}
                                        >
                                            <i className="fas fa-cloud-sun"></i>Clima
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/noticias"
                                            onClick={() => setActiveTab('noticias')}
                                        >
                                            <i className="fas fa-newspaper"></i>Notícias
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/demandas"
                                            onClick={() => setActiveTab('conexoes')}
                                        >
                                            <i className="fas fa-handshake"></i>Conexões
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/eventos"
                                            onClick={() => setActiveTab('eventos')}
                                        >
                                            <i className="fas fa-calendar"></i>Eventos
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Listagem de Demandas</h5>
                                <p className="card-text">
                                    Filtros ativos: {filtros.tipoUsuario || 'Nenhum'} | 
                                    Ordenação: {filtros.ordenacao || 'Padrão'} | 
                                    Busca: {searchTerm || 'Nenhum termo'}
                                </p>
                                {/* Aqui você pode mapear suas demandas */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demandas;