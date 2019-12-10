import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC81Y1HDcZ3WnXTOz4ANe5M4tbol-x5Mo",
  authDomain: "quacomment.firebaseapp.com",
  databaseURL: "https://quacomment.firebaseio.com",
  projectId: "quacomment",
  storageBucket: "quacomment.appspot.com",
  messagingSenderId: "230133510229",
  appId: "1:230133510229:web:046c4eea4a4f28cdeb64dc"
}

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
export const firebaseAuth = firebaseApp.auth()

let firebaseDbb = firebaseApp.database()
export const firebaseDb = firebaseDbb

export const clientId = '431809704940-hvo2qlbucgnluias1i3kaasaap3fas2h.apps.googleusercontent.com'
