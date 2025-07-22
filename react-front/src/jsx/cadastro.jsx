import React, { useState } from "react";
import "../css/telaCadastroReact.css"; // CSS personalizado

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    documento: "",
    cep: "",
    cidade: "",
    estado: "",
    telefone: "",
    tipo_usuario: "",
    tipo_apoiador: "",
    senha: "",
  });

  const limparFormulario = () => {
    setForm({
      nome: "",
      email: "",
      documento: "",
      cep: "",
      cidade: "",
      estado: "",
      telefone: "",
      tipo_usuario: "",
      tipo_apoiador: "",
      senha: "",
    });
  };

  const cepValido = (cep) => cep.length === 8 && /^\d+$/.test(cep);

  const buscarCep = async () => {
    const cep = form.cep.replace("_", "").trim();
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
      try {
        const response = await fetch(url);
        const endereco = await response.json();
        if (endereco.erro) {
          alert("CEP não encontrado");
        } else {
          setForm((prev) => ({
            ...prev,
            cep: endereco.cep || "",
            cidade: endereco.localidade || "",
            estado: endereco.uf || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar CEP. Tente novamente.");
      }
    } else {
      alert("CEP inválido. Deve conter 8 dígitos.");
    }
  };

  const Adicionar = async (event) => {
    event.preventDefault();
    const usuario = { ...form };

    try {
      const response = await fetch(`http://localhost:8080/tcc/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) throw new Error(`Erro ${response.status}`);
      alert("Usuário cadastrado com sucesso!");
      localStorage.setItem("usuario", JSON.stringify(usuario));
      limparFormulario();
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-left">
        <h1>Bem-vindo!</h1>
        <p>Cadastre-se para aproveitar todos os recursos.</p>
      </div>

      <div className="cadastro-right">
        <div className="cadastro-card">
          <h3>Cadastro de Usuários</h3>
          <form onSubmit={Adicionar}>
            <input
              type="text"
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Documento"
              value={form.documento}
              onChange={(e) => setForm({ ...form, documento: e.target.value })}
            />
            <input
              type="text"
              placeholder="CEP"
              value={form.cep}
              onChange={(e) => setForm({ ...form, cep: e.target.value })}
              onBlur={buscarCep}
            />
            <input
              type="text"
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
            <input
              type="text"
              placeholder="Estado"
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
            <select
              value={form.tipo_usuario}
              onChange={(e) => setForm({ ...form, tipo_usuario: e.target.value })}
            >
              <option value="">Selecione o tipo</option>
              <option value="APOIADOR">Apoiador</option>
              <option value="PRODUTOR">Produtor</option>
            </select>
            {form.tipo_usuario === "APOIADOR" && (
              <select
                value={form.tipo_apoiador}
                onChange={(e) =>
                  setForm({ ...form, tipo_apoiador: e.target.value })
                }
              >
                <option value="">Tipo de Apoiador</option>
                <option value="PESSOA_FISICA">Pessoa Física</option>
                <option value="ONG">ONG</option>
                <option value="EMPRESA_COMERCIO">Empresa/Comércio</option>
                <option value="CONVENIADO">Conveniado</option>
              </select>
            )}
            <input
              type="password"
              placeholder="Senha"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
