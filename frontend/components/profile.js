profileComponent = (id, name, imageUrl) => `
<div class="shadow border p-1 col rounded" style="min-width: 200px; max-width: 200px;" onclick="(function() { window.location.href = '../perfil/perfil.html#${id}' })()">
<a>
    <img src="${imageUrl}" class="img-thumbnail img-fluid rounded-circle mt-2" alt="${name}'s profile picture"/>
</a>
<div class="row mt-3">
    <div class="h5 col font-open-sans">
        ${name}
    </div>
</div>
</div>`;

class Profile extends HTMLElement{
    data = {};
    
    constructor(){
        super();
    }

    connectedCallback(){
        this.setData();
        this.setStyle();
        this.innerHTML = profileComponent(this.data.id, this.data.name, this.data.image);
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

customElements.define('profile-component', Profile);