import React from "react";
import '../css/landingPageReact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
 import { Link, useNavigate } from "react-router-dom";


export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark py-3 px-4 shadow-sm" style={{background: 'linear-gradient(90deg, #2e7d32 60%, #388e3c 100%)'}}>
        <a className="navbar-brand fw-bold text-white fs-3" href="#" style={{letterSpacing: '2px'}}>AgroTech</a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end collapse-transition" id="navbarContent">
          <ul className="navbar-nav text-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="#">Sobre</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="#">Contato</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="#">Produtores</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-semibold" href="#">Apoiadores</a>
            </li>
            <li className="nav-item mt-3 mt-lg-0 d-flex gap-2">
              <a className="btn btn-outline-light rounded-pill px-4 fw-bold" href="../HTML/Cadastro_Usuarios.html">Cadastre-se</a>
              <a className="btn btn-light text-success rounded-pill px-4 fw-bold" href="../HTML/Login.HTML">Entrar</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section py-5" style={{background: '#fdf6ec'}}>
        <div className="container">
          <div className="row align-items-center py-5 gx-4 gy-4">
            <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start text-lg-start text-center mb-4 mb-lg-0">
              {/* Texto principal */}
              <h1 className="texto-principal mb-3" style={{fontWeight: 800, fontSize: '2.7rem', color: '#388e3c', lineHeight: 1.1, letterSpacing: '1px'}}>
                CONECTAMOS <br />
                AGRICULTORES COM <br />
                QUEM QUER <br />
                COMPRAR SUA <br />
                PRODUÇÃO
              </h1>
              {/* Texto secundário */}
              <h2 className="subtexto mt-3 mb-4" style={{fontWeight: 500, color: '#222', fontSize: '1.2rem'}}>
                Valorize sua colheita. Anuncie sua safra excedente e encontre compradores !!
              </h2>
              {/* Botões */}
              <div className="d-flex flex-wrap gap-3 mt-2">
                <a className="btn btn-warning d-flex align-items-center gap-2 px-4 py-2 fw-bold shadow-sm" style={{fontSize: '1.1rem', borderRadius: '30px'}} href="../HTML/Demandas.html">
                  <i className="bi bi-journal-plus"></i>
                  Cadastrar safra
                </a>
                <a className="btn btn-outline-success d-flex align-items-center gap-2 px-4 py-2 fw-bold shadow-sm" style={{fontSize: '1.1rem', borderRadius: '30px'}} href="../HTML/Demandas.html">
                  <i className="bi bi-person"></i>
                  Sou apoiador
                </a>
              </div>
            </div>
            {/* Imagem dos agricultores */}
            <div className="col-lg-6 text-center d-flex justify-content-center align-items-center">
              <img src="/IMG/agricultura familiar.jpg" alt="Família de agricultores" className="img-fluid hero-image shadow-lg rounded-4" style={{maxHeight: '340px', objectFit: 'cover', background: '#fff'}} />
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="row align-items-stretch mt-5 gx-4 gy-4">
            {/* Depoimento do usuário */}
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="bg-white p-4 h-100 d-flex flex-column justify-content-center text-center rounded-4 shadow-sm border border-2 border-success-subtle">
                <img src="/IMG/chico bento.png" alt="Chico Bento" width="70" className="mb-2 mx-auto rounded-circle border border-2 border-success" />
                <p className="mb-1 fw-semibold" style={{fontSize: '1.1rem', color: '#222'}}>
                  <span className="fst-italic">"Consegui distribuir minha produção de goiaba para um hortifruti!"</span><br />
                  <small className="text-success fw-bold">Chico Bento, Vila Abobrinha</small>
                </p>
              </div>
            </div>
            {/* Cartões de funções do sistema */}
            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center rounded-4 shadow-sm border-0">
                    <div className="icon fs-1 text-success mb-2">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <h6 className="fw-bold mt-2" style={{fontSize: '1.05rem'}}>Agricultor cadastra o excedente</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center rounded-4 shadow-sm border-0">
                    <div className="icon fs-1 text-success mb-2">
                      <i className="bi bi-search"></i>
                    </div>
                    <h6 className="fw-bold mt-2" style={{fontSize: '1.05rem'}}>Apoiador visualiza produtos disponíveis</h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center rounded-4 shadow-sm border-0">
                    <div className="icon fs-1 text-success mb-2">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <h6 className="fw-bold mt-2" style={{fontSize: '1.05rem'}}>Conexão acontece entre as partes</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ); 

}
