import Image from "next/image";
import { useRouter } from "next/navigation";
import logoConpec from "@/assets/images/ConpecLogo.svg";
import { ClockFading, LogOut, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminHeaderProps {
  onAddProduct?: () => void;
  onHistorico?: () => void;
}

export default function AdminHeader({ onAddProduct, onHistorico }: AdminHeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <header className="w-full bg-[#FFE8DE] px-4 md:px-8 py-4 rounded-b-3xl">

      <div className="flex flex-row items-center justify-between gap-4 md:gap-6 w-full">
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <Image
            src={logoConpec}
            alt="Logo"
            width={70}
            height={70}
            unoptimized={true}
            className="w-16 h-14 sm:w-20 sm:h-16 md:w-28 md:h-[60px]"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#FF3D00] font-pixelify-sans font-bold leading-tight">
              CONPECOME
            </h1>
            <div className="text-[#FF3D00] font-poppins font-bold text-sm sm:text-base md:text-lg">
              Já pode aomossar?
            </div>
          </div>
        </div>


        <div
          className="flex items-center cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <LogOut
            onClick={logout}
            className="w-6 h-6 md:w-8 md:h-8 text-[#FF3D00] group-hover:text-[#c2410c] transition-colors cursor-pointer" />
        </div>
      </div>

      <div className="mt-4 flex gap-4 justify-start overflow-x-auto">
        <button
          className="p-3 bg-[#FFD8B6] border border-[#F54B00] rounded-full flex items-center justify-center hover:bg-[#FFE8DE] transition-colors cursor-pointer"
          onClick={onAddProduct}
        >
          <Plus className="w-6 h-6 text-[#FF3D00]" />
        </button>
        <button
          className="p-3 bg-[#FFD8B6] border border-[#F54B00] rounded-full flex items-center justify-center hover:bg-[#FFE8DE] transition-colors cursor-pointer"
          onClick={onHistorico}
        >
          <ClockFading className="w-6 h-6 text-[#FF3D00]" />
        </button>
      </div>
    </header>
  );
}
