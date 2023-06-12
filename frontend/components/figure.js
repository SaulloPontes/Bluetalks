const figureElement = (id, name, imageUrl, audioUrl) => `
<div class="shadow mb-4 border p-1 col rounded" style="min-width: 200px; max-width: 200px;" onclick="(function(){ document.getElementById('${id}-audio').play()})()">
    <a>
        <img class="img-category img-fluid mt-2" src="${imageUrl}" class="border border-dark mt-2 rounded"
        width="100%" alt="">
    </a>
    <div class="h5 font-open-sans text-center my-3">
        ${name}
    </div>
    <audio id=${id}-audio src=${audioUrl}></audio>
</div>`;

class Figure extends HTMLElement{
    data = {};

    constructor(){
        super();
    }

    connectedCallback(){
        this.setData();
        this.setStyle();
        this.innerHTML = figureElement(this.data.id, this.data.name, this.data.image, this.data.audio);
    }
    
    setStyle(){
        this.classList.add("col-md-5");
        this.classList.add("col-lg-3");
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
        if(this.hasAttribute('audio'))
            this.data.audio = this.getAttribute('audio');
    }
}

customElements.define('figure-component', Figure);