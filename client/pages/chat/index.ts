import { state } from "../../state";

class Chat extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.nombre = currentState.nombre;
      this.render();
    });
    this.render();
  }
  nombre: string = "Test";

  render() {
    this.innerHTML = `
            <custom-header></custom-header>
            <room-id-component></room-id-component>
        `;
  }
}

customElements.define("chat-page", Chat);
