class Badge extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
  
      // Cargar la plantilla desde "element.html"
      fetch("Badge.html")
        .then(response => response.text())
        .then(html => {
          this.shadowRoot.innerHTML = html;
        });
    }
  }
  
  customElements.define("Badge", Badge);
  