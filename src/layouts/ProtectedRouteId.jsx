import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { auth, db } from "../lib/configs";
  import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Create , Home} from "../pages";
import {NoSet} from "../pages/";
import {Loading} from "../components/layout";
import { UserAuth } from "../lib/contexts/AuthContext";
export default function ProtectedRouteId({ children }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [exists, setExists] = useState(false);
  const { user } = UserAuth();

  useEffect(() => { 

    if (user.uid ===undefined || id ===undefined) {
      return;
    }
    
    const infoDocRef = doc(db, "fiszki", id);


    const checkIfZestawExists = async () => {
      try {
        const infoDocSnapshot = await getDoc(infoDocRef);

        if (infoDocSnapshot.exists() )  {
          setExists(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Błąd podczas sprawdzania istnienia zestawu:", error);
        setLoading(false);
      }
    };

    checkIfZestawExists();
  }, [id, user]);
  if (loading) {
    return <Loading />;
  } else if (exists) {
    return <Outlet/>;
  } else {
    return <NoSet />;
  }
}
