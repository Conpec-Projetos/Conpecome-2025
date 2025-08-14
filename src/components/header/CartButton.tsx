import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  cartTotal: number;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function CartButton({ cartTotal, onClick, children }: CartButtonProps) {
  return (
    <div
      className="shadow-md flex items-center gap-2 bg-[#FFD8B6] border border-[#F54B00] px-4 md:px-6 py-2 md:py-3 rounded-3xl text-[#F54B00] cursor-pointer relative group min-w-[150px] md:min-w-[180px] justify-center"
      onClick={onClick}
    >
      <ShoppingCart className="w-7 h-7 md:w-9 md:h-9 text-[#F54B00] group-hover:text-[#c2410c] transition-colors" />
      <span id="cart_total">
        R$ {(cartTotal / 100).toFixed(2).replace(".", ",")}
      </span>
      {children}
    </div>
  );
}