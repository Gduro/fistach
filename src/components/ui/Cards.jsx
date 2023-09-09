import React from 'react'
//styles for card (while flipping)
const cardStyles = {
    frontOpen:"scale-1",
    frontClose:"scale-0 [backface-visibility:hidden]",
    backOpen:"scale-1",
    backClose:"scale-0 [backface-visibility:hidden]"
  }

// export const FrontCard = (flip) => {
//   console.log("front: ",flip)
//   return (

//   )
// }

// export const BackCard = (flip)=>{
//   console.log("baack: ",flip)

//     return (
//         <div className={` ${flip ? cardStyles.backOpen : cardStyles.backClose}`} >
//           <div className="text-2xl ">Tylna strona</div>
//         </div>
//       )
// }