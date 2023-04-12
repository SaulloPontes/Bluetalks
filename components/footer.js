footerComponent = `<footer class="fixed-bottom bg-primary text-light pt-5"></footer>`


class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = footerComponent;
    }
}

customElements.define('footer-component', Footer);