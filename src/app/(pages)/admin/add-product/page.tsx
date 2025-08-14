"use client";
import CardAddProduct from "@/components/card-add-product";
import AuxHeader from "@/components/header/auxHeader";
import { Button } from "@/components/ui/button";
import { addProductsAction } from "@/firebase/services/actions/productsAction";
import { LocalProduct, ProductType } from "@/interfaces/productsInterfaces";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  const router = useRouter();

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
          uuid: "",
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
      toast.success("Produtos adicionados com sucesso!");
      setTimeout(() => {
        router.push("/admin/estoque");
      }, 1500);
    } catch (error) {
      console.error("Error adding products:", error);
      alert("Erro ao adicionar produtos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [scrollbarVisible, setScrollbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollbarVisible(
        window.innerWidth > document.documentElement.clientWidth
      );
    };

    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [products]);

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
      className="bg-[#FFF4EF] w-full min-h-screen flex flex-col"
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
        <div className="text-white flex py-2 px-4 items-center justify-between gap-2 w-full sm:max-w-sm">
          <button
            onClick={() => allProductsValid() && setShowConfirmPopUp(true)}
            disabled={!allProductsValid()}
            className={`bg-[#f66c0e] ${
              !allProductsValid()
                ? "bg-[#8A8A8A] cursor-not-allowed transition-colors"
                : "hover:bg-[#FF3D00] hover:scale-95 transition-all"
            } font-poppins font-bold rounded-full px-10 py-3`}
          >
            Confirmar Alterações
          </button>
          <Button onClick={addProduct} size={"icon"} variant={"conpec"}>
            <Plus className="text-white" size={40} />
          </Button>
        </div>
      </div>

      {showConfirmPopUp && (
        <div className="font-poppins font-bold fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-conpec-tertiary opacity-60"
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
