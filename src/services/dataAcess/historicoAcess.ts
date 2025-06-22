import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";

const docRef = doc(db, "historico_teste");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}