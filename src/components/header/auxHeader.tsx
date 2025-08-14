import Image from "next/image";
import LogoConpec from "@/assets/images/ConpecLogo.svg";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AuxHeader() {
  const router = useRouter();
  return (
    <header className="w-full p-4">
      <div
        className="flex justify-between items-center"
        onClick={() => router.push("/")}
      >
        <ArrowLeft
          className="w-6 h-6 md:w-8 md:h-8 text-[#f66c0e] hover:text-[#c2410c] transition-colors cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="text-2xl md:text-6xl font-bold text-[#f66c0e] font-pixelify-sans">
          CONPECOME
        </div>
        <div className="w-[65px] sm:w-[85px]">
          <Image src={LogoConpec} alt="Conpec" />
        </div>
      </div>
    </header>
  );
}
