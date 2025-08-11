import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/telaInicialReact.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import perfilPadrao from "../IMG/icon perfil novo.png";
import post1Img from "../IMG/CrisViana.jpg";
import post2Img from "../IMG/AgroTech.jpg";
import iotImg from "../IMG/Iot.jpg";
import tashaImg from "../IMG/Tasha.jpg";
import kyanImg from "../IMG/Kyan.jpg";

const Inicio = () => {
    const [usuario, setUsuario] = useState(null);
    const [activeTab, setActiveTab] = useState('feed');
    const [conteudoPost, setConteudoPost] = useState('');
    const navigate = useNavigate();
    const [filtros, setFiltros] = useState({
        tipo_usuario : null,
        ordenação: 'recentes'
    });
    const [posts, setPosts] = useState([]);

    // --- ESTADOS PARA POSTAGEM ---
    const MAX_CHARS = 280;
    const [text, setText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isPosting, setIsPosting] = useState(false);
    const isPostButtonDisabled = isPosting || (!text.trim() && !selectedFile);
    const charCounterColor = text.length > MAX_CHARS ? 'red' : undefined;

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

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    // Adicione a função fetchPosts para buscar os posts do backend
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/posts');
            if (!response.ok) throw new Error('Erro ao buscar posts');
            const data = await response.json();
            setPosts(data);
            // console.log('Posts carregados:', data); // Para depuração
        } catch (err) {
            console.error('Erro ao buscar posts:', err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 30 * 1024 * 1024) {
                alert('Arquivo muito grande! O limite é 30MB.');
                event.target.value = '';
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleRemoveMedia = () => {
        setSelectedFile(null);
        setPreview(null);
        const imgInput = document.getElementById('imageUpload');
        const vidInput = document.getElementById('videoUpload');
        if (imgInput) imgInput.value = '';
        if (vidInput) vidInput.value = '';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsPosting(true);
        const formData = new FormData();
        formData.append('post', JSON.stringify({ message: text.trim() }));
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        try {
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Falha ao criar o post. Status: ${response.status}. Detalhes: ${errorData}`);
            }
            // Após criar o post, buscar novamente os posts para atualizar o feed
            await fetchPosts();
            setText("");
            setSelectedFile(null);
            setPreview(null);
            alert('Post criado com sucesso!');
        } catch (error) {
            console.error('Erro detalhado:', error);
            alert('Ocorreu um erro ao criar o post. Verifique o console para mais detalhes.');
        } finally {
            setIsPosting(false);
        }
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
                    <a className="navbar-brand" href="../jsx/Inicio.jsx">
                        <i className="fas fa-seedling me-2"></i> ApoiaRural
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Links externos: GitHub, Email, Instagram */}
                    <div className="d-flex align-items-center ms-auto gap-2">
                        <a href="https://github.com/caiomccunha/ApoiaRural-Completo" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" title="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" title="Email">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="https://instagram.com/seuusuario" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" title="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
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
                                    <img 
                                      src={`http://localhost:8080/tcc/usuarios/${usuario.id}/foto`} 
                                      className="post-avatar" 
                                      alt="Foto do usuário" 
                                      onError={e => { e.target.onerror=null; e.target.src=perfilPadrao; }}
                                    />
                                </a>
                                <h5 id='nome-usuario'>{usuario.nome}</h5>
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
                                            onClick={() => setActiveTab('mensagens')}
                                        >
                                            <i className="fas fa-message"></i>Mensagens
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link 
                                            to="/demandas"  // Alterado para "/demandas"
                                            onClick={() => setActiveTab('conexoes')}
                                        >
                                            <i className="fas fa-handshake"></i>Demandas
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
                            {/* Create Post Adaptado */}
                            <div className="create-post">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-12">
                <div className="card post-creation-card p-2">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex align-items-start mb-3">
                                <img src={usuario?.foto ? `http://localhost:8080/tcc/usuarios/${usuario.id}/foto` : perfilPadrao} alt="Foto do Perfil" className="rounded-circle me-3 profile-pic post-avatar" />
                                <textarea
                                    id="postTextarea"
                                    className="form-control post-textarea"
                                    rows="3"
                                    placeholder={`No que você está pensando, ${usuario?.nome?.split(' ')[0] || ''}?`}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            {preview && (
                                <div id="mediaPreview">
                                    {selectedFile.type.startsWith('image/') ? (
                                        <img src={preview} alt="Preview" className="img-fluid rounded" />
                                    ) : (
                                        <video src={preview} controls className="img-fluid rounded" />
                                    )}
                                    <button type="button" className="remove-media-btn" onClick={handleRemoveMedia}>&times;</button>
                                </div>
                            )}
                            <div className="d-flex justify-content-end align-items-center mt-2">
                                <span id="charCounter" className="text-muted small" style={{ color: charCounterColor }}>
                                    {text.length} / {MAX_CHARS}
                                </span>
                            </div>
                            <hr className="my-2" />
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex">
                                    <label htmlFor="imageUpload" className="action-btn d-flex align-items-center me-2">
                                        <i className="bi bi-image-fill"></i> Foto
                                    </label>
                                    <input type="file" id="imageUpload" className="file-input" accept="image/*" onChange={handleFileChange} />
                                    <label htmlFor="videoUpload" className="action-btn d-flex align-items-center">
                                        <i className="bi bi-film"></i> Vídeo
                                    </label>
                                    <input type="file" id="videoUpload" className="file-input" accept="video/*" onChange={handleFileChange} />
                                </div>
                                <button type="submit" className="btn btn-primary fw-bold rounded-pill px-4" disabled={isPostButtonDisabled}>
                                    {isPosting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Postando...
                                        </>
                                    ) : (
                                        'Postar'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
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

export default Inicio;
