document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const mensagemErro = document.getElementById("mensagemErro");

  if (!email || !senha) {
    mensagemErro.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  const loginData = {
    email: email,
    senha: senha
  };

  try {
    const response = await fetch("http://localhost:8080/tcc/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });

    if (response.ok) {
      const usuario = await response.json();
      console.log("Login bem-sucedido:", usuario);
      
      // Armazenar os dados do usuário no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      
      // Redirecionar para a página protegida
      window.location.href = "TelaInicial.html";
    } else if (response.status === 401) {
      mensagemErro.textContent = "Usuário ou senha incorretos.";
    } else {
      mensagemErro.textContent = "Erro ao tentar fazer login.";
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
    mensagemErro.textContent = "Erro de conexão com o servidor.";
  }
});
