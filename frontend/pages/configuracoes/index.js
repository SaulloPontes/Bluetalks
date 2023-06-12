const apiUrl = "http://localhost:3000";
function setData() {
    axios
    .get(`http://localhost:3000/usuario/${localStorage.getItem('userId')}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("categorias")
        response.data.forEach(element => {
            console.log(element)
            container.innerHTML += `<category-component id="${element._id}" name="${element.nome}" image="${getPhotoUrl(element.imagem)}"></category-component>`
        })
    })
}

const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

setData();