import { on } from "events";
import { ShoppingCart } from "lucide-react";
import { use, useEffect } from "react";

interface CartButtonProps {
  cartTotal: number;
  onClick: () => void;
  children?: React.ReactNode;
}

export default function CartFooter({ cartTotal, onClick, children }: CartButtonProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 shadow-md flex items-center gap-2 bg-[#FFD8B6] border-t border-[#F54B00] w-full z-50 py-2 md:py-3 rounded-tl-3xl rounded-tr-3xl text-[#F54B00] cursor-pointer justify-center"
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
