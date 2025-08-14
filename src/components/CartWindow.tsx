import Image from "next/image";
import type { ProductItem } from "@/services/dataAcess/productService";

interface CartWindowProps {
  cartItems: (ProductItem & { quantity: number })[];
  cartTotal: number;
  formatToBRL: (value: number) => string;
  clearCart: () => void;
  finishOrder: () => void;
}

export const CartWindow: React.FC<CartWindowProps> = ({
  cartItems,
  cartTotal,
  formatToBRL,
  clearCart,
  finishOrder,
}) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-full sm:w-96 bg-white border border-[#FF9633] rounded-2xl shadow-lg z-50 p-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-[#FF3D00] border-b border-[#FF9633] pb-2">
          Carrinho
        </h3>

        {cartItems.length === 0 ? (
          <p className="text-center text-[#FF3D00] py-4">
            Seu carrinho está vazio
          </p>
        ) : (
          <>
            <div className="max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2 border-b border-[#FFE8DE]"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        item.imageURL?.startsWith("http") ||
                        item.imageURL?.startsWith("data:image/")
                          ? item.imageURL
                          : item.imageURL
                          ? `/${item.imageURL.replace(/^\/+/, "")}`
                          : "/placeholder.png"
                      }
                      alt={item.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <div>
                      <p className="font-semibold text-[#FF3D00]">
                        {item.name.charAt(0).toUpperCase() +
                          item.name.slice(1)}
                      </p>
                      <p className="text-sm text-[#FF9633]">
                        {item.quantity}x {formatToBRL(item.price)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#FF3D00]">
                    {formatToBRL(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#FF9633] pt-4 mt-2">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[#FF3D00]">Total:</span>
                <span className="font-bold text-[#FF3D00]">
                  {formatToBRL(cartTotal)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 py-2 px-4 bg-white border border-[#FF3D00] text-[#FF3D00] rounded-full hover:bg-[#FFE8DE] transition-colors"
                >
                  Limpar
                </button>
                <button
                  onClick={finishOrder}
                  className="flex-1 py-2 px-4 bg-[#FF3D00] text-white rounded-full hover:bg-[#FF9633] transition-colors"
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};