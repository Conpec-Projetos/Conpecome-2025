"use client";
import { useEffect, useRef, useState } from "react";
import Product from "@/components/product";

import { useRouter } from "next/navigation";
import {
  getProductsAction,
  removeProductsAction,
  updateProductsAction,
} from "@/firebase/services/actions/productsAction";
import { ProductType } from "@/interfaces/productsInterfaces";
import bg from "@/assets/images/background.png";
import AdminHeader from "@/components/header/AdminHeader";
import CategoryCarousel from "@/components/CategoryCarousel";

export default function Estoque_ADM() {
  const router = useRouter();

  const [initialProducts, setInitialProducts] = useState<ProductType[]>([]);
  const [debouncedProducts, setdebouncedProducts] = useState<ProductType[]>([]);
  const removeIDRef = useRef<string>("");
  const [filteredType, setFilteredType] = useState<string>("all");

  useEffect(() => {
    getProductsAction().then((products) => {
      setInitialProducts(products);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedProducts(initialProducts);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [initialProducts]);

  useEffect(() => {
    if (!removeIDRef.current) {
      debouncedProducts.forEach((product) => {
        updateProductsAction(product);
      });
    } else {
      removeProductsAction(removeIDRef.current);
    }
  }, [debouncedProducts]);

  const filter = (type: string) => {
    return filteredType === "all" ? true : type === filteredType;
  };

  return (
    <div
      className="bg-[#fff4ef h-screen w-full overflow-x-hidden"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <AdminHeader
        onAddProduct={() => router.push("add-product")}
        onHistorico={() => router.replace("history")}
      />
      <main className="p-2">
        <CategoryCarousel
          selectedCategory={filteredType}
          setSelectedCategory={setFilteredType}
        />
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          {initialProducts
            .filter((product) => filter(product.type))
            .map((product) => (
              <Product
                key={product.uuid}
                product={product}
                setProducts={setInitialProducts}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
