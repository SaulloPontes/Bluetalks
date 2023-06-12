function login(){
    axios
    .post("http://localhost:3000/usuario/login", {
        "email": document.getElementById("email").value,
        "senha": document.getElementById("senha").value
    })
    .then(response => {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("userId", response.data.usuario._id)
        window.location.href = "../index/index.html"
    })
    .catch(error => {
        console.log(error)
    })

}