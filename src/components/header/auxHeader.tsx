import Image from "next/image";
import LogoConpec from "@/assets/images/ConpecLogo.svg";

export default function AuxHeader() {
  return (
    <header className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="text-6xl font-bold text-[#f66c0e] font-pixelify-sans hidden md:block">
            CONPECOME
          </div>
        </div>
        <div className="w-[65px] sm:w-[85px]">
          <Image src={LogoConpec} alt="Conpec" />
        </div>
      </div>
    </header>
  );
}
