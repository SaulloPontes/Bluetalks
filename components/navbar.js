const navbarElement = () => `
<div class="nav d-flex ms-5 mt-5 gap-3">
  <div class="row">
    <a class="nav-config nav-link d-flex align-items-center gap-4" id="font-bold" href="./index.html">
      <img class="img-w" src="/assets/Imagens/User2.svg" alt="Icone do início">
      Início
    </a>
  </div>
  <div class="row">
    <a class="nav-config nav-link d-flex align-items-center gap-4" href="/pages/categorias/categorias.html">
      <img class="img-w" src="/assets/Imagens/Category.svg" alt="">
      Categorias
    </a>
  </div>
  <div class="row">
    <a class="nav-config nav-link d-flex align-items-center gap-4" href="/pages/perfis/perfis.html">
      <img class="img-w" src="/assets/Imagens/Users.svg" alt="">
      Perfis
    </a>
  </div>
  <div class="row">
    <a class="nav-config nav-link d-flex align-items-center gap-4" href="#" data-bs-toggle="modal"
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
  </div>
  <div class="row">
    <a class="nav-config nav-link d-flex align-items-center gap-4"
      href="/pages/configuracoes/configuracoes.html">
      <img class="img-w" src="/assets/Imagens/Settings.svg" alt="">
      Configurações
    </a>
  </div>
</div>`;

class Navbar extends HTMLElement{
    data = {};
    
    constructor(){
        super();
    }

    connectedCallback(){
        this.setData();
        this.setElementStyle();
        this.innerHTML = navbarElement();
    }

    setElementStyle(){
        this.classList.add("col");
        this.classList.add("col-xxl-2");
        this.style.borderRight = '1px solid var(--bs-blue)';
    }

    setData(){
        
    }
}

customElements.define('navbar-component', Navbar);