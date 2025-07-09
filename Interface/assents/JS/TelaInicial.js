document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (usuarioLogado) {
    document.getElementById("nome-usuario").textContent = usuarioLogado.nome;
    document.getElementById("descricao-usuario").textContent =
      `${usuarioLogado.tipo_usuario} • ${usuarioLogado.cidade}`;
  } else {
    // Redirecionar para o login se não houver usuário logado
    window.location.href = "login.html";
  }
    console.log(localStorage.getItem ("usuarioLogado")  );
});