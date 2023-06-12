const categoryComponent = (id, name, imageUrl) => `
<div class="shadow border p-1 col rounded" onclick="(function() { window.location.href = '../figuras/figuras.html#${id}' })()" style="min-width: 200px; max-width: 200px;">
    <div class="icon-badge-container rounded" onclick="handleEditCategory(event, '${id}')">
        <img class="img-w" src="../../assets/Imagens/Edit.svg" alt="">
    </div>
    <a>
        <img src="${imageUrl}" class="img-category img-fluid mt-2"
        width="100%" alt="">
    </a>
    <div class="h5 font-open-sans text-center my-3">
        ${name}
    </div>
</div>`;

class Category extends HTMLElement{
    data = {};

    constructor(){
        super();
    }

    connectedCallback(){
        this.setData();
        this.setStyle();
        this.innerHTML = categoryComponent(this.data.id, this.data.name, this.data.image);
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

customElements.define('category-component', Category);