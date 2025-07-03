"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/app/components/ui/header"
import TextField from "@/app/components/text-field";

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
      
      <Header />

      <div className="flex justify-center items-center relative mt-8 mb-8">
        <h1 className="font-pixelify text-[#FF3D00] text-[40px] font-bold">
          Informações
        </h1>
      </div>

      <div className="flex justify-center items-start h-full">
        <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-6">
          <div className="grid grid-cols-1 col-span-3 gap-3 items-center">
            <label className="text-[#f66c0e] col-span-1 font-poppins text-[16px] font-extrabold ml-5">
              Nome
            </label>
            <TextField
              name="nome"
              value={espaco.nome}
              onChange={handleInputChange}
              type="text"
              placeholder="Inserir Nome"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 col-span-3 items-center">
            <label className="text-[#f66c0e] col-span-1 font-poppins text-[16px] font-extrabold ml-5">
              Email
            </label>
            <TextField
              type="email"
              name="email"
              value={espaco.email}
              onChange={handleInputChange}
              placeholder="Inserir Email"
            />
          </div>

          <button
            className=" h-12 w-32 group col-start-2 mt-10  m-2 hover:bg-[#FF3D00] botao-laranja"
            onClick={handleEnviar}
          >
            <span className="text-white font-Poppins font-bold text-lg block transition duration-[175ms] group-hover:scale-[1.08]">Enviar </span>          </button>
        </div>
      </div>
    </main>
  );
}
