"use client";
import CardAddProduct from "@/app/components/ui/card-add-product";
import AuxHeader from "@/app/components/ui/auxHeader";
import { addProductsAction } from "@/firebase/services/actions/productsAction";
import { LocalProduct, ProductType } from "@/interfaces/productsInterfaces";
import { useState, useEffect } from "react";

export default function AddProduct() {
  const [products, setProducts] = useState<LocalProduct[]>([
    {
      id: Date.now(),
      imageURL: "",
      name: "",
      price: 0,
      stock: 0,
      type: "",
    },
  ]);
  const [showConfirmPopUp, setShowConfirmPopUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        imageURL: "",
        name: "",
        price: 0,
        stock: 0,
        type: "",
      },
    ]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const updateProduct = (
    id: number,
    field: string,
    value: string | number | boolean | File | null
  ) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const allProductsValid = () => {
    return products.every(
      (product) =>
        product.name &&
        product.name.trim() !== "" &&
        product.price > 0 &&
        product.stock > 0 &&
        product.type &&
        product.type.trim() !== "" &&
        product.imageFile instanceof File
    );
  };

  const handleConfirmChanges = async () => {
    try {
      setIsSubmitting(true);
      for (const product of products) {
        const productData = {
          uuid: "", // Will be set by Firebase
          imageURL: product.imageURL,
          imageFile: product.imageFile,
          name: product.name,
          price: product.price,
          stock: product.stock,
          type: product.type,
        };
        await addProductsAction(productData as ProductType);
      }
      setShowConfirmPopUp(false);
      setProducts([
        {
          id: Date.now(),
          imageURL: "",
          name: "",
          price: 0,
          stock: 0,
          type: "",
        },
      ]);
      alert("Produtos adicionados com sucesso!");
    } catch (error) {
      console.error("Error adding products:", error);
      alert("Erro ao adicionar produtos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scrollbar visible
  const [scrollbarVisible, setScrollbarVisible] = useState(true);

  //Verify if the scrollbar is visible when adding or removing products
  useEffect(() => {
    const handleScroll = () => {
      setScrollbarVisible(
        window.innerWidth > document.documentElement.clientWidth
      );
    };

    window.addEventListener("resize", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [products]);

  /**
   * Get the width of the scrollbar in pixels.
   */
  const getScrollbarWidth = () => {
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    outer.style.position = "absolute";
    outer.style.top = "-9999px";
    outer.style.width = "100px";
    document.body.appendChild(outer);

    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.remove();

    return scrollbarWidth;
  };

  return (
    <div
      className="bg-[#FFF4EF] w-full min-h-screen flex flex-col pl-10 pb-6 overflow-x-hidden"
      style={{ paddingRight: scrollbarVisible ? 0 : getScrollbarWidth() }}
    >
      <div>
        <AuxHeader />
        <div className="text-4xl font-bold text-[#f66c0e] text-center mb-8 font-pixelify-sans">
          Adicionar Produto
        </div>
        <div className="flex flex-col gap-4 items-center">
          {products.map((product) => (
            <CardAddProduct
              key={product.id}
              product={product}
              onUpdate={updateProduct}
              onDelete={() => removeProduct(product.id)}
              disableDelete={products.length === 1}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto flex justify-center">
        <div className="text-white py-4 px-6 flex items-center justify-between w-full max-w-sm">
          <button
            onClick={() => allProductsValid() && setShowConfirmPopUp(true)}
            disabled={!allProductsValid()}
            className={`bg-[#f66c0e] ${
              !allProductsValid()
                ? "bg-[#8A8A8A] cursor-not-allowed transition-colors"
                : "hover:bg-[#FF3D00] hover:scale-95 transition-all"
            } font-poppins font-bold rounded-full px-14 py-3`}
          >
            Confirmar Alterações
          </button>
          <button
            onClick={addProduct}
            className=" hover:scale-95 botao-laranja w-12 h-12 flex items-center justify-center text-2xl"
          >
            +
          </button>
        </div>
      </div>
      {showConfirmPopUp && (
        <div className="font-poppins font-bold fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-[#f66c0e] bg-opacity-30"
            onClick={() => setShowConfirmPopUp(true)}
          />
          <div className="border border-white bg-[#FFAA54] rounded-xl w-80 text-center text-white relative z-10">
            <div className="text-2xl px-6 pt-6 pb-4 border-b border-white">
              Tem certeza que deseja confirmar as alterações?
            </div>
            <div className="text-lg flex items-stretch h-10">
              <div className="flex-1 border-r border-white">
                <button
                  onClick={handleConfirmChanges}
                  disabled={isSubmitting}
                  className={`rounded-bl-xl w-full h-10 text-white
                              ${
                                isSubmitting
                                  ? "bg-[#8A8A8A] cursor-not-allowed transition-colors"
                                  : "hover:bg-white hover:text-[#FFAA54]"
                              } 
                              transition-colors`}
                >
                  Sim, confirmar
                </button>
              </div>
              <div className="flex-1">
                <button
                  onClick={() => setShowConfirmPopUp(false)}
                  disabled={isSubmitting}
                  className="rounded-br-xl w-full h-10 text-white hover:bg-white hover:text-[#FFAA54] transition-colors"
                >
                  Não, voltar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
