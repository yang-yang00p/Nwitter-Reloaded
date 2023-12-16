import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCu5z_YiBdEYNPkCAvEAZl8dV4NHiMb3Ho",
  authDomain: "nwitter-reloaded-160b0.firebaseapp.com",
  projectId: "nwitter-reloaded-160b0",
  storageBucket: "nwitter-reloaded-160b0.appspot.com",
  messagingSenderId: "477691533373",
  appId: "1:477691533373:web:0dc458974887d2ddbe7254"
};

const app = initializeApp(firebaseConfig); //이러한 config 옵션으로 app생성 후

export const auth = getAuth(app)