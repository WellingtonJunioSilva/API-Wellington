import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import chico from "../IMG/chico bento.png";
import agricultura from "../IMG/agricultura familiar.jpg";
import '../css/landingPage.css';

export default function LandingPage() {
  const [tipo, setTipo] = useState('agricultor');
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
                <i className="bi bi-heart"></i> Quero comprar!
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
        </div>
      </section>

      {/* CARDS */}
<section className="how-it-works-section">
  <div className="container">

    <div className="text-center mb-12 md:mb-16">
      <h1 className="section-title main-how-title">
        Como Funciona o Nosso Sistema
      </h1>
      <p className="section-subtitle">
        ApoiaRural é uma plataforma que conecta agricultores e compradores de forma simples e eficiente.
      </p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className={`btn ${tipo === 'agricultor' ? 'btn-success' : 'btn-outline-success'} fw-bold px-4 py-2 btn-how-switch`}
          onClick={() => setTipo('agricultor')}
        >
          Agricultores
        </button>
        <button
          className={`btn ${tipo === 'comprador' ? 'btn-success btn-how-switch-active' : 'btn-outline-success'} fw-bold px-4 py-2 btn-how-switch btn-how-comprador`}
          onClick={() => setTipo('comprador')}
        >
          Compradores
        </button>
      </div>
    </div>

    {/* Agricultores */}
    {tipo === 'agricultor' && (
      <div className="mb-16 bd:mb-24">
        <h2 className="card-section-title agricultor-title">Para Agricultores</h2>
        <div className="row g-4">
          <div className="col-md-4 agricultor">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-journal-plus" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">1. Cadastre sua Safra</h3>
              <p className="step-text">
                Anuncie sua safra ou excedentes de forma simples e rápida. Nossa plataforma é intuitiva e te ajuda a evitar o desperdício e alcançar mais compradores.
              </p>
            </div>
          </div>
          <div className="col-md-4 agricultor">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-bar-chart-line" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">2. Gerencie sua Venda</h3>
              <p className="step-text">
                Acompanhe o status dos seus anúncios e propostas em tempo real. Negocie diretamente com compradores e organize a logística de entrega.
              </p>
            </div>
          </div>
          <div className="col-md-4 agricultor">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-cash-coin" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">3. Receba o Pagamento</h3>
              <p className="step-text">
                Conclua a transação de forma segura. Receba o valor da sua venda diretamente na sua conta, sem burocracia ou intermediários.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Compradores */}
    {tipo === 'comprador' && (
      <div className="mb-16 bd:mb-24">
        <h2 className="card-section-title comprador-title">Para Compradores</h2>
        <div className="row g-4">
          <div className="col-md-4 comprador">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-search" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">1. Encontre Produtos Frescos</h3>
              <p className="step-text">
                Pesquise por produtos frescos, orgânicos e de alta qualidade, direto do produtor. Filtre por tipo de produto, localização e volume para encontrar o que precisa.
              </p>
            </div>
          </div>
          <div className="col-md-4 comprador">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-chat-dots" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">2. Negocie e Feche o Pedido</h3>
              <p className="step-text">
                Converse diretamente com o agricultor para negociar preço, quantidade e forma de entrega. Feche o pedido com confiança, sabendo a origem do seu alimento.
              </p>
            </div>
          </div>
          <div className="col-md-4 comprador">
            <div className="step-card">
              <div className="step-icon-wrapper">
                <i className="bi bi-truck" style={{fontSize: '2rem'}}></i>
              </div>
              <h3 className="step-title">3. Receba sua Entrega</h3>
              <p className="step-text">
                Acompanhe a logística da entrega e receba os produtos no seu estabelecimento ou residência. Garanta a qualidade e a frescura que só o campo oferece.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</section>
    </>
  );
}
