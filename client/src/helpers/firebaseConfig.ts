import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAXLr1H_ZH0O0aJjMYYy4_-pxikm-yk2gs',
  authDomain: 'g-lancer-f20ff.firebaseapp.com',
  projectId: 'g-lancer-f20ff',
  storageBucket: 'g-lancer-f20ff.appspot.com',
  messagingSenderId: '62493190521',
  appId: '1:62493190521:web:2ab39cb50da572da4e67a8',
  measurementId: 'G-SC019PBMBQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
