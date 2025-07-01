import Image from "next/image";
import { useRouter } from "next/navigation";
import logoConpec from "@/app/assets/logo-conpec.svg";
import seta from "@/app/assets/Vector.png";
import relogio from "@/app/assets/Group.png";
import botaoSair from "@/app/assets/Sair.png";

interface MainHeaderProps {
  onAddProduct?: () => void;
  onHistorico?: () => void;
  onLogout?: () => void;
  showAdminActions?: boolean;
  showCart?: boolean;
  cartTotal?: number;
  onCartClick?: () => void;
  children?: React.ReactNode;
}

export default function MainHeader({
  onAddProduct,
  onHistorico,
  onLogout,
  showAdminActions = false,
  showCart = false,
  cartTotal,
  onCartClick,
  children
}: MainHeaderProps) {
  const router = useRouter();
  return (
    <header className="w-full h-[151px] bg-[#FFE8DE] flex flex-row items-center justify-between px-8 rounded-b-3xl">
      <div className="flex items-center gap-6">
        <button className="w-32 h-[63px]" onClick={() => router.push("..")}> 
          <Image src={logoConpec} alt="Logo" width={70} height={70} unoptimized={true} />
        </button>
        <div className="flex flex-col m-5">
          <h1 className="text-6xl text-[#FF3D00] font-pixelify-sans font-bold">CONPECOME</h1>
          <div className="text-[#FF3D00] font-poppins font-bold">Já pode aomossar?</div>
        </div>
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
            className="shadow-md flex items-center gap-2 bg-[#FFD8B6] border border-[#F54B00] px-6 py-3 rounded-3xl text-[#F54B00] cursor-pointer relative"
            onClick={onCartClick}
          >
            <Image
              src={"/carrossel/assets/shopping_cart.png"}
              alt="Shopping Cart"
              width={40}
              height={40}
            />
            <span id="cart_total">R$ {(cartTotal / 100).toFixed(2).replace('.', ',')}</span>
            {children}
          </div>
        )}
        {showAdminActions && (
          <button onClick={onLogout || router.back}>
            <Image src={botaoSair} alt="Botão para Sair" width={90} height={96} unoptimized={true}/>
          </button>
        )}
      </div>
    </header>
  );
}
