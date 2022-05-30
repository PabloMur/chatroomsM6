import firebase from "firebase";

const firebaseConfig = {
  apiKey: "3Kqkb9z5Icx2cQvwBSUcnv5NgJw6uemItncCEDaI",
  authDomain: "mod6v4.firebaseapp.com",
  databaseURL: "https://mod6v4-default-rtdb.firebaseio.com",
  projectId: "mod6v4",
};

const app = firebase.initializeApp(firebaseConfig);
const rtdb = app.database();

export { rtdb };
