const addComponentScript = (name) => {
    let element = document.createElement('script');
    element.setAttribute('src', `/components/${name}.js`);
    document.head.appendChild(element);
}

addComponentScript('header');
addComponentScript('footer');
addComponentScript('profile');
addComponentScript('category');
addComponentScript('navbar');