import { state } from "../../state";
import { Router } from "@vaadin/router";

class WelcomeForm extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const email = target.email.value;
      const nombre = target.nombre.value;
      state.setEmailAndNombre({ email: email, nombre: nombre });
      state.createUser();
      Router.go("/choose");
    });
  }
  render() {
    const style = document.createElement("style");
    this.innerHTML = `
      <div class="form-container">
        <form class="form">
          <div>
            <label class="label">Tu Email</label>
          </div>
          <input type="text" name="email" class="input">
          <div>
            <label class="label">Tu Nombre</label>
          </div>
          <input type="text" name="nombre" class="input">
          <div>
            <button class="ingresar">Ingresar</button>
          </div>
        </form>
      </div>
    `;
    style.innerHTML = `
      .form-container{
        min-height:90vh;
        display:flex;
        justify-content: center;
        align-items:center;
      }
      .form{
        background:#A99BFF;
        margin:0 auto;
        height: 100%;
        width: 33%;
        padding: 20px;
        text-align: center;
        border-radius: 5px;
      }
      .label{
        font-family: sans-serif;
        padding-top: 10px;
      }
      .input{
        width: 100%;
        height: 35px;
        border: none;
        border-radius: 5px;
        margin: 5px auto;
        box-shadow: 5px 5px 5px grey;
      }
      .ingresar{
        border:none;
        width: 100%;
        padding: 10px;
        margin-top: 10px;
        border-radius: 5px;
        background:#800080;
        color: white;
        box-shadow: 5px 5px 5px grey;
      }
    `;
    this.appendChild(style);
  }
}
customElements.define("welcome-form", WelcomeForm);
