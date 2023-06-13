function newPerfil() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const foto = document.getElementById('foto').files[0];

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('foto', foto);
    
    const url = `${apiUrl}/usuario`;
    
    axios.post(url, formData).then(response => {
        window.location.href = "../login/login.html"
    });
}