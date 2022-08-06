import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyA9N_O7dEmw21DO6akO6fkZbkDUXAMuxXQ',
  authDomain: 'family-tree-c7665.firebaseapp.com',
  projectId: 'family-tree-c7665',
  storageBucket: 'family-tree-c7665.appspot.com',
  messagingSenderId: '345657379922',
  appId: '1:345657379922:web:2eaf2dd353c7b273d9238b',
  measurementId: 'G-7PTFBFFGVZ',
})

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
