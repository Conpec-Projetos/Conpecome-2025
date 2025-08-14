"use client";
import Logo from "@/assets/images/ConpecLogo.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-zinc-50 font-poppins flex flex-col justify-center items-center">
      <Image
        alt="logo principal"
        src={Logo}
        className="inline-block w-[15rem] sm:w-[23rem]"
        priority
        unoptimized
      />
      <h1 className="text-conpec-primary !text-2xl sm:!text-4xl font-bold">
        Erro 404
      </h1>
      <h2 className="text-conpec-secondary !text-lg sm:!text-2xl text-center font-bold">
        Página não encontrada
      </h2>
      <Button
        size={"conpec"}
        variant={"conpec"}
        className="mt-5 sm:mt-10 px-4"
        onClick={() => router.push("/")}
      >
        Retornar para a página inicial
      </Button>
    </div>
  );
}
