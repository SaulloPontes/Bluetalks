const figureElement = (id, name, imageUrl) => `
<a href="/category/${id}">
                  <img src="${imageUrl}" class="border border-dark mt-2 rounded"
                    width="100%" alt="">
                </a>
                <div class="h5 font-open-sans text-center my-3">
                    ${name}
                </div>`;

class Figure extends HTMLElement{
    data = {};

    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = headerComponent;
        this.setData();
        this.setStyle();
        this.innerHTML = figureElement(this.data.id, this.data.name, this.data.image);
    }
    
    setStyle(){
        this.classList.add("col");
        this.classList.add("text-center");
    }

    setData(){
        if(this.hasAttribute('id'))
            this.data.id = this.getAttribute('id');
        if(this.hasAttribute('image'))
            this.data.image = this.getAttribute('image');
        else
            this.data.image = "../../assets/Imagens/blu.JPG";
        if(this.hasAttribute('name'))
            this.data.name = this.getAttribute('name');
    }
}

customElements.define('figure-component', Figure);