"use client";
import Image from "next/image";

import ConpecLogo from "@/assets/images/ConpecLogo.svg"
import ArrowLeft from "@/assets/images/ArrowLeftIcon.png"
import { useRouter } from "next/navigation";
import Header from "../../../components/ui/header"

export default function Login(){
    const router = useRouter();

    return(

        <main className="min-h-screen w-screen bg-[#FFF4EF]">

            <Header />

            <div className="flex justify-center items-center relative mt-8 mb-8">
                
                <h1 className="font-pixelify text-[#FF3D00] text-[40px] font-bold ">
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
                        <button className="font-poppins rounded-full bg-[#ff5a01c3] col-start-2 h-12 mt-10 font-extrabold"
                            onClick={() => {router.push("/admin/estoque")}}>
                                Enviar</button>

                </div>

                

            </div>
      

           
        </main>


    );



}
