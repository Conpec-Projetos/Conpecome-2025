"use client";
import Image from "next/image";

import ConpecLogo from "@/assets/images/ConpecLogo.svg"
import ArrowLeft from "@/assets/images/ArrowLeftIcon.png"
import { useRouter } from "next/navigation";

export default function Login(){
    const router = useRouter();

    return(

        <main className="min-h-screen w-screen bg-[#FFF4EF]">


            <header className="h-9 flex items-center justify-between top-5 p-9 relative">
                
                <Image onClick={router.back} src={ArrowLeft} alt="arrow" className="text-[#f66c0e] h-[40px] w-auto z-10 mb-5"/>
                {/* Mesma seta do Figma, porem ta cortando um pouco a ponta e não sei o pq, resolver depois ou usar o React Icons */}

                <div className="font-pixelify text-[55px] text-[#f66c0e] left-32 absolute font-bold">
                    CONPECOME
                </div>
                
                <Image src={ConpecLogo} alt="logo" className="w-20"></Image>

            </header>

            <div className="flex justify-center items-center relative mt-20 mb-20">
                
                <h1 className="font-pixelify text-[#f66c0e] text-[40px] font-bold ">
                    Login
                </h1>
            </div>
            
            
           <div className="flex justify-center items-start h-full">

                <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
                    <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Email</label>
                        <input type="text" placeholder="Inserir Email" className="text-[#ff7c0287] placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-extrabold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Senha</label>
                        <input type="text" placeholder="Inserir senha" className=" text-[#ff7c0287] placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-extrabold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none" />
                    </div>
                        <div className="font-poppins text-[#FF9633] font-extrabold underline text-[12px] col-start-2">Esqueci minha senha</div>
                        <button className=" group h-12 w-32 col-start-2 mt-10  m-2 botao-laranja"
                            onClick={() => {router.push("/admin/estoque")}}>
                            <span className="text-white font-Poppins font-bold text-lg block transition duration-[175ms] group-hover:scale-[1.08]">Enviar </span>          </button>

                </div>

                

            </div>
      

           
        </main>


    );



}
