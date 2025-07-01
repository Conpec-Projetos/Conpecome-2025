'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts, getProductTypes } from "../../../../services/dataAcess/productService";
import type { ProductItem, ProductType } from "../../../../services/dataAcess/productService";
import logoConpec from "../../../../assets/images/logo-conpec.svg";
import todosIcon from "../../../../assets/images/product_types/todos.png";
import searchIcon from "../../../../assets/images/search.png";
import cartIcon from "../../../../assets/images/shopping_cart.png";
import MainHeader from "@/app/components/ui/main_header";

// Helper to get category icon
const getCategoryIcon = (type: ProductType): string => {
  return type.imgUrl || todosIcon.src;
};

const formatToBRL = (cents: number) => {
  return `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`;
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});  // Changed from number to string
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, typesData] = await Promise.all([
          getProducts(),
          getProductTypes()
        ]);
        setProducts(productsData);
        setProductTypes(typesData);
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

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));

    // Update cart total when quantity changes
    const product = products.find(p => p.id === productId);
    if (product) {
      setCartTotal(prev => Math.max(0, prev + (delta * product.price)));
    }
  };

  const cartItems = products
    .filter(product => quantities[product.id] > 0)
    .map(product => ({
      ...product,
      quantity: quantities[product.id]
    }));

  // Filter products based on selected category, stock > 0, and search term
  const filteredProducts = products.filter(p => {
    const inStock = typeof p.stock === 'number' && p.stock > 0;
    const inCategory = selectedCategory === "all" || p.type === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return inStock && inCategory && matchesSearch;
  });

  if (loading) {
    return <div className="min-h-screen w-screen bg-[#FFF5EF] flex items-center justify-center">
      <p className="text-[#FF3D00] text-xl">Carregando...</p>
    </div>;
  }

  return (
    <div className="min-h-screen w-screen bg-[#FFF5EF] bg-[url('/background.png')] bg-top bg-repeat">
      <MainHeader
        showCart={true}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      >
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
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#FFE8DE]">
                        <div className="flex items-center gap-2">
                          <Image
                            src={
                              item.imageURL?.startsWith('http') || item.imageURL?.startsWith('data:image/')
                                ? item.imageURL
                                : item.imageURL
                                  ? `/${item.imageURL.replace(/^\/+/, '')}`
                                  : '/placeholder.png'
                            }
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
      </MainHeader>

      <main className="flex flex-col sm:items-start p-8">
        {/* Category filters */}
        <div className="flex gap-4 w-full overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`text-[#F54B00] flex flex-col items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#F54B00] ${
              selectedCategory === "all" ? "bg-[#FFECE4]" : "bg-white"
            }`}
          >
            <Image
              src={todosIcon.src}
              alt="Todos"
              width={52}
              height={52}
            />
            <span>Todos</span>
          </button>
          {productTypes && productTypes.length > 0 && productTypes.map((type) => {
            return (
              <button
                key={type.name}
                onClick={() => setSelectedCategory(type.name)}
                className={`text-[#F54B00] flex flex-col items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#F54B00] ${
                  selectedCategory === type.name ? "bg-[#FFECE4]" : "bg-white"
                }`}
              >
                <Image
                  src={getCategoryIcon(type)}
                  alt={type.name}
                  width={52}
                  height={52}
                  unoptimized
                />
                <span>{type.displayName}</span>
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        
        <div className="grid grid-cols-3 text-[#FF9633] place-items-center gap-10 w-full px-8">
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
                {/* Only show + button if quantity is less than stock; otherwise, render a placeholder for alignment */}
                {typeof product.stock === 'number' && (quantities[product.id] || 0) < product.stock ? (
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-8 h-8 rounded-full bg-[#FF9633] text-white flex items-center justify-center text-2xl"
                  >
                    +
                  </button>
                ) : (
                  <span className="w-8 h-8 inline-block" aria-hidden="true"></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
