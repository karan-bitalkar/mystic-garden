import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM_3PBQAGuaJ5wgKQKbo_4zGrIBVRGFx8",
  authDomain: "homeserve-gcp-project.firebaseapp.com",
  projectId: "homeserve-gcp-project",
  storageBucket: "homeserve-gcp-project.appspot.com",
  messagingSenderId: "845953529834",
  appId: "1:845953529834:web:XXXXX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
