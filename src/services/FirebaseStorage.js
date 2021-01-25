import firebase from 'firebase/app'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDWqw1KAS0d3S3AI4Cc0r906d6OUg8rJd4",
  authDomain: "jag-storage-codesblack.firebaseapp.com",
  projectId: "jag-storage-codesblack",
  storageBucket: "jag-storage-codesblack.appspot.com",
  messagingSenderId: "655491499096",
  appId: "1:655491499096:web:77b3e54b5b5ce50db8b62d",
  measurementId: "G-F2WK9KE527"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()

export { storage, firebase as default }
