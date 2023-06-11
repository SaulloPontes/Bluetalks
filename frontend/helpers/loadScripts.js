const addComponentScript = (name) => {
    let element = document.createElement('script');
    element.setAttribute('src', `../../components/${name}.js`);
    document.head.appendChild(element);
}
const addAxios = () => {
    let element = document.createElement('script');
    element.setAttribute('src', `https://unpkg.com/axios/dist/axios.min.js`);
    document.head.appendChild(element);
}

addComponentScript('header');
addComponentScript('footer');
addComponentScript('profile');
addComponentScript('category');
addComponentScript('navbar');
addComponentScript('figure');
addAxios();

