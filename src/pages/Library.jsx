import React, { useState } from "react";
import { NavBar } from "../components/layout/";
import { CreateCards, FlipCardCol, db } from "../lib/configs";
import { collection, setDoc } from "firebase/firestore";
import English from "../../public/img/english.png";
import Deutsch from "../../public/img/deutsch.png";
import { useNavigate } from "react-router-dom";
export default function Library() {
  const [vis, setVis] = React.useState(false);
  const navigate= useNavigate()
  const changeState = async () => {
    return await setVis(!vis);
  };
  return (
    <section className="w-full flex items-center justify-center text-center flex-col h-screen bg-purple-200 ">
      <div className="w-auto h-auto bg-purple-50  rounded-3xl flex items-center justify-center flex-col gap-10 p-10">
        <h1 className="font-poppins text-2xl text-[#090909] font-[600]">Wybierz język</h1>
        <div className="flex flex-row gap-28">
          <div className="w-auto h-auto border-[#00000069] border-solid border-[1px] p-8 rounded-[15px] gap-8 flex flex-col cursor-pointer" onClick={()=>{
            navigate("/EnglishLibrary")
          }}>
            <img src={English} alt=""  className="w-[189px] h-[102px] rounded-[10px]"/>
            <h1 className="font-poppins text-base text-[#282828] font-[600]">Angielski</h1>
          </div>
          <div className="w-auto h-auto border-[#00000069] border-solid border-[1px] p-8 rounded-[15px] gap-8 flex flex-col cursor-pointer" onClick={()=>{
            navigate("/DeutchLibrary")
          }}>
            <img src={Deutsch} alt=""  className="w-[189px] h-[102px] rounded-[10px]"/>
            <h1 className="font-poppins text-base text-[#282828] font-[600]">Niemiecki</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

// <div className="col-span-1 w-[150px] h-auto bg-purple-200  rounded-md py-4 px-4 flex flex-col items-center justify-center text-center ">
//     <h1 className="text-purple-950 font-poppins font-bold">
//       Angielski
//     </h1>
//     <p className="text-purple-500 font-poppins font-bold">
//       Home & City
//     </p>
//     <p className=" font-poppins text-sm text-purple-400">Autor: Gdurro</p>
//     <img src={home} alt="" className="rounded-full w-20 h-20 mt-2" />
//     <button className="mt-7 px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
//       Otwórz
//     </button>
//   </div>
