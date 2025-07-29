

function getPic() {
    const email = JSON.parse(localStorage.getItem("usuarioLogado")).email;
    fetch(`http://localhost:8080/tcc/usuarios/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { loadPic(data) 
    })
    .catch(error => {
        console.log(error);
    });
}

getPic();

function loadPic(data) {
    const modal = document.getElementById('modalPic');
    console.log(data);
    const img = document.createElement('img');
    if(data.foto_perfil === null) {
        img.src = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
    }
    else {
        img.src = data.foto_perfil;
    }
    img.alt = data.nome;
    img.class = "post-avatar";
    img.style = "width:120px; height:120px; border-width: 4px; border-radius: 50%;"
    modal.innerHTML = "";
    modal.appendChild(img);
    const sidebar = document.getElementById('sidebar-pic');
    sidebar.src = data.foto_perfil;
    sidebar.alt = data.nome;
    const perfil = document.getElementById('perfil-pic');
    perfil.src = data.foto_perfil;
    perfil.alt = data.nome;
}

function savePic() {
    const img = document.getElementById('link-img').value;
    const email = JSON.parse(localStorage.getItem("usuarioLogado")).email;
    fetch(`http://localhost:8080/tcc/usuarios/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { putPic(data, img) 
    })
    .catch(error => {
        console.log(error);
    });
}

function putPic(data, img) {
    const id = data.id;
    data.foto_perfil = img.toString();
    console.log("PUT: " + JSON.stringify(data));
    fetch(`http://localhost:8080/tcc/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { loadPic(data) })
    .catch(error => {
        console.log(error);
    })
}

getInfo();

function getInfo() {
    const email = JSON.parse(localStorage.getItem("usuarioLogado")).email;
    fetch(`http://localhost:8080/tcc/usuarios/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { loadInfo(data) 
    })
    .catch(error => {
        console.log(error);
    });
}

function loadInfo(data) {
    document.getElementById("bio-input").value = data.biografia;
    document.getElementById("email-input").value = data.email;
    document.getElementById("tel-input").value = data.telefone;
    document.getElementById("bioParagraph").innerHTML = data.biografia.toString();
    document.getElementById("emailParagraph").innerHTML = `<i class="fas fa-envelope me-2"></i>` + data.email;
    document.getElementById("telParagraph").innerHTML = `<i class="fas fa-phone me-2"></i>` + data.telefone;
}

function saveInfo() {
    const bio = document.getElementById('bio-input').value;
    console.log("bio: " + bio);
    const newEmail = document.getElementById('email-input').value;
    const tel = document.getElementById('tel-input').value;
    const email = JSON.parse(localStorage.getItem("usuarioLogado")).email;
    fetch(`http://localhost:8080/tcc/usuarios/email/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { putInfo(data, bio, newEmail, tel) 
    })
    .catch(error => {
        console.log(error);
    });
}

function putInfo(data, bio, email, tel) {
    const id = data.id;
    data.biografia = bio.toString();
    data.email = email.toString();
    data.tel = tel.toString();
    console.log("PUT: " + JSON.stringify(data));
    fetch(`http://localhost:8080/tcc/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { loadInfo(data); })
    .catch(error => {
        console.log(error);
    })
}