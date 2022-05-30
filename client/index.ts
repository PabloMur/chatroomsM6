import { state } from "./state";
//router
import "./router";
//pages
import "./pages/welcome/index";
import "./pages/choose/index";
import "./pages/chat/index";
import "./pages/get-room/index";
//components
import "./components/header/index";
import "./components/roomId/index";
import "./components/welcome-form/index";
import "./components/questionary/index";
import "./components/button/index";

(function () {
  state.init();
  // state.setEmailAndNombre({
  //   email: "lilo@gmail.com",
  //   nombre: "Pablo Murillo",
  // });
  // state.signIn(() => {
  //   state.askNewRoom(() => {
  //     state.accessRoom(() => {
  //       state.pushMessage("hola, estas mas cerca de lograrlo");
  //     });
  //   });
  // });
})();
