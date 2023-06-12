function setData() {
    let profileId = window.location.href.split("#").pop()
    axios
    .get(`${apiUrl}/usuario/${profileId}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        document.getElementById("foto").src = getPhotoUrl(response.data.foto)
        document.getElementById("nome").innerHTML = response.data.nome
        document.getElementById("observacao").innerHTML = response.data.observacao ?? "Sem observações."
        const contatosContainer = document.getElementById("contatos")
        if (response.data.contatos.length == 0) contatosContainer.innerHTML = "Nenhum contato cadastrado."
        response.data.contatos.forEach(element => {
            contatosContainer.innerHTML += `<li style="list-style: disc; list-style-position: inside;">${element}</li>`;
        })
        
        const figurasContainer = document.getElementById("figuras")
        if (response.data.figuras.length == 0) figurasContainer.innerHTML = "Nenhuma figura cadastrada."
        response.data.figuras.forEach(element => {
            axios.get(`${apiUrl}/figura/${element}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(figuraResponse => {
                let figura = figuraResponse.data
                figurasContainer.innerHTML += `<figure-component id="${figura._id}" name="${figura.nome}" image="${getPhotoUrl(figura.imagem)}" audio="${getPhotoUrl(element.audio)}"></figure-component>`
            })
        })

    })
}

setData();