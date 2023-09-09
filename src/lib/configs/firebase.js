// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvggkDaAJprDb3Qh4mHxp0UJbLyVULOKo",
  authDomain: "lang-ef657.firebaseapp.com",
  projectId: "lang-ef657",
  storageBucket: "lang-ef657.appspot.com",
  messagingSenderId: "458932285423",
  appId: "1:458932285423:web:bb32f786d91154be6f901a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FlipCardCol = collection(db, "fiszki");

// export const CreateCards = async (id,name,author) => {
//   const docRef = collection(doc(db,'users',id,),"test") // Ustaw własny ID dokumentu
//   await setDoc(docRef, {
//     name: name,
//     author: author,
//     private: true,
//     id: id,
//     number:0,
//   });
//   console.log("Document written with ID: ", docRef.id);
// }
export async function CreateCards(userId,packageid,author,name,ispublic,lang) {
  const userDocRef = doc(db,"fiszki",packageid); // Referencja do dokumentu użytkownika

  // Tworzenie dokumentu w kolekcji "zestaw1"
  try {
    await setDoc(userDocRef, {
      author:author,
      authorID:userId,
      name:name,
      id:packageid,
      fiszki:[],
      public:ispublic,
      language:lang,
      number:0,

    }); // Przekazujemy pusty obiekt jako dokument
    console.log("Kolekcja 'zestaw1' została stworzona");
  } catch (error) {
    console.error("Błąd podczas tworzenia kolekcji 'zestaw1':", error);
  }
}
//utwórz
export const auth = getAuth(app);
