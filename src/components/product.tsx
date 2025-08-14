"use client";

import Image from "next/image";
import { FC, useState, useRef } from "react";
import { ProductType, ProductAddType } from "@/interfaces/productsInterfaces";
import { Pencil, Check, X, SquarePen, Plus, Minus } from "lucide-react";
import {
  updateProductsAction,
  removeProductsAction,
} from "@/firebase/services/actions/productsAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ProductProps = {
  product: ProductAddType;
  setProducts: React.Dispatch<React.SetStateAction<ProductAddType[]>>;
};

const Product: FC<ProductProps> = ({ product, setProducts }) => {
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState<"name" | "price" | null>(null);

  const [form, setForm] = useState<ProductType>({
    uuid: product.uuid,
    imageURL: product.imageURL,
    name: product.name,
    price: product.price,
    imageFile: undefined as File | undefined,
    stock: product.stock,
    type: product.type,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatPriceInBRL = (cents: number) =>
    `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;

  const handleEditAccept = () => {
    setProducts((products) =>
      products.map((p) =>
        p.uuid === product.uuid
          ? {
              ...p,
              name: form.name,
              price: form.price,
              imageFile: form.imageFile,
              stock: form.stock,
            }
          : p
      )
    );
    updateProductsAction(form);
    setForm((prev) => ({ ...prev, imageFile: undefined }));
    setEditField(null);
    setEditing(false);
  };

  const handleEditCancel = () => {
    setForm({ ...product, imageFile: undefined });
    setEditField(null);
    setEditing(false);
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((prev) => ({
          ...prev,
          imageFile: file,
          imageURL: typeof reader.result === "string" ? reader.result : prev.imageURL,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, name: e.target.value }));

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, price: value ? parseInt(value, 10) : 0 }));
  };

  const incrementStock = () =>
    setForm((prev) => ({ ...prev, stock: prev.stock + 1 }));
  const decrementStock = () =>
    setForm((prev) => ({ ...prev, stock: Math.max(0, prev.stock - 1) }));

  const onRemove = () => {
    removeProductsAction(form.uuid);
    setProducts((prev) => prev.filter((p) => p.uuid !== form.uuid));
  };

  return (
    <div className="w-4/5 flex flex-col sm:flex-row bg-[#FFECE4] border-2 border-[#F66C0E] rounded-2xl p-4 gap-4 sm:gap-6 relative">
      <Button
        size="icon"
        variant="destructive"
        className="rounded-full"
        onClick={onRemove}
      >
        <X />
      </Button>
      <div className="absolute top-2 right-2 flex gap-2">
        {editing ? (
          <div className="z-10 gap-2 flex">
            <Button
              size="icon"
              variant="success"
              className="rounded-full"
              onClick={handleEditAccept}
            >
              <Check />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="rounded-full"
              onClick={handleEditCancel}
            >
              <X />
            </Button>
          </div>
        ) : (
          <Button
            className="z-10 rounded-full"
            size="icon"
            variant="outline"
            onClick={() => setEditing(true)}
          >
            <Pencil />
          </Button>
        )}
      </div>

      <div className="relative w-full sm:w-1/3 h-48 flex-shrink-0 flex items-center justify-center">
        <Image
          src={
            form.imageURL?.startsWith("http") ||
            form.imageURL?.startsWith("data:image/")
              ? form.imageURL
              : "/placeholder.png"
          }
          alt={product.name}
          className="object-cover rounded-xl"
          fill
        />
        {editing && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <Button
              size="icon"
              variant="outline"
              className="absolute bottom-2 right-2"
              onClick={handleImageClick}
            >
              <SquarePen className="w-5 h-5 text-[#F66C0E]" />
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-3 sm:gap-4">
        {editing && editField === "name" ? (
          <Input
            autoFocus
            value={form.name}
            onChange={handleNameChange}
            onBlur={() => setEditField(null)}
          />
        ) : (
          <button
            disabled={!editing}
            onClick={() => setEditField("name")}
            className="text-[#F66C0E] font-bold text-xl sm:text-2xl text-left truncate hover:text-[#F54B00] transition-colors"
          >
            {form.name || "Inserir nome"}
          </button>
        )}

        {editing && editField === "price" ? (
          <Input
            autoFocus
            value={form.price === 0 ? "" : formatPriceInBRL(form.price)}
            onChange={handlePriceChange}
            onBlur={() => setEditField(null)}
          />
        ) : (
          <button
            disabled={!editing}
            onClick={() => setEditField("price")}
            className="text-[#F66C0E] font-bold text-xl sm:text-2xl text-left truncate hover:text-[#F54B00] transition-colors"
          >
            {form.price > 0 ? formatPriceInBRL(form.price) : "Inserir preço"}
          </button>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            {editing && (
              <Button
                size="icon"
                className="bg-[#0F99F5] rounded-lg"
                onClick={decrementStock}
              >
                <Minus className="w-5 h-5" />
              </Button>
            )}
            <div className="text-[#F66C0E] font-bold text-lg sm:text-xl text-center">
              {form.stock + `${!editing ? " unidades" : ""}`}
            </div>
            {editing && (
              <Button
                size="icon"
                className="bg-[#0F99F5] rounded-lg"
                onClick={incrementStock}
              >
                <Plus />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
