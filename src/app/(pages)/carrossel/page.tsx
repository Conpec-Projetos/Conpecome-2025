'use client'
import Image from "next/image";
import products from "./products.json";
import productTypes from "./product_types.json";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: string;
  imgUrl: string;
}

const formatToBRL = (cents: number) => {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cartTotal, setCartTotal] = useState(0); // Value in cents

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));

    // Update cart total when quantity changes
    const product = products.products.find(p => p.id === productId);
    if (product) {
      setCartTotal(prev => Math.max(0, prev + (delta * product.price)));
    }
  };

  const filteredProducts = selectedCategory === "all"
    ? products.products
    : products.products.filter(p => p.category_id === selectedCategory);

  return (
    <div className="min-h-screen w-screen bg-[#FFF5EF] bg-[url('/assets/background.png')] bg-center bg-repeat">
      {/* navbar */}
      <header className="flex items-center justify-between px-4 py-6 bg-[#FFE8DE] rounded-b-3xl">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo-conpec.svg"
            alt="Conpec Logo"
            width={40}
            height={40}
          />
          <a href="/">
            <div className="flex flex-col">
              <h1 className="font-pixelify-sans text-4xl text-[#FF3D00]">
                CONPECOME
              </h1>
              <p className="text-sm text-[#FF3D00]">Já pode aomossar?</p>
            </div>
          </a>
        </div>
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 text-black"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src="/carrossel/assets/search.png"
                alt="Search"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className="shadow-md flex items-center gap-2 bg-[#FFD8B6] border border-[#F54B00] px-4 py-2 rounded-full text-[#F54B00]">
          <Image
            src="/carrossel/assets/shopping_cart.png"
            alt="Shopping Cart"
            width={24}
            height={24}
          />
          <span id="cart_total">{formatToBRL(cartTotal)}</span>
        </div>
      </header>

      <main className="flex flex-col gap-8 items-center sm:items-start p-8">
        {/* Category filters */}
        <div className="flex gap-4 w-full overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl ${selectedCategory === "all"
              ? "bg-[#FF3D00] text-white"
              : "bg-[#FFE8DE] text-[#FF3D00]"
              }`}
          >
            <Image
              src="/carrossel/assets/todos.png"
              alt="Todos"
              width={24}
              height={24}
            />
            Todos
          </button>
          {productTypes.product_types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id.toString())}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl ${selectedCategory === type.id.toString()
                ? "bg-[#FF3D00] text-white"
                : "bg-[#FFE8DE] text-[#FF3D00]"
                }`}
            >
              <Image
                src={`/carrossel/assets/${type.name}.png`}
                alt={type.name}
                width={24}
                height={24}
              />
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-3  gap-6 w-full">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[FFECE4] rounded-2xl p-6 flex flex-col items-center gap-2 shadow-md"
            >
              <Image
                src={`/carrossel/${product.imgUrl}`}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-contain"
              />
              <h3 className="text-xl text-[#FF3D00] font-semibold">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
              <p className="text-[#FF3D00] font-semibold">
                R$ {(product.price / 100).toFixed(2)}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-8 h-8 rounded-full bg-[#FFE8DE] text-[#FF3D00] flex items-center justify-center text-2xl"
                >
                  -
                </button>
                <span className="w-8 text-[#FF3D00] font-semibold text-center">
                  {quantities[product.id] || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-8 h-8 rounded-full bg-[#FFE8DE] text-[#FF3D00] flex items-center justify-center text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
