import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4X0ctFHGbd6jp_UBXaQ9Zma0_J32Ehyk",
    authDomain: "webshop-8bea5.firebaseapp.com",
    projectId: "webshop-8bea5",
    storageBucket: "webshop-8bea5.appspot.com",
    messagingSenderId: "687547482247",
    appId: "1:687547482247:web:754e3f6a06cbe440217822",
    measurementId: "G-ENSYXD7P63"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

