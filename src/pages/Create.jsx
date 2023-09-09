import React, { cloneElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  getDocs,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/configs";
import {NavBar} from "@/components/layout";
import { UserAuth } from "@/lib/contexts/AuthContext";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Create() {
  const [wordL, setWordL] = useState(""); //zmienne do przechwytywania slow z inputow
  const [wordP, setWordP] = useState("");

  const [catchWordL, setCatchWordL] = useState(""); //zmienne do przechwytywania slow pobranych z db
  const [catchWordP, setCatchWordP] = useState("");
  const [cards, setCards] = useState([]); // {number: 1, wordL: "wordL", wordP: "wordP"},{  number: 2, wordL: "wordL", wordP: "wordP" }
  //get number func from db
  const { user } = UserAuth();
  const [number , setNumber] = useState(1)
  
  const { id } = useParams();

  const [cardList, setCardList] = useState([{}]);

  const createCard = async (e,id, word1, word2,userId) => {

    const colRef = doc(db,"fiszki", id)
    await updateDoc(colRef,{fiszki: arrayUnion({word1:word1,word2:word2})
    })
    

    await updateDoc(doc(db,"fiszki",id),{number:number+1})
    setNumber(number+1)

    setWordL("")
    setWordP("")
  };

  async function updateNumber(userId,id)
  {
    const docRef = doc(db,"fiszki",id)
    await getDoc(docRef).then((doc)=>{
      if(doc.data() === undefined)
      {
        return
      }      
      setNumber(doc.data().number)
      
    })
  }
  async function fetchDocuments(userId, zestawIdToCheck) {
    try {
      if (id === undefined || userId === undefined) {
        return;
      }
      const data = await getDoc(
        doc(db, "fiszki", id)
      );
 
      setCardList(data.data().fiszki);
    } catch (err) {
      console.log(err);
    }
  }
  const deleteCard = async (e,id,wordF, wordS) => {
    const colRef = doc(db,"fiszki",id)
    await updateDoc(colRef,{fiszki: arrayRemove({word1:wordF,word2:wordS})
    })
    fetchDocuments(user.uid, id);
  }
  useEffect(() => {
    //update number value in local from firebase field
    updateNumber(user.uid,id)

    fetchDocuments(user.uid, id);
  }, [number]);

  console.log(cards);

  return (
    <div className="flex flex-col items-center min-h-screen gap-14 bg-purple-200">

      <div className="flex flex-col items-center justify-center gap-16 py-7">
        <div className="flex flex-col gap-10 justify-center items-center text-center">
          {/* <div className="w-auto  bg-purple-50 rounded-md flex flex-row ">
            <div className="w-[250px] h-[200px] border-r-2 border-dashed border-r-black text-center flex items-center justify-center">
              <h1 className="text-lg font-poppins">available</h1>
            </div>

            <div className="w-[250px] h-[200px] flex items-center justify-center text-center">
              <h1 className="text-lg font-poppins">dostępny</h1>
            </div>
          </div> */}
          {cardList.map((data) => (
            <div className="w-auto relative bg-purple-50 rounded-md flex flex-row " >
              <div className="w-[250px] h-[200px] border-r-2 border-dashed border-r-black text-center flex items-center justify-center">
                <h1 className="text-lg font-poppins">{data.word1}</h1>
              </div>

              <div className="w-[250px] h-[200px] flex items-center justify-center text-center">
                <h1 className="text-lg font-poppins">{data.word2}</h1>
              </div>
              <div className="absolute top-0 right-0 mt-3 mr-3"><FaRegTrashAlt className="text-[#ed3737] w-5 h-5 cursor-pointer hover:text-[#a03030] hover:scale-[1.1] transition-all" onClick={(e)=>{deleteCard(e,id,data.word1,data.word2)}}/></div>
            </div>
          ))}


        </div>
        <div className="flex justify-center items-center text-center flex-col">
          <div className="flex flex-row justify-center items-center text-center">
            <div className="w-auto  bg-purple-50 rounded-t-md flex text-center justify-center items-center flex-row ">
              <div className="w-[250px] h-[200px] border-r-2 border-dashed border-r-black text-center flex items-center  justify-center">
                <input
                  type="text"
                  className=" w-1/2 mt-2 px-3 py-2 text-gray-950 font-poppins bg-transparent outline-none border  bg-purple-300  shadow-sm rounded-lg"
                  value={wordL}
                  onChange={(e) => {
                    setWordL(e.target.value);
                  }}
                />
              </div>

              <div className="w-[250px] h-[200px] flex items-center justify-center text-center">
                <input
                  type="text"
                  className=" w-1/2 mt-2 px-3 py-2 text-gray-950 font-poppins bg-transparent outline-none border  bg-purple-300 shadow-sm rounded-lg"
                  value={wordP}
                  onChange={(e) => {
                    setWordP(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <button
            className=" px-5 py-3 w-full  text-white duration-150 bg-indigo-600 rounded-b-md hover:bg-indigo-700 active:shadow-lg"
            onClick={(e) => {
              createCard(e,id, wordL, wordP,user.uid);
              
            }}
          >
            Stwórz
          </button>
        </div>
      </div>
    </div>
  );
}
