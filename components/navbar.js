const navbarElement = () => `
<div class="position-sticky pt-4 ps-0 ms-0 sidebar-sticky">
<ul class="nav flex-column">
  <li class="nav-item">
    <a id="inicio-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="/pages/index/index.html">
      <img class="img-w" src="/assets/Imagens/User2.svg" alt="Icone do início">
      Início
    </a>
  </li>
  <li class="nav-item">
    <a id="categorias-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="/pages/categorias/categorias.html">
      <img class="img-w" src="/assets/Imagens/Category.svg" alt="">
      Categorias
    </a>
  </li>
  <li class="nav-item">
    <a id="perfis-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="/pages/perfis/perfis.html">
      <img class="img-w" src="/assets/Imagens/Users.svg" alt="">
      Perfis
    </a>
  </li>
  <li class="nav-item">
    <a id="notificacoes-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="#" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <img class="img-w" src="/assets/Imagens/Bell.svg" alt="">
      Notificações
    </a>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Notificações</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body border">
            <div class="d-flex flex-row mb-3">
              <div class="p-2 text-center ">
                <span class=" text-center">lorem</span>
                <img src="/assets/Imagens/blu.JPG" class="rounded-circle border border-dark" alt="..." />
              </div>
              <div class="p-2  m-4"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, omnis
                cupiditate!
                Voluptatem blanditiis quae dolore optio, iusto modi aliquid. Magnam hic eaque eum cum nulla
                provident, quod itaque nisi consectetur.</div>
            </div>
            <div class="d-flex flex-row mb-3">
              <div class="p-2 text-center ">
                <span class=" text-center">lorem</span>
                <img src="/assets/Imagens/blu.JPG" class="rounded-circle border border-dark" alt="..." />
              </div>
              <div class="p-2 m-4 "> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, omnis
                cupiditate!
                Voluptatem blanditiis quae dolore optio, iusto modi aliquid. Magnam hic eaque eum cum nulla
                provident, quod itaque nisi consectetur.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
    <li class="nav-item">
    <a id="configuracoes-opt" class="nav-config nav-link d-flex align-items-center gap-2" href="/pages/configuracoes/configuracoes.html">
      <img class="img-w" src="/assets/Imagens/Settings.svg" alt="">
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
        this.classList.add("bg-body-tertiary")
        this.classList.add("sidebar")
        this.classList.add("collapse")
    }

    setData() {
        if (this.hasAttribute("current"))
            this.data.current = this.getAttribute("current");
    }
}

customElements.define('navbar-component', Navbar);