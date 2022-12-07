
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkx6c6szeZqxDCRg_CCWOv0rXN6Vqd3tc",
    authDomain: "miflor.firebaseapp.com",
    projectId: "miflor",
    storageBucket: "miflor.appspot.com",
    messagingSenderId: "986149334925",
    appId: "1:986149334925:web:fb805ea0750ae83602d7c4",
    measurementId: "G-TD1JDP6W40"
};


const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;