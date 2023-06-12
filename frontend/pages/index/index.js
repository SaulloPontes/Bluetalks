const apiUrl = "http://localhost:3000";
function setPerfis() {
    axios
    .get(`${apiUrl}/usuario/${localStorage.getItem('userId')}/associados`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("perfis-associados")
        response.data.slice(0, 4).forEach(element => {
            container.innerHTML += `<profile-component id="${element._id}" image="${getPhotoUrl(element.foto)}" name="${element.nome}"></profile-component>`
        });
    })
}

function setCategorias() {
    axios
    .get(`http://localhost:3000/usuario/${localStorage.getItem('userId')}/categoria`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("categorias")
        response.data.slice(0, 4).forEach(element => {
            container.innerHTML += `<category-component id="${element._id}" name="${element.nome}" image="${getPhotoUrl(element.imagem)}"></category-component>`
        })
    })
}

const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

setPerfis();
setCategorias();