import { FaArrowLeft } from "react-icons/fa6";
import Image from "next/image";

import ConpecLogo from "@/assets/images/ConpecLogo.svg"

export default function Login(){


    return(

        <main className="min-h-screen w-screen bg-[#FFF4EF]">


            <header className="h-9 flex items-center justify-between top-5 p-9 relative">
                
                <FaArrowLeft className="text-5xl text-[#FF3D00] "/>

                <div className="font-pixelify text-[55px] text-[#FF3D00] left-32 absolute font-bold">
                    CONPECOME
                </div>
                
                <Image src={ConpecLogo} alt="logo" className="w-20"></Image>

            </header>

            <div className="flex justify-center items-center relative mt-20 mb-20">
                
                <h1 className="font-pixelify text-[#FF3D00] text-[40px] font-bold ">
                    Informações
                </h1>
            </div>
            
            
            <div className="flex justify-center items-start h-full">

                <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
                    <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                        <label className="text-black col-span-1 font-poppins text-[16px]">Nome</label>
                        <input type="text" placeholder="Inserir Nome" className="col-span-3 h-14 rounded-full px-6 text-[15px] border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                        <label className="text-black col-span-1 font-poppins text-[16px]">Email</label>
                        <input type="text" placeholder="Inserir Email" className="col-span-3 h-14 rounded-full px-6 text-[15px] border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                        
                        <button className="rounded-full bg-brand col-start-2 h-12">ENVIAR</button>

                </div>

                

            </div>
      

           
        </main>


    );



}