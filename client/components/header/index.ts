import { state } from "../../state";

class Header extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.nombre = currentState.nombre;
      this.render();
    });
    this.render();
  }

  nombre: string = "Bienvenido";

  render() {
    this.innerHTML = `
            <header class="header">Hola ${this.nombre}!</header>
        `;
    const style = document.createElement("style");
    style.innerHTML = `
        .header{
            background: purple;
            color:white;
            padding: 10px;
            text-align: center;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    `;

    this.appendChild(style);
  }
}

customElements.define("custom-header", Header);
