import React, { useEffect, useState } from "react";
import { UserAuth } from "@/lib/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {NavBar} from "@/components/layout";
import { db } from "@/lib/configs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
export default function Account() {
  const { user, logout } = UserAuth();
  
  const navigate = useNavigate();

  // async function createOrUpdateDocumentForUser(userId, data) {
  //   if (data === undefined || userId === undefined) {
  //     return
  //   }
  //   const userDocRef = doc(db, "users", userId); // 'users' to nazwa kolekcji
  //   const userDocSnapshot = await getDoc(userDocRef);

  //   if (userDocSnapshot.exists()) {
  //     // Dokument istnieje, więc aktualizujemy go
  //     console.log(`dokument o id ${userId} juz istnieje`);
  //   } else {
  //     // Dokument nie istnieje, więc tworzymy go
  //     await setDoc(userDocRef, data);
  //     console.log(`Stworzono dokument dla użytkownika o ID: ${userId}`);

  //   } 
  // }
  // useEffect(() => {
  //   if (user) {
  //     createOrUpdateDocumentForUser(user.uid, { id: user.uid });
  //   }
  // }, [user]);


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center text-center flex-col h-screen bg-purple-200">
      <div className="flex items-center justify-center text-center">
        <div className="w-auto h-auto flex items-center flex-col bg-purple-50 shadow p-4 py-10     sm:p-6 sm:rounded-lg">
          <h1 className="text-2xl font-bold py-4">Twoje Konto</h1>
          <p className="mt-3 text-base">Nazwa: {user && user.displayName}</p>
          <p className="mt-3 text-base">Email: {user && user.email}</p>

          <button
            className="mt-7 px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg text-sm"
            onClick={handleLogout}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </div>
  );
}
