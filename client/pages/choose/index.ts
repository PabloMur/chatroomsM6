class ChoosePage extends HTMLElement {
  render() {
    const style = document.createElement("style");
    this.innerHTML = `
        <div class="container">
            <custom-header></custom-header>
            <custom-questionary></custom-cuestionary>
        </div>
    `;
    this.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
}
customElements.define("choose-page", ChoosePage);
