import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/telaInicialReact.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import perfilPadrao from "../IMG/icon perfil criado recentemente.png";
import post1Img from "../IMG/CrisViana.jpg";
import post2Img from "../IMG/AgroTech.jpg";
import iotImg from "../IMG/Iot.jpg";
import tashaImg from "../IMG/Tasha.jpg";
import kyanImg from "../IMG/Kyan.jpg";

const TelaInicial = () => {
    const [usuario, setUsuario] = useState(null);
    const [activeTab, setActiveTab] = useState('feed');
    const [conteudoPost, setConteudoPost] = useState('');
    const navigate = useNavigate();
    const [filtros, setFiltros] = useState({
        tipo_usuario : null,
        ordenação: 'recentes'
    });

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        
        if (usuarioLogado) {
            // Garante que tenha uma foto padrão se não houver foto do usuário
            setUsuario({
                ...usuarioLogado,
                foto: usuarioLogado.foto || perfilPadrao
            });
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handlePublicar = () => {
        // Aqui você pode adicionar a lógica para publicar o post
        console.log("Post publicado:", conteudoPost);
        setConteudoPost('');
        // Adicionar à lista de posts...
    };

    const filtrarPosts = (posts) => {
        let postsFiltrados = [...posts];
        
        // Filtro por tipo de usuário
        if (filtros.tipoUsuario) {
            postsFiltrados = postsFiltrados.filter(post => 
            post.tipoUsuario === filtros.tipoUsuario
            );
        }
        
        // Ordenação
        if (filtros.ordenacao === 'recentes') {
            postsFiltrados.sort((a, b) => new Date(b.data) - new Date(a.data));
        } else {
            postsFiltrados.sort((a, b) => b.curtidas - a.curtidas);
        }
        
        return postsFiltrados;
    };

    if (!usuario) {
        return (
            <div className="loading-screen">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p>Carregando perfil...</p>
            </div>
        );
    }

    return (
        <div className="tela-inicial">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <i className="fas fa-seedling me-2"></i> A de Agro
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex align-items-center">
                        <div className="search-bar me-3">
                            <input type="text" className="form-control" placeholder="Buscar..." />
                            <i className="fas fa-search"></i>
                        </div>
                       <div className="dropdown2">
                        <button 
                            id="filtro" 
                            className="btn btn-outline-light dropdown-toggle" 
                            type="button"
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            <i className="fas fa-filter me-1"></i>
                            {filtros.tipoUsuario || 'Filtrar por'}
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={(e) => {
                                e.preventDefault();
                                setFiltros({...filtros, tipoUsuario: 'Produtor'});
                                }}
                            >
                                Produtor
                            </a>
                            </li>
                            <li>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={(e) => {
                                e.preventDefault();
                                setFiltros({...filtros, tipoUsuario: 'Apoiador'});
                                }}
                            >
                                Apoiador
                            </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                            <a 
                                className="dropdown-item" 
                                href="#"
                                onClick={(e) => {
                                e.preventDefault();
                                setFiltros({...filtros, tipoUsuario: null});
                                }}
                            >
                                Limpar filtro
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div className="dropdown2 ms-2">
                    <button 
                        className="btn btn-outline-light dropdown-toggle" 
                        type="button"
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        <i className="fas fa-sort me-1"></i>
                        {filtros.ordenacao === 'recentes' ? 'Mais recentes' : 'Mais populares'}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                        <a 
                            className="dropdown-item" 
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            setFiltros({...filtros, ordenacao: 'recentes'});
                            }}
                        >
                            Mais recentes
                        </a>
                        </li>
                        <li>
                        <a 
                            className="dropdown-item" 
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            setFiltros({...filtros, ordenacao: 'populares'});
                            }}
                        >
                            Mais populares
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <a href="/perfil">
                                    <img src={usuario.foto} className="post-avatar" alt="Foto do usuário" />
                                </a>
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
                                            to="/demandas"  // Alterado para "/demandas"
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

                        {/* Weather Widget */}
                        <div className="weather-widget">
                            <h6><i className="fas fa-map-marker-alt me-2"></i>{usuario.cidade}</h6>
                            <div className="weather-temp">28°C</div>
                            <p className="mb-2">Parcialmente nublado</p>
                            <div className="row text-center">
                                <div className="col-4">
                                    <small>Hoje<br /><strong>32°/20°</strong></small>
                                </div>
                                <div className="col-4">
                                    <small>Amanhã<br /><strong>30°/18°</strong></small>
                                </div>
                                <div className="col-4">
                                    <small>Sexta<br /><strong>25°/15°</strong></small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-6">
                        {/* Feed Section */}
                        <div id="feed-section" style={{ display: activeTab === 'feed' ? 'block' : 'none' }}>
                            {/* Create Post */}
                            <div className="create-post">
                                <div className="d-flex align-items-center mb-3">
                                    <img 
                                        src={usuario.foto} 
                                        className="post-avatar" 
                                        alt={usuario.nome} 
                                    />
                                    <textarea 
                                        className="form-control" 
                                        placeholder={`O que você está pensando, ${usuario.nome.split(' ')[0]}?`}
                                        value={conteudoPost}
                                        onChange={(e) => setConteudoPost(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <button className="btn btn-outline-primary btn-sm me-2">
                                            <i className="fas fa-image me-1"></i>Foto
                                        </button>
                                        <button className="btn btn-outline-primary btn-sm">
                                            <i className="fas fa-video me-1"></i>Vídeo
                                        </button>
                                    </div>
                                    <button 
                                        className="btn btn-primary"
                                        onClick={handlePublicar}
                                        disabled={!conteudoPost.trim()}
                                    >
                                        Publicar
                                    </button>
                                </div>
                            </div>

                            {/* Posts */}
                            <div className="post-card card">
                                <div className="post-header">
                                    <img src={post1Img} className="post-avatar" alt="Maria Silva" />
                                    <div className="post-author">
                                        <h6>Maria Silva</h6>
                                        <small><i className="fas fa-map-marker-alt me-1"></i>Minas Gerais • 2h atrás</small>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-sm" data-bs-toggle="dropdown">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Salvar post</a></li>
                                            <li><a className="dropdown-item" href="#">Denunciar</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <p>Pessoal, acabei de implementar um sistema de irrigação inteligente na minha plantação de tomates. Os resultados foram impressionantes! 🍅💧</p>
                                    <p>A economia de água foi de 40% e a produtividade aumentou 25%. Alguém mais tem experiência com IoT na agricultura?</p>
                                    <img src={iotImg} className="post-image" alt="Sistema de Irrigação" />
                                </div>
                                <div className="post-actions">
                                    <button className="btn-action">
                                        <i className="far fa-heart me-1"></i>Curtir (24)
                                    </button>
                                    <button className="btn-action">
                                        <i className="far fa-comment me-1"></i>Comentar (8)
                                    </button>
                                    <button className="btn-action">
                                        <i className="fas fa-share me-1"></i>Compartilhar
                                    </button>
                                </div>
                            </div>

                            <div className="post-card card">
                                <div className="post-header">
                                    <img src={post2Img} className="post-avatar" alt="AgroTech" />
                                    <div className="post-author">
                                        <h6>AgroTech Solutions <i className="fas fa-check-circle text-primary ms-1"></i></h6>
                                        <small><i className="fas fa-building me-1"></i>Empresa • 4h atrás</small>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <p><strong>🚀 Nova tecnologia de análise de solo disponível!</strong></p>
                                    <p>Estamos oferecendo análises gratuitas de solo para pequenos produtores rurais. Nossa tecnologia utiliza IA para fornecer recomendações precisas de nutrientes e pH.</p>
                                    <p>Interessados podem se inscrever através do link nos comentários. Vagas limitadas!</p>
                                </div>
                                <div className="post-actions">
                                    <button className="btn-action">
                                        <i className="far fa-heart me-1"></i>Curtir (156)
                                    </button>
                                    <button className="btn-action">
                                        <i className="far fa-comment me-1"></i>Comentar (32)
                                    </button>
                                    <button className="btn-action">
                                        <i className="fas fa-share me-1"></i>Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Research Section - mantido como estava */}
                    </div>

                    {/* Right Sidebar */}
                    <div className="col-lg-3">
                        {/* News Widget */}
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <h6><i className="fas fa-newspaper me-2"></i>Notícias do Agro</h6>
                            </div>
                            <div className="sidebar-content p-0">
                                {/* Conteúdo mantido */}
                            </div>
                        </div>

                        {/* Suggested Connections */}
                        <div className="sidebar">
                            <div className="sidebar-header">
                                <h6><i className="fas fa-users me-2"></i>Sugestões para Você</h6>
                            </div>
                            <div className="sidebar-content">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="position-relative">
                                        <img src={tashaImg} className="post-avatar" alt="Ana Rosa" />
                                        <span className="online-status"></span>
                                    </div>
                                    <div className="ms-3 flex-grow-1">
                                        <h6 className="mb-0 small">Ana Rosa</h6>
                                        <small className="text-muted">Especialista em Café</small>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm">+</button>
                                </div>
                                
                                <div className="d-flex align-items-center mb-3">
                                    <img src={kyanImg} className="post-avatar" alt="Roberto Farias" />
                                    <div className="ms-3 flex-grow-1">
                                        <h6 className="mb-0 small">Roberto Farias</h6>
                                        <small className="text-muted">Pecuarista</small>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TelaInicial;