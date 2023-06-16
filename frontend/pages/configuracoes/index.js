function setData() {
    axios.get(`${apiUrl}/usuario/${localStorage.getItem('userId')}`,  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        document.getElementById('name').textContent = userData.nome;
        document.getElementById('email').textContent = userData.email;
        document.getElementById('userId').textContent = "Id pessoal: " + userData._id;
        document.getElementById('photo').src = getPhotoUrl(userData.foto);
    
        document.getElementById('editNome').value = userData.nome;
        document.getElementById('editEmail').value = userData.email;
        document.getElementById('editObservacoes').value = userData.observacao;
        document.getElementById('editContatoDeEmergencia').value = userData.contatos[0] ?? '';
    });
}

function putEditPerfil() {
    const userData = JSON.parse(localStorage.getItem('user'));
    const nome = document.getElementById('editNome').value;
    const email = document.getElementById('editEmail').value;
    const observacao = document.getElementById('editObservacoes').value;
    const contatoDeEmergencia = document.getElementById('editContatoDeEmergencia').value;
    const foto = document.getElementById('editFoto').files[0];

    const formData = new FormData();
    if (nome && nome != userData.nome)
    formData.append('nome', nome);
    if (email && email != userData.email)
    formData.append('email', email);
    if (observacao && observacao != userData.observacao)
    formData.append('observacao', observacao);
    if (contatoDeEmergencia && contatoDeEmergencia != userData.contatos)
    formData.append('contatos', contatoDeEmergencia);
    if(foto)
        formData.append('foto', foto);
    
    const url = `${apiUrl}/usuario/${localStorage.getItem('userId')}`;
    
    axios.put(url, formData).then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
    });
}
setData();