import Image from "next/image";
import EditIcon from "@/assets/images/mingcute_edit-line.svg";
import ImageUploadIcon from "@/assets/images/uil_image-upload.svg";
import IconSalgados from "@/assets/images/IconSalgados.png";
import IconDoces from "@/assets/images/IconDoces.png";
import IconBebidas from "@/assets/images/IconBebidas.png";
import { useRef, useState } from "react";
import { LocalProduct } from "@/interfaces/productsInterfaces";

export default function CardAddProduct({
  product,
  onUpdate,
  onDelete,
  disableDelete = false,
}: {
  product: LocalProduct;
  onUpdate: (
    id: number,
    field: string,
    value: string | number | boolean | File | null
  ) => void;
  onDelete: () => void;
  disableDelete?: boolean;
}) {
  const [quantity, setQuantity] = useState(product.stock);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product.imageURL || null
  );
  const [productName, setProductName] = useState(product.name || "");
  const [productPrice, setProductPrice] = useState(product.price || 0);
  const [productType, setProductType] = useState(product.type || "");
  const [editField, setEditField] = useState<string | null>(null);

  const updateParent = (
    field: string,
    value: string | number | boolean | File | null
  ) => {
    onUpdate(product.id, field, value);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateParent("stock", newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateParent("stock", newQuantity);
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
      updateParent("imageURL", url);
      updateParent("imageFile", file);
    }
  };

  const formatPriceInBRL = (cents: number): string => {
    return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setProductName(newName);
    updateParent("name", newName);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Regex to remove non-numeric characters
    const cents = value ? parseInt(value, 10) : 0;
    setProductPrice(cents);
    updateParent("price", cents);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditField(null);
    }
  };

  const handleTypeChange = (type: string) => {
    setProductType(type);
    updateParent("type", type);
  };

  return (
    <div
      className="w-3/4 max-w-sm font-poppins font-bold border border-[#f66c0e]
                    rounded-xl p-4 flex gap-4"
    >
      <button
        onClick={handleUploadButtonClick}
        className="hover:scale-95 transition-transform w-24 h-24 flex flex-col items-center justify-center shrink-0"
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
      <div className="text-[#f66c0e] overflow-hidden">
        <div className="flex items-center mb-1">
          {editField === "name" ? (
            <input
              type="text"
              value={productName}
              onChange={handleNameChange}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm mr-1 bg-transparent border-b border-[#f66c0e] outline-none"
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
              value={productPrice === 0 ? "" : formatPriceInBRL(productPrice)}
              onChange={handlePriceChange}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm mr-1 bg-transparent border-b border-[#f66c0e] outline-none"
              placeholder="Inserir preço"
            />
          ) : (
            <button
              onClick={() => setEditField("price")}
              className="w-full flex items-center hover:text-[#F54B00] transition-colors"
            >
              <div className="truncate text-sm mr-1">
                {productPrice > 0
                  ? formatPriceInBRL(productPrice)
                  : "Inserir preço"}
              </div>
              <Image src={EditIcon} alt="Edit" />
            </button>
          )}
        </div>
        <div className="mb-4">
          <div className="flex sm:gap-4">
            <button
              onClick={() => handleTypeChange("SALGADO")}
              className={`transition hover:scale-95 ${
                productType === "SALGADO"
                  ? "border border-[#f66c0e] rounded-2xl"
                  : ""
              }`}
            >
              <div className="w-[60px] h-[60px] overflow-hidden">
                <Image
                  src={IconSalgados}
                  alt="Salgados"
                  className="scale-[110%]"
                />
              </div>
            </button>

            <button
              onClick={() => handleTypeChange("DOCE")}
              className={`transition hover:scale-95 ${
                productType === "DOCE"
                  ? "border border-[#f66c0e] rounded-2xl"
                  : ""
              }`}
            >
              <div className="w-[60px] h-[60px] overflow-hidden">
                <Image src={IconDoces} alt="Doces" className="scale-[110%]" />
              </div>
            </button>

            <button
              onClick={() => handleTypeChange("BEBIDA")}
              className={`transition hover:scale-95 ${
                productType === "BEBIDA"
                  ? "border border-[#f66c0e] rounded-2xl"
                  : ""
              }`}
            >
              <div className="w-[60px] h-[60px] overflow-hidden">
                <Image
                  src={IconBebidas}
                  alt="Bebidas"
                  className="scale-[110%]"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={decrementQuantity}
              className="w-6 h-6 hover:scale-95 flex botao-laranja items-center justify-center text-white"
            >
              -
            </button>
            <div className="w-6 text-center text-[#f66c0e]">{quantity}</div>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6  hover:scale-95 botao-laranja flex items-center justify-center text-white"
            >
              +
            </button>
            <div className="mx-3" />
            <button
              onClick={onDelete}
              disabled={disableDelete}
              className={`w-6 h-6 rounded-full ${
                disableDelete
                  ? "bg-[#8A8A8A] cursor-not-allowed transition-colors"
                  : "bg-[#f66c0e] hover:bg-[#F54B00] hover:scale-95 transition-all"
              } flex items-center justify-center text-white`}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
