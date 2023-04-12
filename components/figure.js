const figureElement = ``;

class Figure extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = headerComponent;
    }
}

customElements.define('figure-component', Figure);