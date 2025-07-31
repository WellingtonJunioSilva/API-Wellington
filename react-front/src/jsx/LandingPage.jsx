import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import chico from "../IMG/chico bento.png";
import agricultura from "../IMG/agricultura familiar.jpg";
import '../css/landingPage.css';

export default function LandingPage() {
  return (
    <>
      {/* NAVBAR */}
<nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm py-3">
  <div className="container-fluid px-4">
    <Link className="navbar-brand fw-bold text-white" to="/">ApoiaRural</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarNav">
      {/* Se quiser reativar os links do menu, descomente o bloco abaixo */}
      {/*
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><a className="nav-link text-white" href="#">Sobre</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Contato</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Produtores</a></li>
        <li className="nav-item"><a className="nav-link text-white" href="#">Apoiadores</a></li>
      </ul>
      */}
      
      {/* Botões alinhados à direita */}
      <div className="d-flex ms-auto gap-2">
        <Link className="btn btn-outline-light" to="/cadastro">Cadastre-se</Link>
        <Link className="btn btn-light text-success fw-semibold" to="/login">Login</Link>
      </div>
    </div>
  </div>
</nav>


      {/* HERO SECTION */}
      <section className="hero py-5 bg-light">
        <div className="container hero__content d-flex flex-column flex-md-row align-items-center gap-5">
          {/* TEXTO */}
          <div className="hero__text">
            <h1 className="hero__title mb-4">
              CONECTAMOS <br />
              AGRICULTORES COM <br />
              QUEM QUER <br />
              COMPRAR SUA <br />
              PRODUÇÃO
            </h1>
            <h2 className="hero__subtitle mb-4">
              Valorize sua colheita. Anuncie sua safra excedente e encontre compradores!
            </h2>
            <div className="hero__buttons d-flex flex-column flex-md-row gap-3 mt-3">
              <Link to="/demandas" className="btn-cadastroSafra">
                <i className="bi bi-plus-circle"></i> Cadastrar safra
              </Link>
              <Link to="/demandas" className="btn-apoiador">
                <i className="bi bi-heart"></i> Sou apoiador
              </Link>
            </div>
          </div>

          {/* IMAGEM */}
          <div className="hero__image-container">
            <img
              src={agricultura}
              alt="Família de agricultores"
              className="hero__image img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* DEPOIMENTO E CARDS */}
      <section className="testimonials py-5 bg-white">
        <div className="container text-center">
          {/* DEPOIMENTO */}
          <div className="bg-depoimento mb-5 p-4">
            <img src={chico} alt="Chico Bento" width="70" className="mb-3 rounded-circle" />
            <p>
              <em>"Consegui distribuir minha produção de goiaba para um hortifruti!"</em><br />
              <small className="text-muted">Chico Bento, Vila Abobrinha</small>
            </p>
          </div>

          {/* CARDS */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card cartoes h-100">
                <div className="icon"><i className="bi bi-basket"></i></div>
                <h6>Agricultor cadastra o excedente</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card cartoes h-100">
                <div className="icon"><i className="bi bi-eye"></i></div>
                <h6>Apoiador visualiza produtos disponíveis</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card cartoes h-100">
                <div className="icon"><i className="bi bi-check-circle"></i></div>
                <h6>Conexão direta e eficiente</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
