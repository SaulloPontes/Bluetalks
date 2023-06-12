const apiUrl = "http://localhost:3000";
function setData() {
    let profileId = window.location.href.split("#").pop()
    axios
    .get(`http://localhost:3000/usuario/${profileId}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        document.getElementById("foto").src = getPhotoUrl(response.data.foto)
        document.getElementById("nome").innerHTML = response.data.nome
        document.getElementById("observacao").innerHTML = response.data.observacao
        const contatosContainer = document.getElementById("contatos")
        if (response.data.contatos.length == 0) contatosContainer.innerHTML = "Nenhum contato cadastrado."
        response.data.contatos.forEach(element => {
            contatosContainer.innerHTML += `<li style="list-style: disc; list-style-position: inside;">${element}</li>`;
        })
    })
}

const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

setData();