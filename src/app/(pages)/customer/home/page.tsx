"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryCarousel from "@/components/CategoryCarousel";
import MainHeader from "@/components/header/CustomerHeader";
import {
  getProducts,
} from "@/services/dataAcess/productService";
import type {
  ProductItem,
} from "@/services/dataAcess/productService";
import bg from "@/assets/images/background.png";
import { CartWindow } from "@/components/CartWindow";
import CartFooter from "@/components/footer/CartFooter";
import { Minus, Plus } from "lucide-react";

const formatToBRL = (cents: number) => {
  return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
};

export default function CustomerHome() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData] = await Promise.all([
          getProducts(),
        ]);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const clearCart = () => {
    setQuantities({});
    setCartTotal(0);
    setIsCartOpen(false);
  };

  const finishOrder = () => {
    if (cartTotal > 0) {
      localStorage.setItem("carrinho", JSON.stringify(cartItems));

      router.push("/customer/info");
    }
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));

    const product = products.find((p) => p.id === productId);
    if (product) {
      setCartTotal((prev) => Math.max(0, prev + delta * product.price));
    }
  };

  const cartItems = products
    .filter((product) => quantities[product.id] > 0)
    .map((product) => ({
      ...product,
      quantity: quantities[product.id],
    }));

  const filteredProducts = products.filter((p) => {
    const inStock = typeof p.stock === "number" && p.stock > 0;
    const inCategory =
      selectedCategory === "all" || p.type === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return inStock && inCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen w-screen bg-[#FFF5EF] flex items-center justify-center">
        <p className="text-[#f66c0e] text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-[#FFF5EF] bg-top bg-repeat"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <MainHeader
        showCart={true}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      >
        {isCartOpen && (
          <CartWindow
            cartItems={cartItems}
            cartTotal={cartTotal}
            formatToBRL={formatToBRL}
            clearCart={clearCart}
            finishOrder={finishOrder}
            closeCart={() => setIsCartOpen(false)}
          />
        )}
      </MainHeader>

      <main className="flex flex-col sm:items-start p-8 w-full">
        <CategoryCarousel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 text-[#FF9633] place-items-center gap-10 w-full px-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-80 bg-[#FFECE4] border border-[#FF9633] rounded-2xl p-6 flex flex-col items-center gap-2 justify-between"
            >
              <Image
                src={product.imageURL}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-contain"
              />
              <h3 className="text-xl font-semibold font-poppins">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </h3>
              <p className="font-semibold font-poppins">
                {formatToBRL(product.price)}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(product.id, -1)}
                  className="w-8 h-8 rounded-full cursor-pointer bg-[#FF9633] hover:bg-[#F54B00] hover:scale-95 transition-all text-white flex items-center justify-center text-2xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 font-semibold text-center">
                  {quantities[product.id] || 0}
                </span>
                {typeof product.stock === "number" &&
                (quantities[product.id] || 0) < product.stock ? (
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-8 h-8 rounded-full cursor-pointer hover:bg-[#F54B00] hover:scale-95 transition-all bg-[#FF9633] text-white flex items-center justify-center text-2xl"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                ) : (
                  <span
                    className="w-8 h-8 inline-block"
                    aria-hidden="true"
                  ></span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
          <div
            className={`transform transition-transform duration-300 ease-in-out ${
              isCartOpen ? "-translate-y-[425px]" : "translate-y-0"
            }`}
          >
            {isCartOpen && (
              <CartWindow
                cartItems={cartItems}
                cartTotal={cartTotal}
                formatToBRL={formatToBRL}
                clearCart={clearCart}
                finishOrder={finishOrder}
                closeCart={() => setIsCartOpen(false)}
              />
            )}
          </div>
          <CartFooter
            cartTotal={cartTotal}
            onClick={() => setIsCartOpen((prev) => !prev)}
          />
        </div>
      </main>
    </div>
  );
}
