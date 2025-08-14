import Image from "next/image";
import logoConpec from "@/assets/images/LogoSimple.svg";
import TextField from "../text-field";
import CartButton from "./CartButton";
import { Search } from "lucide-react";

interface CustomerHeaderProps {
  showCart?: boolean;
  cartTotal?: number;
  onCartClick?: () => void;
  children?: React.ReactNode;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
}

export default function CustomerHeader({
  showCart = false,
  cartTotal,
  onCartClick,
  children,
  searchTerm = "",
  onSearchTermChange,
}: CustomerHeaderProps) {
  return (
    <header className="w-full bg-[#FFE8DE] px-4 md:px-8 py-4 rounded-b-3xl">
      <div className="flex flex-row items-center justify-between gap-4 md:gap-6 w-full">
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <div className="w-28 h-28 md:w-32 md:h-32 relative">
            <Image
              src={logoConpec}
              alt="Conpec Logo"
              fill
              className="object-contain"
              unoptimized={true}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#FF3D00] font-pixelify-sans font-bold leading-tight">
              CONPECOME
            </h1>
            <div className="text-[#FF3D00] font-poppins font-bold text-sm sm:text-base md:text-lg">
              Já pode aomossar?
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 flex flex-row gap-1">
        <div className="relative flex-grow">
          <TextField
            placeholder="Pesquisar"
            className="placeholder-gray-500 w-full py-2 pl-10"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearchTermChange && onSearchTermChange(e.target.value)
            }
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-5 h-5" />
          </span>
        </div>
        <div className="hidden sm:block">
          {showCart && cartTotal !== undefined && onCartClick && (
            <CartButton cartTotal={cartTotal} onClick={onCartClick}>
              {children}
            </CartButton>
          )}
        </div>
      </div>
    </header>
  );
}
