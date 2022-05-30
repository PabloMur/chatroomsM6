import { rtdb } from "./rtdb";
import { map } from "lodash";
import { url } from "inspector";

const API_BASE_URL = "http://localhost:3003";

const state = {
  data: {
    email: "",
    nombre: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    registrated: "",
    messages: [],
  },
  listeners: [],

  init() {
    // const chatRef = rtdb.ref("/chatrooms/general");
    // const currentState = this.getState();
    // chatRef.on("value", (snapshot) => {
    //   const messagesFromServer = snapshot.val();
    //   const messagesList = map(messagesFromServer.messages);
    //   currentState.messages = messagesList;
    //   this.setState(currentState);
    // });

    const lastState = localStorage.getItem("state");
  },

  listenRoom() {
    const currentState = this.getState();
    const rtdbRoomId = currentState.rtdbRoomId;

    const chatRef = rtdb.ref("/rooms/" + rtdbRoomId);
    chatRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      const messagesList = map(messagesFromServer.messages);
      currentState.messages = messagesList;
      this.setState(currentState);
    });
  },

  getState() {
    return this.data;
  },

  setEmailAndNombre(params: { email: string; nombre: string }) {
    const currentState = this.getState();
    currentState.nombre = params.nombre;
    currentState.email = params.email;
    this.setState(currentState);
  },

  async pushMessage(message: string) {
    const currentState = this.getState();
    const urlForFetch =
      API_BASE_URL + "/message/?room=" + currentState.rtdbRoomId;
    const objForFetch = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: currentState.nombre,
        message: message,
      }),
    };

    fetch(urlForFetch, objForFetch);
  },

  async createUser(cb?) {
    const cs = this.getState();
    const nombre = cs.nombre;
    const email = cs.email;
    const urlForFetch = API_BASE_URL + "/signup";

    if (cs.email) {
      const fetchedData = await fetch(urlForFetch, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email, nombre: nombre }),
      });
      cs.registrated = true;

      console.log("Usuario creado");

      this.setState(cs);
      if (cb) cb();
    } else {
      console.error("no hay un mail en el state");
    }
  },

  async signIn(cb) {
    const cs = this.getState();
    const urlForFetch = API_BASE_URL + "/auth";

    if (cs.email) {
      const fetchedData = await fetch(urlForFetch, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: cs.email }),
      });
      const response = await fetchedData.json();
      cs.userId = response.id;
      this.setState(cs);
      cb();
    } else {
      console.error("no hay un mail en el state");
    }
  },

  async askNewRoom(cb?) {
    const currentState = state.getState();
    const urlForFetch = API_BASE_URL + "/rooms";
    const objForFetch = {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: currentState.userId }),
    };

    if (currentState.userId) {
      const fetchedData = await fetch(urlForFetch, objForFetch);
      const response = await fetchedData.json();
      currentState.roomId = response.id;
      this.setState(currentState);
      if (cb) {
        cb();
      }
    } else {
      console.error("No hay user id.");
    }
  },

  async accessRoom(cb?) {
    const currentState = state.getState();
    const roomId = currentState.roomId;
    const userId = currentState.userId;
    const urlForFetch = API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId;

    if (userId) {
      const fetchedData = await fetch(urlForFetch);
      const response = await fetchedData.json();
      currentState.rtdbRoomId = response.rtdb;
      this.setState(currentState);
      this.listenRoom();
      if (cb) {
        cb();
      }
    } else {
      console.error("No hay user id.");
    }
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
    console.log("soy el state, he cambiado", this.data);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
