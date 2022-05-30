import { state } from "../../state";

class RoomId extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      const currentState = state.getState();
      this.roomId = currentState.roomId;
      this.render();
    });
    this.render();
  }

  roomId: string = "0000";

  render() {
    const style = document.createElement("style");
    this.innerHTML = `
            <div class="room_id-container">
                <p>Sala: ${this.roomId}</p>
            </div>
        `;
    style.innerHTML = `
      .room_id-container{
        display: inline-block;
        color: white;
        background: #c918c9;
        width: auto;
        padding: 5px;
        border-radius: 5px;
      }
    `;
    this.appendChild(style);
  }
}

customElements.define("room-id-component", RoomId);
