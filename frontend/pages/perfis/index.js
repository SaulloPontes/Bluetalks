const apiUrl = "http://localhost:3000";
function setPerfis() {
    axios
    .get(`${apiUrl}/usuario/${localStorage.getItem('userId')}/associados`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("perfis-associados")
        response.data.forEach(element => {
            container.innerHTML += `<profile-component id="${element._id}" image="${getPhotoUrl(element.foto)}" name="${element.nome}"></profile-component>`
        });
    })
}

const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

setPerfis();