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
            const usuarioLogado = localStorage.getItem("usuarioLogado");
            if (!usuarioLogado) throw new Error("usuarioLogado não encontrado no localStorage");
            let usuarioId;
            try {
                usuarioId = JSON.parse(usuarioLogado).id;
            } catch (e) {
                throw new Error("Falha ao ler o id do usuarioLogado no localStorage");
            }
            if (!usuarioId) throw new Error("id do usuarioLogado não encontrado");
            const response = await fetch(`http://localhost:8080/api/posts?usuarioId=${usuarioId}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro ao buscar posts: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            setPosts(data);
            // console.log('Posts carregados:', data); // Para depuração
        } catch (err) {
            console.error('Erro ao buscar posts:', err);
            alert(err.message); // Mostra o erro detalhado
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
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        const formData = new FormData();
        formData.append('post', JSON.stringify({
      message: text.trim() || null
    }));
    formData.append('autorId', usuarioLogado.id); // campo separado
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

    // Estado para controlar posts curtidos pelo usuário
const [likedPosts, setLikedPosts] = useState([]);

// Função para curtir/descurtir
const handleLike = async (postId) => {
    if (!postId) return;
    // Se já curtiu, descurte
    const alreadyLiked = likedPosts.includes(postId);
    try {
        const usuarioLogado = localStorage.getItem("usuarioLogado");
        if (!usuarioLogado) throw new Error("usuarioLogado não encontrado no localStorage");
        let usuarioId;
        try {
            usuarioId = JSON.parse(usuarioLogado).id;
        } catch (e) {
            throw new Error("Falha ao ler o id do usuarioLogado no localStorage");
        }
        if (!usuarioId) throw new Error("id do usuarioLogado não encontrado");
        const url = `http://localhost:8080/api/posts/${postId}/${alreadyLiked ? 'unlike' : 'like'}?usuarioId=${usuarioId}`;
        await fetch(url, { method: 'POST' });
        setLikedPosts((prev) => {
            if (alreadyLiked) {
                return prev.filter(id => id !== postId);
            } else {
                return [...prev, postId];
            }
        });
        fetchPosts();
    } catch (err) {
        alert('Erro ao curtir/descurtir o post: ' + err.message);
    }
};

// Atualiza likedPosts ao carregar posts (supondo que o backend retorna se o usuário curtiu cada post)
useEffect(() => {
    setLikedPosts(posts.filter(post => post.curtidoPorUsuario).map(post => post.id));
}, [posts]);

// Modal para comentar
const [showCommentModal, setShowCommentModal] = useState(false);
const [modalCommentText, setModalCommentText] = useState('');
const [modalPostId, setModalPostId] = useState(null);

const openCommentModal = (postId) => {
    if (!postId) {
        alert('ID do post inválido!');
        return;
    }
    setModalPostId(postId);
    setModalCommentText('');
    setShowCommentModal(true);
};

const closeCommentModal = () => {
    setShowCommentModal(false);
    setModalCommentText('');
    setModalPostId(null);
};

const sendModalComment = async () => {
    if (!modalPostId) {
        alert('ID do post inválido!');
        return;
    }
    try {
        await fetch(`http://localhost:8080/api/comments/post/${modalPostId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: modalCommentText })
        });
        closeCommentModal();
        fetchPosts();
    } catch (err) {
        alert('Erro ao comentar');
    }
};

const handleShare = (postId) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
    alert('Link do post copiado!');
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
                                            className={activeTab === 'mensagens' ? 'active' : ''}
                                            onClick={() => setActiveTab('mensagens')}
                                        >
                                            <i className="fas fa-message"></i>Mensagens
                                        </Link>
                                    </li>
                        
                                    <li>
                                        <Link 
                                            to="/demandas"
                                            className={activeTab === 'demandas' ? 'active' : ''}
                                            onClick={() => setActiveTab('demandas')}
                                        >
                                            <i className="fas fa-handshake"></i>Demandas
                                        </Link>
                                    </li>

                                    <li>
                                        <Link 
                                            to="/perfil"
                                            className={activeTab === 'perfil' ? 'active' : ''}
                                            onClick={() => setActiveTab('perfil')}
                                        >
                                            <i className="fas fa-circle-user"></i>Perfil
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

                            {/* Posts dinâmicos do backend */}
                            {posts.length === 0 ? (
    <div className="text-center text-muted mt-4">Nenhum post encontrado.</div>
) : (
    filtrarPosts(posts).map((post) => {
        let fotoAutorSrc = `http://localhost:8080/tcc/usuarios/${post.autor}/foto`;
        
        // perfilPadrao;
        if(!fotoAutorSrc) fotoAutorSrc = perfilPadrao;
        console.log(fotoAutorSrc);
        return (
        <div className="post-card card" key={post.id}>
            <div className="post-header">
                <img
                    src={fotoAutorSrc}
                    className="post-avatar"
                    alt={post.autorNome || 'Usuário'}
                    // onError={e => { e.target.onerror=null; e.target.src=perfilPadrao; }}
                />
                <div className="post-author">
                    <h6>{post.autorNome || 'Usuário'}</h6>
                    <small><i className="fas fa-map-marker-alt me-1"></i>{post.localizacao || ''} • {post.tempoPostado || ''}</small>
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
                <p>{post.message}</p>
                {(post.nomeArquivoPost || post.tipoMimePost || post.fotoPost) && (
                    (() => {
                        let imgSrc = '';
                        if (post.fotoPost) {
                            if (Array.isArray(post.fotoPost)) {
                                // Array de bytes
                                const byteArray = new Uint8Array(post.fotoPost);
                                const base64String = btoa(String.fromCharCode(...byteArray));
                                imgSrc = `data:image/jpeg;base64,${base64String}`;
                            } else if (typeof post.fotoPost === 'string' && post.fotoPost.startsWith('data:image')) {
                                // Base64
                                imgSrc = post.fotoPost;
                            } else if (typeof post.fotoPost === 'string' && post.fotoPost.length > 10) {
                                // URL
                                imgSrc = post.fotoPost;
                            }
                        } else {
                            imgSrc = `http://localhost:8080/api/posts/${post.id}/image`;
                        }
                        return (
                            <img
                                src={imgSrc}
                                className="post-image"
                                alt="Mídia do post"
                                onError={e => e.target.style.display = 'none'}
                            />
                        );
                    })()
                )}
                {post.comments && post.comments.length > 0 && (
                    <div className="comments-list mt-2">
                        <h6 className="fw-bold mb-2">Comentários</h6>
                        {post.comments.map((comment) => {
                            let fotoSrc = perfilPadrao;
                            if (comment.fotoUsuario) {
                                // Se vier como array de bytes
                                if (Array.isArray(comment.fotoUsuario)) {
                                    const byteArray = new Uint8Array(comment.fotoUsuario);
                                    const base64String = btoa(String.fromCharCode(...byteArray));
                                    fotoSrc = `data:image/jpeg;base64,${base64String}`;
                                } else if (typeof comment.fotoUsuario === 'string') {
                                    // Se já vier como base64
                                    fotoSrc = `data:image/jpeg;base64,${comment.fotoUsuario}`;
                                } else {
                                    // Se vier como URL
                                    fotoSrc = comment.fotoUsuario;
                                }
                            }
                            return (
                                <div key={comment.id} className="comment-item d-flex align-items-center mb-2">
                                    <img
                                        src={fotoSrc}
                                        className="post-avatar me-2"
                                        alt={comment.nomeUsuario || 'Usuário'}
                                        style={{ width: 32, height: 32 }}
                                    />
                                    <div>
                                        <span className="fw-bold">{comment.nomeUsuario || 'Usuário'}: </span>
                                        <span className="comment-content">{comment.content}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="post-actions">
                <button
                    className="btn-action"
                    style={{ color: likedPosts.includes(post.id) ? 'green' : undefined }}
                    onClick={() => handleLike(post.id)}
                >
                    <i className="far fa-heart me-1"></i>Curtir ({post.likes || 0})
                </button>
                <button className="btn-action" onClick={() => openCommentModal(post.id)}>
                    <i className="far fa-comment me-1"></i>Comentar ({post.comments ? post.comments.length : 0})
                </button>
                <button className="btn-action" onClick={() => handleShare(post.id)}>
                    <i className="fas fa-share me-1"></i>Compartilhar
                </button>
            </div>
        </div>
        );
    })
)}

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

            {/* Modal de Comentários */}
            {showCommentModal && (
    <div className="modal" style={{ display: 'block', background: 'rgba(0,0,0,0.5)', position: 'fixed', top:0, left:0, width:'100vw', height:'100vh', zIndex:9999 }}>
        <div className="modal-dialog" style={{ margin: '10vh auto', maxWidth: 400 }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Comentar</h5>
                    <button type="button" className="btn-close" onClick={closeCommentModal}></button>
                </div>
                <div className="modal-body">
                    <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Digite seu comentário..."
                        value={modalCommentText}
                        onChange={e => setModalCommentText(e.target.value)}
                    />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeCommentModal}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={sendModalComment}>Enviar</button>
                </div>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default Inicio;
