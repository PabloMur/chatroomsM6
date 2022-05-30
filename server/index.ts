import * as express from "express"
import { baseDatos, rtdb } from "./db"
import { nanoid } from "nanoid"
import * as cors from "cors"

const port = 3003
const app = express()
const json = express.json()

app.use(cors())
app.use(json)

const usersCollection = baseDatos.collection("users");
const roomsCollection = baseDatos.collection("rooms");

app.post("/signup", async (req, res) => {
  // Este endopoint nos habilita un nuevo usuario en firestore. Y nos retorna si id
  const { email, nombre } = req.body;

  const usColl = await usersCollection.where("email", "==", email).get();

  if (usColl.empty) {
    const newUserRef = await usersCollection.add({
      email,
      nombre,
    });
    res.json({
      id: newUserRef.id,
      new: true,
    });
  } else {
    res.status(400).json({
      message: "user already exists.",
    });
  }
});

app.post("/auth", async (req, res) => {
  //este nos da nuestro id de firestore siempre y cuando alguno de los usuario tenga nuestro email

  const { email } = req.body;

  const searchRes = await usersCollection.where("email", "==", email).get();

  if (searchRes.empty) {
    res.status(404).json({
      message: "user not found.",
    });
  } else {
    res.json({
      id: searchRes.docs[0].id,
    });
  }
});

app.post("/rooms", async (req, res) => {
  const { userId } = req.body;

  const document = await usersCollection.doc(userId).get();

  if (document.exists) {
    const roomRef = rtdb.ref("rooms/" + nanoid());

    await roomRef.set({
      messages: [],
      owner: userId,
    });

    const roomLongId = roomRef.key;
    const roomId = 1000 + Math.floor(Math.random() * 999);

    await roomsCollection.doc(roomId.toString()).set({
      rtdb: roomLongId,
    });

    res.json({
      id: roomId,
    });
  } else {
    res.status(401).json({
      message: "no existis",
    });
  }
});

app.get("/rooms/:roomId", async (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;

  const document = await usersCollection.doc(userId.toString()).get();

  if (document.exists) {
    const snap = await roomsCollection.doc(roomId.toString()).get();
    const data = snap.data();
    res.json(data);
  } else {
    res.status(401).json({
      message: "no existis",
    });
  }
});

app.post("/message", async (req, res) => {
  const { room } = req.query;

  const chatroomRef = rtdb.ref("/rooms/" + room + "/messages");
  chatroomRef.push(req.body, () => {
    res.json("ok");
  });
});

app.listen(port,()=>{
    console.log(`Iniciado en el puerto: ${port}`)
})