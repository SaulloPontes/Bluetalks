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

setPerfis();