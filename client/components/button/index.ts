import { Router } from "@vaadin/router";

class CustomButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  addListener() {
    const button = document.querySelector(".button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("probando el botton");
    });
  }
  render() {
    this.innerHTML = `
            <button class="button">Ingresar a una sala</button>
        `;
    this.addListener();
  }
}

customElements.define("custom-button", CustomButton);
