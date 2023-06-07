import firebase from '$lib/firebase.js';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


export const auth = getAuth(firebase);
export const provider = new GoogleAuthProvider();