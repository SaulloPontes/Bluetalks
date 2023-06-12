headerComponent = (photoUrl) => `<header class="navbar navbar-expand-sm bg-body-tertiary p-0 header fixed-top">
        <div class="container-fluid bg-primary px-5">
          <a class="navbar-brand col-md-3 col-lg-2 me-0 fs-2 text-light" href="#">Bluetalks</a>

            <button class="navbar-toggler d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-nav">
              <div class="nav-item text-nowrap">
            
                <div class="dropdown">
                  <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="d-flex align-items-center">
                      <span class="me-3 text-light fs-4 d-none d-sm-block d-md-block d-lg-block">${JSON.parse(localStorage.getItem('user')).nome}</span>
                      <img src="${photoUrl}" width="60rem" class="rounded-circle border border-dark" alt="..." />
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
      </header>`
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      axios.get(`${apiUrl}/usuario/${localStorage.getItem('userId')}`,  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((response) => {
        this.innerHTML = headerComponent(getPhotoUrl(response.data.foto));
      })
    }
}

customElements.define('header-component', Header);