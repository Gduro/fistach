import React, { useEffect, useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import FlipCard from "./FlipCard";
import { db } from "../../lib/configs";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {ModalFinish} from "../../components/layout";


const CardDeck = () => {
  const [cardList, setCardList] = useState([]);
  const { id } = useParams();
  const [gone] = useState(() => new Set());
  const [isopen, SetIsOpen] = useState(false);
  // get cards from firebase
  const getSet = async (id) => {
    if (id === undefined) {
      return;
    }
    const data = await getDoc(doc(db, "fiszki", id));

    setCardList(data.data().fiszki);
  };
  useEffect(() => {
    getSet(id);
  }, [id]);

  const handleModal = () => {
    SetIsOpen(!isopen);
    console.log("test")
    if(isopen)
    {
    setTimeout(() => {
      api.start((i) => to(i));
    }, 600);        
  }
  };
  const to = (i) => ({
    x: 0,
    y: i * -2,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
  });

  const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

  const trans = (r, s) =>
    ` rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

  const [props, api] = useSprings(cardList.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      console.log(dir);
      if (!down && trigger) gone.add(index);
      api.start((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        console.log("isGone: ", gone);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        console.log("x ", x);
        console.log("rot ", rot);

        return {
          x,
          rot,
          scale,
          isGone,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cardList.length)
      {
        handleModal();
        gone.clear();
        console.log("isopen", isopen)

      }


        // setTimeout(() => {
        //   gone.clear();


        //   api.start((i) => to(i));
        // }, 600);
    }
  );

  return (
    <>
      {props.map(({ x, y, rot, scale}, i) => (
        <animated.div
          className="absolute w-[300px] h-[500px] will-change-transform flex items-center justify-center touch-none"
          key={i}
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            className={`w-full  h-full  will-change-transform   touch-none text-center`}
            style={{
              transform: interpolate([rot, scale], trans),
            }}
          >
            {/* check if that was last card and display congratulations */}
     
            <FlipCard word1={cardList[i].word1} word2={cardList[i].word2} />
          </animated.div>
        </animated.div>
      ))}
      {isopen? <ModalFinish  handleModal={handleModal}/> : ""}
    </>
  );
};

export default CardDeck;
