import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";

import ConpecLogo from "@/assets/images/ConpecLogo.svg"
import ArrowLeft from "@/assets/images/ArrowLeftIcon.png"

export default function Login(){


    return(

        <main className="min-h-screen w-screen bg-[#FFF4EF]">


            <header className="h-9 flex items-center justify-between top-5 p-9 relative">
                
                <Image src={ArrowLeft} alt="arrow" className="text-[#FF3D00] h-[40px] w-auto z-10 mb-5"/>
                {/* Mesma seta do Figma, porem ta cortando um pouco a ponta e não sei o pq, resolver depois ou usar o React Icons */}

                <div className="font-pixelify text-[55px] text-[#FF3D00] left-32 absolute font-bold">
                    CONPECOME
                </div>
                
                <Image src={ConpecLogo} alt="logo" className="w-20"></Image>

            </header>

            <div className="flex justify-center items-center relative mt-20 mb-20">
                
                <h1 className="font-pixelify text-[#FF3D00] text-[40px] font-bold ">
                    Login
                </h1>
            </div>
            
            
            <div className="flex justify-center items-start h-full">

                <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
                    <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-bold ml-5">Nome</label>
                        <input type="text" placeholder="Inserir Nome" className="placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-bold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-bold ml-5">Email</label>
                        <input type="text" placeholder="Inserir Email" className=" placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-bold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                        <div className="font-poppins text-[#FF9633] font-extrabold underline text-[12px] col-start-2">Esqueci minha senha</div>
                        <button className="font-poppins rounded-full bg-[#ff5a01c3] col-start-2 h-12 mt-10">Enviar</button>

                </div>

                

            </div>
      

           
        </main>


    );



}