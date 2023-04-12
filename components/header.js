headerComponent = `<nav class="navbar navbar-expand-sm bg-body-tertiary p-0 header">
        <div class="container-fluid bg-primary px-5">
          <h1 class="navbar-brand fs-1 text-light" href="#">Bluetalks</h1>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="dropdown">
            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="d-flex align-items-center">
                <span class="me-3 text-light fs-4">Bestial</span>
                <img src="../../assets/Imagens/blu.JPG" width="60rem" class="rounded-circle border border-dark" alt="..." />
              </div>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li><a class="dropdown-item" href="#">Sair</a></li>
            </ul>
          </div>
        </div>
      </nav>`
      
class Header extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = headerComponent;
    }
}

customElements.define('header-component', Header);