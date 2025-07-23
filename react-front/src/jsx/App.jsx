import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Cadastro from "./cadastro.jsx";
import Login from "./Login.jsx";
import Inicio from "./Inicio.jsx"; // Adicione esta importação

function App() {
  return (
    <Router>
      {/* Menu simples */}
      <nav style={styles.nav}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/cadastro" style={styles.link}>Cadastro</Link>
        <Link to="/inicio" style={styles.link}>Inicio</Link> {/* Corrigido aqui */}
      </nav>

      {/* Definindo rotas */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redireciona para Login por padrão */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px",
    background: "#2d5a27",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default App;