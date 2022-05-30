import * as admin from "firebase-admin"
import * as serviceAccount from "./key.json"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://mod6v4-default-rtdb.firebaseio.com" as any
});

const baseDatos = admin.firestore()
const rtdb = admin.database() as any

export {baseDatos, rtdb}

// hacemos referencia a una colleccion en particular --- const usersCollection = baseDatos.collection('users')
// const usuarioParticular = usersCollection.doc('id del user')
// con update actualizamos un campo
// con set pisamos la data de un doc
// con create creamos un doc
// con delete borramos un doc

//todas las transacciones nos devulven promesas
// los snapshots traen docs. y los docs traen data()
// se puede usar .exists para corroborar la existencia de un doc
