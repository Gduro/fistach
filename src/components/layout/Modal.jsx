import React, { useState } from "react";
import { UserAuth } from "@/lib/contexts/AuthContext";
import { CreateCards } from "@/lib/configs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
export default function Modal({handleModal,open,SetOpen}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [check,SetCheck] = useState("")
  const [share, SetShare] = useState(false)
  const { user } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();
    CreateCards(
      user.uid,
      id,
      user.displayName ? user.displayName : user.email,
      name,
      share,
      check
    );
    navigate(`/create/${id}`);
    console.log("test");
  };
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={handleModal}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8 text-center ">
          <div className="relative w-full max-w-sm  p-8 mx-auto bg-white rounded-md shadow-lg">
            <h1 className="  text-[30px] text-black font-poppins font-bold mb-2">
              Stwórz Zestaw
            </h1>
            <form
              className="space-y-5 flex flex-col text-center items-center justify-center gap-2"
              onSubmit={handleSubmit}
            >
              <div className="">
                <input
                  type="text"

                  placeholder="Nazwa"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className=" w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="">
                <input
                  type="text"
                  required
                  placeholder="Opis"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className=" w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex justify-around w-full items-center text-center">
                {/* english */}
                <div className="flex flex-row gap-4 items-center text-center justify-center h-auto">
                  <label className="text-sm font-poppins ">English</label>
                  <input
                    type="checkbox"
                    
                    checked={check === "English"}
                    onChange={() => 
                      SetCheck("English")}
           
                    className=" w-4 h-4 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                </div>
                <div className="flex flex-row gap-4 items-center text-center justify-center h-auto">
                  <label className="text-sm font-poppins ">Deutch</label>

                  <input
                    type="checkbox"
                    
                    checked={check === "Deutch"}
                    onChange={() => SetCheck("Deutch")}
           
                    className=" w-4 h-4 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"                  />
                </div>

              </div>
              <div className="flex flex-row gap-4 items-center text-center justify-center h-auto">
                  <label className="text-sm font-poppins ">Publiczne</label>

                  <input
                    type="checkbox"
                    
                    onChange={() => SetShare(!share)}
           
                    className=" w-4 h-4 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"                  />
                </div>
              <button
                type="submit"
                className="mt-7 px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg"
              >
                Stwórz
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
