import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyCJD2UCcDwhrjRIdVn7EVOwvvtE7pUGFvo',
  authDomain: 'hogwarts-ff7e7.firebaseapp.com',
  databaseURL: 'https://hogwarts-ff7e7.firebaseio.com',
  projectId: 'hogwarts-ff7e7',
  storageBucket: 'hogwarts-ff7e7.appspot.com',
  messagingSenderId: '373794095705',
  appId: '1:373794095705:web:c75d7c07738ef26fbd6748',
  measurementId: 'G-ZCHLLWEW7V'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.default.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')
const messageCollection = db.collection('message')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
  messageCollection
}
