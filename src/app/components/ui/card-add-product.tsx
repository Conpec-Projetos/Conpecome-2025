import Image from "next/image";
import EditIcon from "@/app/assets/mingcute_edit-line.svg";
import ImageUploadIcon from "@/app/assets/uil_image-upload.svg";
import { useRef, useState } from "react";

export default function CardAddProduct({ onDelete }: { onDelete: () => void }) {
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPricePrice, setproductPricePrice] = useState("");
  const [editField, setEditField] = useState<string | null>(null);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditField(null);
    }
  };

  return (
    <div
      className="w-3/4 max-w-sm font-poppins font-bold border border-[#F54B00] 
                    rounded-xl p-4 flex gap-4"
    >
      <button
        onClick={handleUploadButtonClick}
        className="hover:scale-105 transition-transform w-24 h-24 flex flex-col items-center justify-center shrink-0"
      >
        {imageUrl ? (
          <>
            <Image src={EditIcon} alt="Edit" className="ml-auto mr-0" />
            <div className="w-24 h-24 relative">
              <Image
                src={imageUrl}
                alt="Imagem do Produto"
                className="object-cover select-none"
                fill
              />
            </div>
          </>
        ) : (
          <>
            <Image src={EditIcon} alt="Edit" className="ml-auto mr-0" />
            <Image src={ImageUploadIcon} alt="Upload Image" width={64} />
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </button>
      <div className="text-[#FF9633] overflow-hidden">
        <div className="flex items-center mb-1">
          {editField === "name" ? (
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm mr-1 bg-transparent border-b border-[#FF9633] outline-none"
              placeholder="Inserir nome"
            />
          ) : (
            <button
              onClick={() => setEditField("name")}
              className="w-full flex items-center hover:text-[#F54B00] transition-colors"
            >
              <div className="text-sm mr-1 truncate">
                {productName || "Inserir nome"}
              </div>
              <Image src={EditIcon} alt="Edit" />
            </button>
          )}
        </div>
        <div className="flex items-center mb-1">
          {editField === "price" ? (
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm mr-1 bg-transparent border-b border-[#FF9633] outline-none"
              placeholder="Inserir preço"
            />
          ) : (
            <button
              onClick={() => setEditField("price")}
              className="w-full flex items-center hover:text-[#F54B00] transition-colors"
            >
              <div className="truncate text-sm mr-1">
                {productPrice || "Inserir preço"}
              </div>
              <Image src={EditIcon} alt="Edit" />
            </button>
          )}
        </div>
        <div className="flex items-center">
          {editField === "pricePrice" ? (
            <input
              type="text"
              value={productPricePrice}
              onChange={(e) => setproductPricePrice(e.target.value)}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-xs mr-1 bg-transparent border-b border-[#FF9633] outline-none"
              placeholder="Inserir preço de preço"
            />
          ) : (
            <button
              onClick={() => setEditField("pricePrice")}
              className="w-full flex items-center hover:text-[#F54B00] transition-colors"
            >
              <div className="truncate text-xs mr-1">
                {productPricePrice || "Inserir preço de preço"}
              </div>
              <Image src={EditIcon} alt="Edit" width={10} />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={decrementQuantity}
              className="w-6 h-6 rounded-full bg-[#FF9633] hover:bg-[#F54B00] hover:scale-105 transition-all flex items-center justify-center text-white"
            >
              -
            </button>
            <div className="mx-3 text-[#FF9633]">{quantity}</div>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 rounded-full bg-[#FF9633] hover:bg-[#F54B00] hover:scale-105 transition-all flex items-center justify-center text-white"
            >
              +
            </button>
            <div className="mx-3" />
            <button
              onClick={onDelete}
              className="w-6 h-6 rounded-full bg-[#FF9633] hover:bg-[#F54B00] hover:scale-105 transition-all flex items-center justify-center text-white"
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
