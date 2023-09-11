import React, { useEffect } from "react";
import english from "../../public/img/english.png";
import nophoto from "../../public/img/nophoto.png";
import look from "../../public/img/look.svg";
import { Modal } from "../components/layout/";
import {
  getDocs,
  query,
  collection,
  doc,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/configs";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../lib/contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const MySets = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { user } = UserAuth();
  const [cardsList, setCardList] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleModal = () => {
    return setIsModalOpen(!isModalOpen);
  };
  //function to get docs only from current user
  const getSet = () => {
    if (user.uid !== undefined) {
      const q = query(
        collection(db, "fiszki"),
        where("authorID", "==", user.uid)
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
  const deleteCard = async (e, id) => {
    e.stopPropagation();
    await deleteDoc(doc(db, "fiszki", id));
  };
  const handleCard = (id) => {
    navigate("/open/" + id);
  };
  const handleEdit = (e, id) => {
    navigate("/create/" + id);
  };
  useEffect(() => {
    if (user.uid !== undefined) {
      getSet();
    }
  }, [user.uid]);

  console.log(cardsList);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center px-4 bg-purple-200 overflow-x-hidden  overflow-y-auto">
      <div className="w-full h-[700px] bg-purple-50  rounded-3xl flex items-center justify-center flex-col gap-10 p-10 shadow-sm  m-10 sm:w-full sm:h-full md:w-auto md:h-[700px] lg:w-auto">
        <h1 className="font-poppins text-2xl text-[#090909] font-[600] text-center">
          Moje Zestawy
        </h1>
        {/* create button */}
        <div className="flex flex-row w-full h-auto items-center justify-between text-center  gap-4 ">
          <div className="border-[1px] border-solid border-[#D6D6D6] bg-[#FFF] rounded-[10px] w-[300px] h-[51px]   flex items-center text-center justify-between py-[9px] px-[23px] flex-row ">
            <input
              type="text"
              className="rounded-[10px] text-base border-none outline-none "
              placeholder="Szukaj"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <img src={look} alt="" className="w-[27px] h-[27px]" />
          </div>
          <button
            className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg text-sm"
            onClick={handleModal}
          >
            Stwórz
          </button>
        </div>
        {/* list of sets */}
        <div className="flex flex-col gap-8 h-[600px] overflow-y-auto">
          {cardsList
            .filter((data) => {
              if (searchTerm == "") {
                return data;
              } else if (
                data.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data) => (
              <div
                className="flex flex-row items-center justify-center h-auto border-[#00000069] border-solid border-[1px] p-6 rounded-[15px] gap-8 shadow-sm relative  sm:w-[500px] md:w[100px] lg:w-auto"
                key={data.id}
              >
                <img
                  src={nophoto}
                  alt=""
                  className="rounded-[10px] w-[189px] h-[102px]"
                />

                <div className="flex flex-col items-center align-text-top gap-8 justify-center w-[400px]">
                  <div className="flex w-full flex-row">
                  <h1 className="font-poppins text-xl text-[#1b1b1b] font-[600] ">
                    {data.name}
                  </h1>
                    <div
                      className=" absolute top-0 right-0 mt-7 mr-6 ml-4
                flex flex-row items-center  justify-around h-auto w-[100px]"
                    >
                      <FaEdit
                        className="text-purple-500  w-7 h-7 cursor-pointer hover:text-purple-700 hover:scale-[1.1] transition-all "
                        onClick={(e) => {
                          handleEdit(e, data.id);
                        }}
                      />
                      <FaRegTrashAlt
                        className="text-[#ed3737] w-7 h-7 cursor-pointer hover:text-[#a03030] hover:scale-[1.1] transition-all"
                        onClick={(e) => {
                          deleteCard(e, data.id);
                        }}
                      />
                    </div>
                  </div>
      

                  <div className="flex flex-col gap-4 w-full   ">
                    <h2 className="font-poppins text-base    text-[#1b1b1b] font-[600] ">
                      Opis: Brak{" "}
                    </h2>
                    <div className="flex flex-row gap-[60px] justify-between items-center text-center">
                      <p className="font-poppins text-sm    text-[#1b1b1b] font-[600] ">
                        {data.number} fiszek
                      </p>
                      <button
                        className="px-5 py-3 text-white duration-150  w-[100px] bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg text-sm"
                        onClick={() => handleCard(data.id)}
                      >
                        Otwórz
                      </button>
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
      {/* modal */}
      {isModalOpen ? (
        <Modal
          open={isModalOpen}
          handleModal={handleModal}
          setOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default MySets;
