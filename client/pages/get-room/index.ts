import { state } from "../../state";
import { Router } from "@vaadin/router";

class GetRoom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  addListeners() {
    const form = document.querySelector(".form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const target = e.target as any;
      const roomCode = target.roomcode.value;
      const currentState = state.getState();
      currentState.roomId = Number(roomCode);
      await state.setState(currentState);

      await state.signIn(() => {
        state.accessRoom(() => {
          Router.go("/chat");
        });
      });
    });

    // crearSala.addEventListener("click", () => {
    //   state.signIn(() => {
    //     state
    //       .askNewRoom(() => {
    //         state.accessRoom();
    //       })
    //       .then(() => {
    //         Router.go("/chat");
    //       });
    //   });
    // });
  }

  render() {
    this.innerHTML = `
        <custom-header></custom-header>
        <div>
            <form class="form">
                <input type="text" name="roomcode"></>
                <button class="button">Ingresar a la sala</button>
            </form>
        </div>
      `;
    this.addListeners();
  }
}

customElements.define("get-room-page", GetRoom);
