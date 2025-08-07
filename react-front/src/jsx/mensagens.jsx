import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import perfilPadrao from "../IMG/icon perfil novo.png";

export default function mensagens() {

    return (
        <div className="bg-light min-vh-100">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow sticky-top">
            <div className="container">
              <Link className="navbar-brand" to="/inicio">
                <i className="fas fa-leaf me-2"></i>AgroTech
              </Link>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select className="form-select" onChange={(e) => setFiltros({ ...filtros, tipoUsuario: e.target.value || null })}>
                  <option value="">Filtrar por tipo</option>
                  <option value="Produtor">Produtor</option>
                  <option value="Apoiador">Apoiador</option>
                </select>
                <select className="form-select" onChange={(e) => setFiltros({ ...filtros, ordenacao: e.target.value || null })}>
                  <option value="">Ordenar por</option>
                  <option value="recentes">Mais Recentes</option>
                </select>
              </div>
            </div>
          </nav>
        </div>
    );    
}