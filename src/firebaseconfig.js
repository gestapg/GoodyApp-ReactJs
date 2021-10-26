import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXSHQHfzLhH9bg4SIpyBQCgJVn-rs33aM',
  authDomain: 'goody-app-50fd8.firebaseapp.com',
  projectId: 'goody-app-50fd8',
  storageBucket: 'goody-app-50fd8.appspot.com',
  messagingSenderId: '510777295116',
  appId: '1:510777295116:web:903a52a8d688d70d034929',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };
