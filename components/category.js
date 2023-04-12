const categoryComponent = (id, name, imageUrl) => `
<a href="/category/${id}">
                  <img src="${imageUrl}" class="border border-dark rounded"
                    width="100rem" alt="">
                </a>
                <div class="row mt-3">
                  <div class="col">
                    <h5>${name}</h5>
                  </div>
                </div>`;

class Category extends HTMLElement{
    data = {};

    constructor(){
        super();
    }

    connectedCallback(){
        this.setCategoryData();
        this.innerHTML = categoryComponent(this.data.id, this.data.name, this.data.image);
    }

    setCategoryData(){
        if(this.hasAttribute('id'))
            this.data.id = this.getAttribute('id');
        if(this.hasAttribute('image'))
            this.data.image = this.getAttribute('image');
        else
            this.data.image = "/assets/Imagens/blu.JPG";
        if(this.hasAttribute('name'))
            this.data.name = this.getAttribute('name');
    }
}

customElements.define('category-component', Category);