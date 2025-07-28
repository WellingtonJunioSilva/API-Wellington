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
                    <div className="d-flex gap-3">
                        <input type="text" className="form-control" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <select className="form-select" value={filtros.tipoUsuario || ''} onChange={(e) => setFiltros({ ...filtros, tipoUsuario: e.target.value || null })}>
                            <option value="">Filtrar por tipo</option>
                            <option value="Produtor">Produtor</option>
                            <option value="Apoiador">Apoiador</option>
                        </select>
                        <select className="form-select" value={filtros.ordenacao || ''} onChange={(e) => setFiltros({ ...filtros, ordenacao: e.target.value || null })}>
                            <option value="">Ordenar por</option>
                            <option value="recentes">Mais Recentes</option>
                        </select>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="card sidebar mb-4">
                            <div className="card-body sidebar-header text-center">
                                <img
                                    src={fotoPerfil || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                                    className="rounded-circle mb-3"
                                    width="120"
                                    height="120"
                                    alt="Foto do usuário"
                                />
                                <h5>{usuario.nome}</h5>
                                <p className="text-muted mb-1">
                                    {usuario.tipo_usuario} • {usuario.cidade}
                                </p>
                                <small className="text-muted">127 conexões</small>
                            </div>
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="col-lg-9">
                        <div className="card mb-4">
                            <div className="card-header">Editar Perfil</div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Foto (URL)</label>
                                    <input type="text" className="form-control" value={fotoPerfil} onChange={(e) => setFotoPerfil(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Biografia</label>
                                    <textarea className="form-control" value={biografia} onChange={(e) => setBiografia(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefone</label>
                                    <input type="text" className="form-control" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                </div>
                                <button className="btn btn-success" onClick={handleSalvarPerfil}>Salvar Alterações</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilUser;
