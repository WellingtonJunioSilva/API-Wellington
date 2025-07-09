'use strict';

const limparFormulario = () => {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById('tipo_usuario').value = "";
    document.getElementById("tipo_apoiador").value = "";
    document.getElementById("senha").value = "";
}  

function verificarTipoUsuario() {
    const tipo_usuario = document.getElementById('tipo_usuario').value;
    const campoApoiador = document.getElementById('campo_apoiador');

    if (tipo_usuario === "APOIADOR") {
        campoApoiador.style.display = 'block';
    } else {
        campoApoiador.style.display = 'none';
    }
}

const cepValido = (cep) => cep.length === 8 && /^\d+$/.test(cep);

const preencherCep = (endereco) => {
    document.getElementById("cep").value = endereco.cep || "";
    document.getElementById("cidade").value = endereco.localidade || "";
    document.getElementById("estado").value = endereco.uf || "";
}

const buscarCep = async () => {
    const cep = document.getElementById("cep").value.replace('_', '').trim();
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        try {
            const response = await fetch(url);
            const endereco = await response.json();
            if (endereco.erro) {
                document.getElementById('cidade').value = "Cep inválido";
                limparFormulario();
            } else {
                preencherCep(endereco);
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            limparFormulario();
        }
    } else {
        document.getElementById('cidade').value = "Cep inválido";
        limparFormulario();
    }
}


const Adicionar = async (event) => {
    event.preventDefault();
    verificarTipoUsuario();

    // Coleta os valores dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const documento = document.getElementById("documento").value;
    const cep = document.getElementById("cep").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const telefone = document.getElementById("telefone").value;
    const tipo_usuario = document.getElementById("tipo_usuario");
    const tipoUsuarioValue = tipo_usuario.options[tipo_usuario.selectedIndex].value;
    const senha = document.getElementById("senha").value;



    const usuario = {
        nome: nome,
        email: email,
        documento: documento,
        cep: cep,
        cidade: cidade,
        estado: estado,
        telefone: telefone,
        tipo_usuario: tipoUsuarioValue,
        senha: senha
        };
    
        let tipo_apoiador = null;
    if (tipoUsuarioValue === "APOIADOR") {
        tipo_apoiador = document.getElementById("tipo_apoiador");
        tipo_apoiador = tipo_apoiador.options[tipo_apoiador.selectedIndex].value;
        usuario.tipo_apoiador = tipo_apoiador;
    }

    try {
        const response = await fetch(`http://localhost:8080/tcc/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

       alert("Usuário cadastrado com sucesso!");
        console.log("Usuário:", usuario);

        // SALVAR NO LOCALSTORAGE
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        limparFormulario();
        setTimeout(() => {
        window.location.href = "TelaInicial.html";
        }, 1000);
        // Redireciona após 1 segundo 
        
    } catch (error) {
        console.error("Erro ao adicionar usuário:", error);
        alert("Erro ao adicionar usuário. Tente novamente.");
    }
};
