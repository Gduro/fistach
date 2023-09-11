import React, { useState } from "react";
const FlipCard = ({word1, word2}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardStyles = {
    front: "absolute w-full h-full bg-purple-50 w-full h-full rounded-lg flex items-center justify-center text-center ",
    frontClose: "scale-0 [backface-visibility:hidden]",
    back: "rotateY [backface-visibility:hidden] absolute bg-purple-50 w-full h-full rounded-lg flex items-center justify-center text-center",
  };
  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
    console.log(isFlipped);
  };

  return (
    <div
      className={`relative w-full h-full bg-white border border-gray-300 rounded-lg p-4 transition-all duration-500  flex items-center 
          flex-col justify-center text-center [transform-style:preserve-3d] ${
            isFlipped ? "rotateY" : ""
          }`}
      onClick={toggleFlip}
    >

      {/* front */}
      <div
        className={` ${cardStyles.front}`}
      >
        <div className="select-none"><h1 className="text-2xl font-poppins select-none"> {word1}</h1></div>      </div>


      {/* back */}

      <div className={`${cardStyles.back}`}>
        <div className="select-none"><h1 className="text-2xl font-poppins select-none"> {word2}</h1></div>
      </div>
    </div>
  );
};

export default FlipCard;
{
  /* <div
className={`absolute inset-0 transform transition-transform ${
  isFlipped ? "rotateY" : ""
}`}
>
<div className="flex items-center justify-center h-full">
  <div onClick={toggleFlip} className="cursor-pointer">
    {isFlipped ? <BackCard/> : <FrontCard/>}
  </div>
</div>
</div> */
}
