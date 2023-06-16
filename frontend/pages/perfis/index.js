function setPerfis() {
  axios
    .get(`${apiUrl}/usuario/${localStorage.getItem('userId')}/associados`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      const container = document.getElementById('perfis-associados');
      response.data.forEach((element) => {
        container.innerHTML += `<profile-component id="${
          element._id
        }" image="${getPhotoUrl(element.foto)}" name="${
          element.nome
        }"></profile-component>`;
      });
    });
}

function addProfile() {
  let profileId = document.getElementById('idPerfil').value;

  const url = `${apiUrl}/usuario/${localStorage.getItem(
    'userId'
  )}/associados/${profileId}`;

  axios
    .post(url, {}, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then((response) => {
      window.location.reload();
    });
}

setPerfis();
