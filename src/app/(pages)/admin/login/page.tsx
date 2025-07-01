"use client";
import { useRouter } from "next/navigation";
import Header from "@/app/components/ui/header"
import TextField from "@/app/components/text-field";

export default function Login(){
    const router = useRouter();

    return(

        <main className="min-h-screen w-screen bg-[#FFF4EF]">

            <Header />

            <div className="flex justify-center items-center relative mt-8 mb-8">
                
                <h1 className="font-pixelify-sans text-[#FF3D00] text-[40px] font-bold ">
                    Login
                </h1>
            </div>
            
            
           <div className="flex justify-center items-start h-full">

                <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
                    <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Email</label>
                        <TextField placeholder="Inserir email"/>
                    </div>
                    <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
                        <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">Senha</label>
                        <TextField placeholder="Inserir senha"/>
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
