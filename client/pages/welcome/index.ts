class Welcome extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
            <custom-header></custom-header>
            <welcome-form></welcome-form>
        `;
  }
}

customElements.define("welcome-page", Welcome);
