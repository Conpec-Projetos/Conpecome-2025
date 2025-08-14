import Image from "next/image";
import ProductTypeCarousel from "@/components/ProductTypeCarousel";
import { useRef, useState } from "react";
import { LocalProduct } from "@/interfaces/productsInterfaces";
import { ImageUp, Minus, Plus, SquarePen, X } from "lucide-react";
import { Button } from "./ui/button";

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateParent = (
    field: string,
    value: string | number | boolean | File | null
  ) => onUpdate(product.id, field, value);

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

  const handleUploadButtonClick = () => fileInputRef.current?.click();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Compress to JPEG, quality 0.7
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
            const url = URL.createObjectURL(compressedFile);
            setImageUrl(url);
            updateParent("imageURL", url);
            updateParent("imageFile", compressedFile);
          }
        }, "image/jpeg", 0.65);
      };
    }
  };

  const formatPriceInBRL = (cents: number) =>
    `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setProductName(newName);
    updateParent("name", newName);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const cents = value ? parseInt(value, 10) : 0;
    setProductPrice(cents);
    updateParent("price", cents);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditField(null);
  };

  const handleTypeChange = (type: string) => {
    setProductType(type);
    updateParent("type", type);
  };

  return (
    <div className="w-4/5 sm:w-full max-w-sm font-poppins font-bold border border-[#f66c0e] rounded-xl p-4 flex flex-col gap-4 bg-white">
      <div className="w-full flex flex-row">
        <button
          onClick={handleUploadButtonClick}
          className="hover:scale-95 transition-transform flex-1 h-40 flex flex-col items-center justify-center shrink-0 relative"
        >
          {imageUrl ? (
            <div className="w-full h-full border-2 rounded-lg border-conpec-secondary border-dashed relative">
              <Image
                src={imageUrl}
                alt="Imagem do Produto"
                className="object-cover rounded-lg select-none"
                fill
              />
              <SquarePen className="absolute top-1 right-1 text-conpec-primary bg-white rounded-full p-1" />
            </div>
          ) : (
            <div className="w-full h-full border-2 rounded-lg border-conpec-secondary border-dashed flex justify-center items-center">
              <ImageUp className="text-conpec-primary" size={24} />
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-2 justify-between text-[#f66c0e]">
        <div>
          {editField === "name" ? (
            <input
              type="text"
              value={productName}
              onChange={handleNameChange}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm w-full bg-transparent border-b border-[#f66c0e] outline-none"
              placeholder="Inserir nome"
            />
          ) : (
            <button
              onClick={() => setEditField("name")}
              className="flex w-full items-center gap-x-1 hover:text-[#F54B00] transition-colors border-1 border-conpec-primary rounded-xl border-dotted py-1 px-2"
            >
              <SquarePen className="text-conpec-primary ml-1" />
              <div className="text-sm truncate">
                {productName || "Inserir nome"}
              </div>
            </button>
          )}
        </div>

        <div>
          {editField === "price" ? (
            <input
              type="text"
              value={productPrice === 0 ? "" : formatPriceInBRL(productPrice)}
              onChange={handlePriceChange}
              onBlur={() => setEditField(null)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              className="text-sm w-full bg-transparent border-b border-[#f66c0e] outline-none"
              placeholder="Inserir preço"
            />
          ) : (
            <button
              onClick={() => setEditField("price")}
              className="w-full flex items-center gap-x-1 hover:text-[#F54B00] transition-colors border-1 border-conpec-primary rounded-xl border-dotted py-1 px-2"
            >
              <SquarePen className="text-conpec-primary ml-1" />
              <div className="truncate text-sm">
                {productPrice > 0
                  ? formatPriceInBRL(productPrice)
                  : "Inserir preço"}
              </div>
            </button>
          )}
        </div>

        <div className="mb-2 w-full border border-conpec-tertiary rounded-xl select-none">
          <ProductTypeCarousel
            productType={productType}
            onTypeChange={handleTypeChange}
          />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 ">
          <div className="flex items-center gap-2">
            <Button
              onClick={decrementQuantity}
              size={"icon"}
              variant={"conpec"}
            >
              <Minus className="text-white" size={16} />
            </Button>
            <div className="text-center text-[#f66c0e] w-6">{quantity}</div>
            <Button
              onClick={incrementQuantity}
              size={"icon"}
              variant={"conpec"}
            >
              <Plus className="text-white" size={16} />
            </Button>
          </div>

          <Button
            onClick={onDelete}
            disabled={disableDelete}
            size={"icon"}
            variant={disableDelete ? "secondary" : "destructive"}
            className={disableDelete ? "cursor-not-allowed" : ""}
          >
            <X className="text-white" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
