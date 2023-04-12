profileComponent = (id, name, imageUrl) => `
<a href="/profile/${id}">
    <img src="${imageUrl}" class="rounded-circle border border-dark" alt="${name}'s profile picture" />
</a>
<div class="row mt-3">
    <div class="col">
        <h5>${name}</h5>
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
            this.data.image = "/assets/Imagens/blu.JPG";
        if(this.hasAttribute('name'))
            this.data.name = this.getAttribute('name');
    }
}

customElements.define('profile-component', Profile);