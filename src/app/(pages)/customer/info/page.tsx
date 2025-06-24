"use client";
import Image from "next/image";
import ConpecLogo from "@/assets/images/ConpecLogo.svg";
import ArrowLeft from "@/assets/images/ArrowLeftIcon.png";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Info() {
  const router = useRouter();
  const [espaco, setEspaco] = useState({ nome: "", email: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEspaco((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnviar = () => {
    if (!espaco.nome.trim() || !espaco.email.trim()) {
      alert("Por favor, preencha nome e email.");
      return;
    }

    const nomeEncoded = encodeURIComponent(espaco.nome);
    const emailEncoded = encodeURIComponent(espaco.email);
    router.push(`/customer/pagamento?nome=${nomeEncoded}&email=${emailEncoded}`);
  };

  return (
    <main className="min-h-screen w-screen bg-[#FFF4EF]">
      <header className="h-9 flex items-center justify-between top-5 p-9 relative">
        <Image
          onClick={router.back}
          src={ArrowLeft}
          alt="arrow"
          className="text-[#FF3D00] h-[40px] w-auto z-10 mb-5 cursor-pointer"
        />
        <div className="font-pixelify text-[55px] text-[#FF3D00] left-32 absolute font-bold">
          CONPECOME
        </div>
        <Image src={ConpecLogo} alt="logo" className="w-20" />
      </header>

      <div className="flex justify-center items-center relative mt-20 mb-20">
        <h1 className="font-pixelify text-[#FF3D00] text-[40px] font-bold">
          Informações
        </h1>
      </div>

      <div className="flex justify-center items-start h-full">
        <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
          <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
            <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">
              Nome
            </label>
            <input
              name="nome"
              value={espaco.nome}
              onChange={handleInputChange}
              type="text"
              placeholder="Inserir Nome"
              className="text-[#ff7c0287] placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-extrabold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
            <label className="text-[#FF7D02] col-span-1 font-poppins text-[16px] font-extrabold ml-5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={espaco.email}
              onChange={handleInputChange}
              placeholder="Inserir Email"
              className="text-[#ff7c0287] placeholder-[#ff7c0287] font-poppins col-span-3 h-14 rounded-full px-8 py-5 text-[10px] font-extrabold border-2 border-[#ff5a0179] focus:border-[#ff5a01c9] focus:outline-none"
            />
          </div>

          <button
            className="font-poppins rounded-full bg-[#ff5a01c3] col-start-2 h-12 mt-10 font-extrabold text-white hover:bg-[#ff5a01]"
            onClick={handleEnviar}
          >
            Enviar
          </button>
        </div>
      </div>
    </main>
  );
}
