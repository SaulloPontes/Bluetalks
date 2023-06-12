let categoryId = window.location.href.split("#").pop()
let figuras = [];
function setData() {
    axios
    .get(`${apiUrl}/usuario/categoria/${categoryId}/figura`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(response => {
        const container = document.getElementById("figuras")
        response.data.forEach(element => {
            figuras.push(element)
            container.innerHTML += `<figure-component id="${element._id}" name="${element.nome}" image="${getPhotoUrl(element.imagem)}" audio="${getPhotoUrl(element.audio)}"></figure-component>`
        })
    })
}

function postNewFigura(id){
  const nomeFigura = document.getElementById('nomeFigura').value;
  const imagem = document.getElementById('imagem').files[0];
  const audio = document.getElementById('audio').files[0];

  const formData = new FormData();
  formData.append('nome', nomeFigura);
  formData.append('imagem', imagem);
  formData.append('audio', audio);

  const url = `${apiUrl}/usuario/categoria/${categoryId}/figura`;

  axios.post(url, formData);
}

function handleEditFigure(event, id){
    event.stopPropagation();

    const figura = figuras.find(figura => figura._id === id);
    document.getElementById('editFiguraModalButton').click();
    document.getElementById('editNomeFigura').value = figura.nome;

    document.getElementById('editFiguraButton').onclick = () => { 
        const nomeFigura = document.getElementById('editNomeFigura').value;
        const imagem = document.getElementById('editImagem').files[0];
        const audio = document.getElementById('editAudio').files[0];
      
        const formData = new FormData();
        if(nomeFigura !== figura.nome)
            formData.append('nome', nomeFigura);
        if(imagem)
          formData.append('imagem', imagem);
        if(audio)
          formData.append('audio', audio);
      
        const url = `${apiUrl}/usuario/categoria/${categoryId}/figura/${id}`;
      
        axios.put(url, formData);
        window.location.reload();
    }
}
setData();