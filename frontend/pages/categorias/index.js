let categorias = [];
function setCategorias() {
  axios
    .get(
      `${apiUrl}/usuario/${localStorage.getItem(
        'userId'
      )}/categoria`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    )
    .then((response) => {
      const container = document.getElementById('categorias');
      response.data.forEach((element) => {
        categorias.push(element);
        container.innerHTML += `<category-component id="${element._id}" name="${
          element.nome
        }" image="${getPhotoUrl(element.imagem)}"></category-component>`;
      });
    });
}

function postNewCategoria(){
  const nomeCategoria = document.getElementById('nomeCategoria').value;
  const imagem = document.getElementById('imagem').files[0];

  const formData = new FormData();
  formData.append('nome', nomeCategoria);
  formData.append('imagem', imagem);

  const url = `${apiUrl}/usuario/${localStorage.getItem(
    'userId'
  )}/categoria`;

  axios.post(url, formData);
};

function handleEditCategory(event, id){
  event.stopPropagation();

  const categoria = categorias.find(categoria => categoria._id === id);
  document.getElementById('editCategoriaModalButton').click();
  document.getElementById('editNomeCategoria').value = categoria.nome;

  document.getElementById('editCategoriaButton').onclick = () => { 
      const nomeCategoria = document.getElementById('editNomeCategoria').value;
      const imagem = document.getElementById('editImagem').files[0];
    
      const formData = new FormData();
      if(nomeCategoria !== categoria.nome)
          formData.append('nome', nomeCategoria);
      if(imagem)
        formData.append('imagem', imagem);
    
      const url = `${apiUrl}/usuario/${localStorage.getItem('userId')}/categoria/${id}`;
    
      axios.put(url, formData).then(response => {
        window.location.reload();
      });
  }
}

setCategorias();
