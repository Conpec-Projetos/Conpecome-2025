import Image from "next/image";
import { useRouter } from "next/navigation";
import logoConpec from "@/assets/images/logo-conpec.svg";
import seta from "@/assets/images/Vector.png";
import relogio from "@/assets/images/Group.png";
import { LogIn, LogOut, ShoppingCart } from "lucide-react";

import TextField from "../text-field";

interface MainHeaderProps {
  onAddProduct?: () => void;
  onHistorico?: () => void;
  onLogout?: () => void;
  showAdminActions?: boolean;
  showCart?: boolean;
  cartTotal?: number;
  onCartClick?: () => void;
  children?: React.ReactNode;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
}

export default function MainHeader({
  onAddProduct,
  onHistorico,
  showAdminActions = false,
  showCart = false,
  cartTotal,
  onCartClick,
  children,
  searchTerm = "",
  onSearchTermChange
}: MainHeaderProps) {
  const router = useRouter();
  return (
    <header className="w-full h-[151px] bg-[#FFE8DE] flex flex-row items-center justify-between px-8 rounded-b-3xl">
      <div className="flex items-center gap-6">
        <Image src={logoConpec} alt="Logo" width={70} height={70} unoptimized={true} className="w-32 h-[63px]"/>
        
        <div className="hidden lg:flex flex-col m-5">
          <h1 className="text-6xl text-[#FF3D00] font-pixelify-sans font-bold">CONPECOME</h1>
          <div className="text-[#FF3D00] font-poppins font-bold">Já pode aomossar?</div>
        </div>
        {/* Search Bar */}
        {!showAdminActions && <div className="relative ml-8 w-72">
          <TextField
              placeholder="Pesquisar"
              className="placeholder-gray-300 w-full py-2 pl-10"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchTermChange && onSearchTermChange(e.target.value)}
            />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
          </span>
        </div>}
        {showAdminActions && (
          <>
            <button className="w-[235px] font-poppins underline text-[#FF7D02] justify-between font-bold flex flex-row items-center ml-8"
              onClick={onAddProduct}>
              Adicionar Novo Produto <Image src={seta} alt='' width={25} height={20}/>
            </button>
            <button className="w-52 font-poppins underline text-[#FF7D02] justify-between font-bold flex flex-row items-center ml-4"
              onClick={onHistorico}>
              Histórico de pedidos <Image src={relogio} alt='' width={25} height={20} />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center gap-8">
        {showCart && cartTotal !== undefined && onCartClick && (
          <div
            className="shadow-md flex items-center gap-2 bg-[#FFD8B6] border border-[#F54B00] px-6 py-3 rounded-3xl text-[#F54B00] cursor-pointer relative group"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-10 h-10 text-[#F54B00] group-hover:text-[#c2410c] transition-colors" />
            <span id="cart_total">R$ {(cartTotal / 100).toFixed(2).replace('.', ',')}</span>
            {children}
          </div>
        )}
        {showAdminActions ? (
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => router.push("/")}
            >
              <LogOut
                className="w-10 h-10 text-[#FF3D00] group-hover:text-[#c2410c] transition-colors"
              />
              <span className="text-[#FF3D00] font-poppins font-semibold text-lg group-hover:text-[#c2410c] transition-colors">
                Sair
              </span>
            </div>
        ) : (
            <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => router.push("admin/login")}
            >
              <LogIn
                className="w-10 h-10 text-[#FF3D00] group-hover:text-[#c2410c] transition-colors"
              />
              <span className="text-[#FF3D00] font-poppins font-semibold text-lg group-hover:text-[#c2410c] transition-colors">
                Entrar
              </span>
            </div>
        )}
      </div>
    </header>
  );
}

// router.push("admin/login");
// <button onClick={() => router.push("admin/login")}>
          //   <Image src={botaoSair} alt="Botão para Entrar" width={90} height={96} unoptimized={true}/>
          // </button>