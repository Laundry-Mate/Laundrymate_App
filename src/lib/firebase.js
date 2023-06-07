import * as firebase from 'firebase/app';

const firebaseConfig = {
  // databaseURL: "https://idle-page-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // storageBucket: "gs://idle-page.appspot.com/",
  apiKey: "AIzaSyDg1Cq1jOs1GjvBIry4qYgeRpjkGQa1BlE",
  authDomain: "capstonelaundry-d8cc7.firebaseapp.com",
  projectId: "capstonelaundry-d8cc7",
  storageBucket: "capstonelaundry-d8cc7.appspot.com",
  messagingSenderId: "977972708280",
  appId: "1:977972708280:web:43a370fb3bd14b6bc4854d",
  measurementId: "G-KKTBZHXNLD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;

// const anaytics = getAnalytics(app);