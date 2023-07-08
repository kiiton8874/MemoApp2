import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

import { firebaseConfig } from "../env";

const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
const auth =getAuth(app)
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { auth, db }