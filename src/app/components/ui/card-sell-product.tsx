import Image from "next/image";
import EditIcon from "@/assets/images/mingcute_edit-line.svg";
import ImageUploadIcon from "@/assets/images/uil_image-upload.svg";
import { useState } from "react";

export default function CardSellProduct({ onDelete }: { onDelete: () => void }) {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      className="w-3/4 max-w-sm font-poppins font-bold border border-[#f66c0e]
                    rounded-xl p-4 flex gap-4"
    >
      <button className="hover:scale-105 transition-transform w-24 h-24 flex flex-col items-center justify-center shrink-0">
        <Image src={EditIcon} alt="Edit" className="ml-auto mr-0" />
        <Image src={ImageUploadIcon} alt="Upload Image" width={64} />
      </button>
      <div className="text-[#f66c0e]">
        <button className="flex items-center mb-1 hover:scale-105 transition-transform">
          <div className="text-sm mr-1">Inserir nome</div>
          <Image src={EditIcon} alt="Edit" />
        </button>
        <button className="flex items-center mb-1 hover:scale-105 transition-transform">
          <div className="text-sm mr-1">Inserir preço</div>
          <Image src={EditIcon} alt="Edit" />
        </button>
        <button className="flex items-center hover:scale-105 transition-transform">
          <div className="text-xs mr-1">Inserir preço de preço</div>
          <Image src={EditIcon} alt="Edit" width={10} />
        </button>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 sm:gap-5">
            <button
              onClick={decrementQuantity}
              className="w-6 h-6 rounded-full  hover:scale-105  flex items-center botao-laranja justify-center text-white"
            >
              -
            </button>
            <div className="mx-3 text-[#f66c0e]">{quantity}</div>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 rounded-full  hover:scale-105  flex items-center botao-laranja justify-center text-white"
            >
              +
            </button>
            <div className="mx-3" />
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded-full  hover:scale-105 flex botao-laranja items-center justify-center text-white"
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
