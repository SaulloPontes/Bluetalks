const addComponentScript = (name) => {
    let element = document.createElement('script');
    element.setAttribute('src', `../../components/${name}.js`);
    document.head.appendChild(element);
}

const apiUrl = "http://localhost:3000"
const getPhotoUrl = (photo) => photo ? apiUrl + '/image/' + photo : '../../assets/Imagens/blu.JPG'

addComponentScript('header');
addComponentScript('footer');
addComponentScript('profile');
addComponentScript('category');
addComponentScript('navbar');
addComponentScript('figure');

