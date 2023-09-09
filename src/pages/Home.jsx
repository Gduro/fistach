import React from 'react'
import Peanut from '../../public/img/peanut.svg'
const home = () => {
  return (
    <section className='w-full flex items-center justify-center text-center flex-col h-screen bg-purple-200 '>
        <img src={Peanut} alt=""  className='h-[450px]'/>
    </section>
  )
}

export default home