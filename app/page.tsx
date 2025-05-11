'use client';

import Image from "next/image";
import ipllogo from "./assets/logo.jpg";

import { useChat } from "ai/react";


import { Message } from "ai";

const Home = () => {

  const noMessages = true
  return (
    <main>
      <Image src={ipllogo} alt="IPL Logo" width={300}/>
      <section>
        {noMessages ? ( 
        )  : (
          
        )}
      </section>
    </main>
  )
}
