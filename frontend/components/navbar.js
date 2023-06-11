const navbarElement = () => `
<div class="position-sticky pt-4 ps-0 ms-0 sidebar-sticky" style="top: 50px">
<ul class="nav flex-column">
  <li class="nav-item">
    <a id="inicio-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="../../pages/index/index.html">
      <img class="img-w" src="../../assets/Imagens/User.svg" alt="Icone do início">
      Início
    </a>
  </li>
  <li class="nav-item">
    <a id="categorias-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="../../pages/categorias/categorias.html">
      <img class="img-w" src="../../assets/Imagens/Category.svg" alt="">
      Categorias
    </a>
  </li>
  <li class="nav-item">
    <a id="perfis-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="../../pages/perfis/perfis.html">
      <img class="img-w" src="../../assets/Imagens/Users.svg" alt="">
      Perfis
    </a>
  </li>
  <li class="nav-item">
    <a id="configuracoes-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="../../pages/configuracoes/configuracoes.html">
      <img class="img-w" src="../../assets/Imagens/Settings.svg" alt="">
      Configurações
    </a>
  </li>
  </ul>
  </div>
</div>`;

class Navbar extends HTMLElement {
    data = {};

    constructor() {
        super();
    }

    connectedCallback() {
        this.setData();
        this.setElementStyle();
        this.innerHTML = navbarElement();
        document.getElementById(`${this.data.current}-opt`).classList.add("fw-bold");
    }

    setElementStyle() {
        this.id = "sidebarMenu"
        this.classList.add("col-md-3")
        this.classList.add("col-lg-2")
        this.classList.add("col-xl-2")
        this.classList.add("d-md-block")
        this.classList.add("bg-white")
        this.classList.add("sidebar")
        this.classList.add("collapse")
        this.classList.add("shadow")

    }

    setData() {
        if (this.hasAttribute("current"))
            this.data.current = this.getAttribute("current");
    }
}

customElements.define('navbar-component', Navbar);