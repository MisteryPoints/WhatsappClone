import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDge89m24A21Bj5LdW5Bo2vtxS2TckZBvM",
    authDomain: "whatsappclonedevpoint.firebaseapp.com",
    projectId: "whatsappclonedevpoint",
    storageBucket: "whatsappclonedevpoint.appspot.com",
    messagingSenderId: "8563559018",
    appId: "1:8563559018:web:74e84b783c7910bb941813",
    measurementId: "G-C012GKH7VP"
}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { db, auth, provider }
