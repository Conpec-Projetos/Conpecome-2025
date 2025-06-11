import Image from "next/image";
import LogoConpec from "@/app/assets/logo-conpec.svg";
import ArrowIcon from "@/app/assets/arrow-icon.svg";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <header className="w-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex">
          <button onClick={router.back} className="w-[35px] sm:w-[65px] mr-10 hover:scale-105 transition-transform">
            <Image src={ArrowIcon} alt="arrow-left" />
          </button>
          <div className="text-6xl font-bold text-[#FF3D00] font-pixelify-sans hidden sm:block">
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
