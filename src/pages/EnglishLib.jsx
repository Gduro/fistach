import React, { useEffect } from "react";
import english from "../../public/img/english.png";
import nophoto from "../../public/img/nophoto.png";
import look from "../../public/img/look.svg";
import { Modal } from "@/components/layout/";
import {
  getDocs,
  query,
  collection,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/configs";
import { UserAuth } from "@/lib/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const EnglishLib = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { user } = UserAuth();
  const [cardsList, setCardList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate()
  const getSet = () => {
    if (user.uid !== undefined) {
      const q = query(
        collection(db, "fiszki"),
        where("public","==",true),
        where("language","==","English")
      );
      onSnapshot(q, (snapshot) => {
        const newCardsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          author: doc.data().author,
          name: doc.data().name,
          number: doc.data().number,

        }));
        setCardList(newCardsList);
      });
    }
  };
  const handleCard = (id) =>{
    navigate("/open/"+id)
  }
  useEffect(() => {
    if (user.uid !== undefined) {
      getSet();
    }
  }, [user.uid]);

  console.log(cardsList);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-4 bg-purple-200 ">
      <div className="w-auto h-[700px] bg-purple-50  rounded-3xl flex items-center justify-center flex-col gap-10 p-10 shadow-sm ">
        <h1 className="font-poppins text-2xl text-[#090909] font-[600]">
          Angielski
        </h1>
        {/* create button */}
        <div className="flex flex-row w-full h-auto items-center justify-center text-center ">
          <div className="border-[1px] border-solid border-[#D6D6D6] bg-[#FFF] rounded-[10px] w-[300px] h-[51px]   flex items-center text-center justify-between py-[9px] px-[23px]">
            <input
              type="text"
              className="rounded-[10px] text-base border-none outline-none "
              placeholder="Szukaj"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }
              }
            />
            <img src={look} alt="" className="w-[27px] h-[27px]" />
          </div>

        </div>
        {/* list of sets */}
        <div className="flex flex-col gap-8 h-[600px] overflow-y-auto">
          {cardsList.filter((data)=>{
            if(searchTerm == "")
            {
              return data
            }else if(data.name.toLowerCase().includes(searchTerm.toLowerCase())){
              return data
            }

          }).map((data) => (
            <div
              className="flex flex-row items-center justify-center w-auto h-auto border-[#00000069] border-solid border-[1px] p-6 rounded-[15px] gap-8 shadow-sm cursor-pointer"
              key={data.id}
              onClick={()=>handleCard(data.id)}
            >
              <img
                src={nophoto}
                alt=""
                className="rounded-[10px] w-[189px] h-[102px]"
              />

              <div className="flex flex-col items-center align-text-top gap-8 justify-center w-[400px]">
                <h1 className="font-poppins text-xl text-[#1b1b1b] font-[600] ">
                  {data.name}
                </h1>

                <div className="flex flex-col gap-4 w-full   ">
                  <h2 className="font-poppins text-base    text-[#1b1b1b] font-[600] ">
                    Opis: Brak{" "}
                  </h2>
                  <div className="flex flex-row gap-[60px] justify-between">
                    <p className="font-poppins text-sm    text-[#1b1b1b] font-[600] ">
                      {data.number} fiszek
                    </p>
                    <p className="font-poppins text-sm    text-[#1b1b1b] font-[600] ">
                      Autor: {data.author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnglishLib;
