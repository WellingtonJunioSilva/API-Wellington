import React from "react";
import LandingPage from "./jsx/LandingPage";
import '../css/LandingPage.css';

export default function LandingPage() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark py-3 px-4">
        <a className="navbar-brand fw-bold text-white" href="#">
          AgroTech
        </a>

        {/* Botão hamburguer */}
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

        {/* Itens colapsáveis */}
        <div
          className="collapse navbar-collapse justify-content-end collapse-transition"
          id="navbarContent"
        >
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Sobre
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Contato
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Produtores
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#">
                Apoiadores
              </a>
            </li>
            <li className="nav-item mt-3 mt-lg-0">
              <a
                className="btn btn-outline-light me-lg-2 mb-2 mb-lg-0"
                href="../HTML/Cadastro_Usuarios.html"
              >
                Cadastre-se
              </a>
              <a
                className="btn btn-light text-success"
                href="../HTML/Login.HTML"
              >
                Entrar
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <div className="row align-items-center py-8 gx-4 gy-4">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="texto-principal">
                CONECTAMOS <br />
                AGRICULTORES COM <br />
                QUEM QUER <br />
                COMPRAR SUA <br />
                PRODUÇÃO
              </h1>

              <h2 className="subtexto mt-3">
                Valorize sua colheita. Anuncie sua safra excedente e encontre
                compradores !!
              </h2>

              <div className="d-flex flex-wrap gap-2 mt-4 justify-align-center">
                <a
                  className="btn btn-cadastroSafra d-flex align-items-center gap-2"
                  href="../HTML/Demandas.html"
                >
                  <i className="bi bi-journal-plus"></i>
                  Cadastrar safra
                </a>
                <a
                  className="btn btn-apoiador d-flex align-items-center gap-2"
                  href="../HTML/Demandas.html"
                >
                  <i className="bi bi-person"></i>
                  Sou apoiador
                </a>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="../IMG/agricultura familiar.jpg"
                alt="Família de agricultores"
                className="img-fluid hero-image"
              />
            </div>
          </div>
        </div>

        <div className="container my-5">
          <div className="row align-items-stretch mt-5 gx-4 gy-4">
            <div className="col-lg-5">
              <div className="bg-depoimento p-3 h-100 d-flex flex-column justify-content-center text-center">
                <img
                  src="../IMG/chico bento.png"
                  alt="Chico Bento"
                  width="60"
                  className="mb-2 mx-auto"
                />
                <p className="mb-1 fw-semibold">
                  "Consegui distribuir minha produção de goiaba para um
                  hortifruti!"
                  <br />
                  <small> Chico Bento, Vila Abobrinha</small>
                </p>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center">
                    <div className="icon fs-1 text-success">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <h6 className="fw-bold mt-3">
                      Agricultor cadastra o excedente
                    </h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center">
                    <div className="icon fs-1 text-success">
                      <i className="bi bi-search"></i>
                    </div>
                    <h6 className="fw-bold mt-3">
                      Apoiador visualiza produtos disponíveis
                    </h6>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card cartoes p-3 h-100 text-center">
                    <div className="icon fs-1">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <h6 className="fw-bold mt-3">Conexão acontece entre as partes</h6>
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
