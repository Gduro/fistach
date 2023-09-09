import React from 'react'
import { FlipCard } from '../components/layout'
import {CardDeck} from '../components/layout'
const OpenCard = () => {
  return (
    <section className=" flex items-center justify-center text-center flex-col h-screen bg-purple-200 overflow-x-hidden ">
        <CardDeck></CardDeck>
    </section>
  )
}

export default OpenCard
