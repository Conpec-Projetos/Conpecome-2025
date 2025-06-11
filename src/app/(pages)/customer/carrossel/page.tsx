'use client'
import Image from "next/image";
import products from "./products.json";
import productTypes from "./product_types.json";
import { useState } from "react";
import { useRouter } from "next/navigation";


const formatToBRL = (cents: number) => {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
};

export default function Home() {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const clearCart = () => {
    setQuantities({});
    setCartTotal(0);
    setIsCartOpen(false);
  };

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

  const cartItems = products.products
    .filter(product => quantities[product.id] > 0)
    .map(product => ({
      ...product,
      quantity: quantities[product.id]
    }));

  const filteredProducts = selectedCategory === "all"
    ? products.products
    : products.products.filter(p => p.category_id === selectedCategory);

  return (
    <div className="min-h-screen w-screen bg-[#FFF5EF] bg-[url('/assets/background.png')] bg-top bg-repeat">
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
            <div className="flex flex-col font-bold">
              <h1 className="font-pixelify-sans text-5xl text-[#FF3D00]">
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

        <div className="shadow-md flex items-center gap-2 bg-[#FFD8B6] border border-[#F54B00] px-6 py-3 rounded-3xl text-[#F54B00] cursor-pointer relative"
          onClick={() => setIsCartOpen(!isCartOpen)}>
          <Image
            src="/carrossel/assets/shopping_cart.png"
            alt="Shopping Cart"
            width={40}
            height={40}
          />
          <span id="cart_total">{formatToBRL(cartTotal)}</span>

          {/* Cart Window */}
          {isCartOpen && (
            <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-[#FF9633] rounded-2xl shadow-lg z-50 p-4">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-[#FF3D00] border-b border-[#FF9633] pb-2">
                  Carrinho
                </h3>

                {cartItems.length === 0 ? (
                  <p className="text-center text-[#FF3D00] py-4">Seu carrinho está vazio</p>
                ) : (
                  <>
                    <div className="max-h-64 overflow-y-auto">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#FFE8DE]">
                          <div className="flex items-center gap-2">
                            <Image
                              src={`/carrossel/assets/${item.imgUrl}`}
                              alt={item.name}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                            <div>
                              <p className="font-semibold text-[#FF3D00]">
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
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
                        <span className="font-bold text-[#FF3D00]">{formatToBRL(cartTotal)}</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={clearCart}
                          className="flex-1 py-2 px-4 bg-white border border-[#FF3D00] text-[#FF3D00] rounded-full hover:bg-[#FFE8DE] transition-colors"
                        >
                          Limpar
                        </button>
                        <button
                          className="flex-1 py-2 px-4 bg-[#FF3D00] text-white rounded-full hover:bg-[#FF9633] transition-colors"
                          onClick={() => {router.push("./info");}}
                        >
                          Finalizar Pedido
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex flex-col sm:items-start p-8">
        {/* Category filters */}
        <div className="flex gap-4 w-full overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`text-[#F54B00] flex flex-col items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#F54B00] ${selectedCategory === "all"
              ? "bg-[#FFECE4]"
              : "bg-white"
              }`}
          >
            <Image
              src="/carrossel/assets/todos.png"
              alt="Todos"
              width={52}
              height={52}
            />
            <span>Todos</span>
          </button>
          {productTypes.product_types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedCategory(type.id.toString())}
              className={`text-[#F54B00] flex flex-col items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#F54B00] ${selectedCategory === type.id.toString()
                ? "bg-[#FFECE4]"
                : "bg-white"
                }`}
            >
              <Image
                src={`/carrossel/assets/${type.name}.png`}
                alt={type.name}
                width={52}
                height={52}
              />
              <span>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</span>
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-3 text-[#FF9633] place-items-center gap-10 w-full px-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-80 bg-[#FFECE4] border border-[#FF9633] rounded-2xl p-6 flex flex-col items-center gap-2 justify-between"
            >
              <Image
                src={`/carrossel/assets/${product.imgUrl}`}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-contain"
              />
              <h3 className="text-xl font-semibold">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
              <p className="font-semibold">
                {formatToBRL(product.price)}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-8 h-8 rounded-full bg-[#FF9633] text-white flex items-center justify-center text-2xl"
                >
                  -
                </button>
                <span className="w-8 font-semibold text-center">
                  {quantities[product.id] || 0}
                </span>
                <button
                  onClick={() => handleQuantityChange(product.id, 1)}
                  className="w-8 h-8 rounded-full bg-[#FF9633] text-white flex items-center justify-center text-2xl"
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
