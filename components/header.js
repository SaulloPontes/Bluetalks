headerComponent = `<header class="navbar navbar-expand-sm bg-body-tertiary p-0 header">
        <div class="container-fluid bg-primary px-5">
          <a class="navbar-brand col-md-3 col-lg-2 me-0 fs-2 text-light" href="#">Bluetalks</a>
          <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-nav">
            <div class="nav-item text-nowrap">
          
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
          </div>
        </div>
      </nav>`

class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = headerComponent;
    }
}

customElements.define('header-component', Header);