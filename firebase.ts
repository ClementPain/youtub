// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMXNtvPxMJc57ozGCLuC0lM5alIIwUSio",

  authDomain: "youtub-ae7a8.firebaseapp.com",

  projectId: "youtub-ae7a8",

  storageBucket: "youtub-ae7a8.appspot.com",

  messagingSenderId: "274367348048",

  appId: "1:274367348048:web:71e721118b95f94afac055"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }