import { state } from "../../state";
import { Router } from "@vaadin/router";

class Questinary extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  addClickers() {
    const crearSala = document.querySelector(".crear");
    const otroButton = document.querySelector(".otro");

    otroButton.addEventListener("click", (e) => {
      e.preventDefault();
      Router.go("/getroom");
    });

    crearSala.addEventListener("click", () => {
      state.signIn(() => {
        state
          .askNewRoom(() => {
            state.accessRoom();
          })
          .then(() => {
            Router.go("/chat");
          });
      });
    });
  }
  render() {
    const style = document.createElement("style");

    this.innerHTML = `
    <div class="questionary_form-container">
      <button class="otro">Ingresar a una Sala</button>
      <button class="crear">Crear una nueva Sala</button> 
    </div>
    `;

    style.innerHTML = `
    .oculto{
      display:none;
    }
    .mostrado{
      display: block;
    }
    
    `;

    this.appendChild(style);
    this.addClickers();
  }
}
customElements.define("custom-questionary", Questinary);
