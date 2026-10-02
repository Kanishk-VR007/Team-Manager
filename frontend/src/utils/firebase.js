import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// TODO: Replace these with your actual Firebase project configuration
// You can get these from the Firebase Console (console.firebase.google.com)
const firebaseConfig = {
  apiKey: "AIzaSyDFOi27N6FQesjeU7deyk1HedjjePpEIms",
  authDomain: "task-flow-296ca.firebaseapp.com",
  projectId: "task-flow-296ca",
  storageBucket: "task-flow-296ca.firebasestorage.app",
  messagingSenderId: "506626656511",
  appId: "1:506626656511:web:72cc4b0437eea3760c64ca",
  measurementId: "G-PD5876XCBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider };
