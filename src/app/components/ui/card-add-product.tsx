import Image from "next/image";
import EditIcon from "@/app/assets/mingcute_edit-line.svg";
import ImageUploadIcon from "@/app/assets/uil_image-upload.svg";
import IconSalgados from "@/app/assets/IconSalgados.png";
import IconDoces from "@/app/assets/IconDoces.png";
import IconBebidas from "@/app/assets/IconBebidas.png";
import { useRef, useState } from "react";
import { LocalProduct } from "@/interfaces/productsInterfaces";
import EditableTextField from "../editable-text-field";

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

  const handleTypeChange = (type: string) => {
    setProductType(type);
    updateParent("type", type);
  };

  return (
    <div
      className="w-3/4 max-w-sm font-poppins font-bold border border-[#F54B00] 
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
      <div className="text-[#FF9633] text-sm overflow-hidden">
        <EditableTextField
          value={productName}
          placeholder="Inserir nome"
          onUpdate={(value) => {
            setProductName(String(value));
            updateParent("name", value);
          }}
        />
        <EditableTextField
          value={productPrice}
          placeholder="Inserir preço"
          fieldType="price"
          onUpdate={(value) => {
            setProductPrice(Number(value));
            updateParent("price", value);
          }}
        />
        <div className="mb-4">
          <div className="flex sm:gap-4">
            <button
              onClick={() => handleTypeChange("SALGADO")}
              className={`transition hover:scale-95 ${
                productType === "SALGADO"
                  ? "border border-[#FF9633] rounded-2xl"
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
                  ? "border border-[#FF9633] rounded-2xl"
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
                  ? "border border-[#FF9633] rounded-2xl"
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
              className="w-6 h-6 rounded-full bg-[#FF9633] hover:bg-[#F54B00] hover:scale-95 transition-all flex items-center justify-center text-white"
            >
              -
            </button>
            <div className="w-6 text-center text-[#FF9633]">{quantity}</div>
            <button
              onClick={incrementQuantity}
              className="w-6 h-6 rounded-full bg-[#FF9633] hover:bg-[#F54B00] hover:scale-95 transition-all flex items-center justify-center text-white"
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
                  : "bg-[#FF9633] hover:bg-[#F54B00] hover:scale-95 transition-all"
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
