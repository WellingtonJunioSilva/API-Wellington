import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const PerfilUser = () => {
    const [usuario, setUsuario] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState("");
    const [biografia, setBiografia] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('sobre');
    const [searchTerm, setSearchTerm] = useState('');
    const [filtros, setFiltros] = useState({ tipoUsuario: null, ordenacao: null });

    const emailUsuario = JSON.parse(localStorage.getItem("usuarioLogado")).email;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:8080/tcc/usuarios/email/${emailUsuario}`);
                const data = await res.json();
                setUsuario(data);
                setFotoPerfil(data.foto_perfil || "");
                setBiografia(data.biografia || "");
                setEmail(data.email || "");
                setTelefone(data.telefone || "");
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [emailUsuario]);

    const handleSalvarPerfil = async () => {
        if (!usuario) return;
        const dadosAtualizados = {
            ...usuario,
            foto_perfil: fotoPerfil,
            biografia,
            email,
            telefone
        };

        try {
            const res = await fetch(`http://localhost:8080/tcc/usuarios/${usuario.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados)
            });
            const data = await res.json();
            setUsuario(data);
            alert("Perfil atualizado com sucesso!");
        } catch (err) {
            console.error("Erro ao atualizar perfil:", err);
            alert("Erro ao salvar alterações.");
        }
    };

    if (loading) return <div className="text-center mt-5">Carregando...</div>;
    if (!usuario) return <div className="alert alert-danger mt-5">Erro ao carregar perfil</div>;

    return (
        <div className="bg-light min-vh-100">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow sticky-top">
                <div className="container">
                    <Link className="navbar-brand" to="/inicio">
                        <i className="fas fa-leaf me-2"></i>AgroTech
                    </Link>
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
                                            className={activeTab === 'mensagens' ? 'active' : ''}
                                            onClick={() => setActiveTab('mensagens')}
                                        >
                                            <i className="fas fa-message"></i>Mensagens
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            to="/clima"
                                            className={activeTab === 'clima' ? 'active' : ''}
                                            onClick={() => setActiveTab('clima')}
                                        >
                                            <i className="fas fa-cloud-sun"></i>Clima
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
                                            onClick={() => setActiveTab('conexoes')}
                                        >
                                            <i className="fas fa-handshake"></i>Conexões
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

                    {/* Conteúdo principal */}
                    <div className = infoUsuarios></div>
                </div>
            </div>
        </div>
    );
};

export default PerfilUser;
