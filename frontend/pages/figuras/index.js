const apiUrl = "http://localhost:3000";
function setData() {
    let categoryId = window.location.href.split("#").pop()
    axios
    .get(`http://localhost:3000/usuario/categoria/${categoryId}/figura`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("figuras")
        response.data.forEach(element => {
            container.innerHTML += `<figure-component id="${element._id}" name="${element.nome}" image="${getPhotoUrl(element.imagem)}" audio="${getPhotoUrl(element.audio)}"></figure-component>`
        })
    })
}

const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

setData();