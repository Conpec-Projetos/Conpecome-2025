"use client";

import { useRouter, useSearchParams } from "next/navigation";

import arrowLeft from "@/assets/images/arrow-left.png";
import Conpecome from "@/assets/images/CONPECOME.png";
import Conpec from "@/assets/images/Conpec.png";
import QRcode from "@/assets/images/QRcode.jpeg";
import copy from "@/assets/images/copiar-texto.png"
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/app/components/copyClipboard";

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/firebase-config";

import AuxHeader from "../../../components/ui/auxHeader"
import { doc, updateDoc, increment } from "firebase/firestore";

export default function Pagamento() {
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const CONPECPIX = "00020126460014br.gov.bcb.pix0124financeiro@conpec.com.br5204000053039865802BR5924Larissa Soares de Olivei6009Sao Paulo610901227-20062240520daqr160420115015069063045135";

  const nome = searchParams.get("nome") ?? "Visitante";
  const email = searchParams.get("email") ?? "não informado";

  type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };

  const [produtos, setProdutos] = useState<CartItem[]>([]);

  useEffect(() => {
    const carrinhoString = localStorage.getItem("carrinho");
    if (carrinhoString) {
      const carrinho: CartItem[] = JSON.parse(carrinhoString);
      setProdutos(carrinho);
    }
  }, []);

  const total = produtos.reduce(
    (soma: number, produto: { price: number; quantity: number }) => {
      return soma + produto.price * produto.quantity;
    },
    0
  );

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleFinalizarPedido = async () => {
    const dataHora = new Date().toLocaleDateString("pt-BR");

    try {
      for (const item of produtos) {
        const pedidoIndividual = {
          comprador: nome,
          email: email,
          dataHora: dataHora,
          nome: item.name,
          quantidade: item.quantity,
          preco: item.price,
        };
      await addDoc(collection(db, "purchases"), pedidoIndividual);    
      }

      for (const item of produtos) {
        const productRef = doc(db, "products", item.id);
        await updateDoc(productRef, {
          stock: increment(-item.quantity),
        });
      }
      
      router.push("/");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

  const copypix = () => {
    copyToClipboard(CONPECPIX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen w-screen rounded-4xl bg-[#fff4ef] relative flex flex-col gap-5">
      
      <AuxHeader />
      
      <div className="h-48 w-full">
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="text-5xl font-pixelify-sans text-[#FF3D00] flex flex-row justify-center py-1 text-center">
            Seu Pedido
          </div>
          <img
            src={QRcode.src}
            alt="Pedido"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="h-48 w-full flex flex-1 flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-0">
        <div className="bg-white w-full max-w-[32rem] h-12 rounded-full border-[#f66c0e] border-2 shadow-md flex justify-center items-center px-3">
          <h1 className="text-gray-600 font-bold text-xs select-none text-center leading-snug"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {CONPECPIX}
          </h1>
        </div>

        <button className="h-12 w-[8rem]  flex justify-around items-center botao-laranja" onClick={copypix}>
          <Copy className="h-4 w-4 ml-2 invert"/>
          <h1 className={`w-2/3 text-white text-xl font-Poppins font-bold mr-2 ${copied ? "text-emerald-100" : "text-white"}`}>
            {copied ? "Copiado!" : "Copiar"}
          </h1>
        </button>
      </div>

      <div className="bg-[#ff7c022e] gap-1 h-full w-full rounded-t-3xl flex flex-col items-center text-center pb-8 px-4">
        <div className="flex flex-col items-center justify-start mt-4 w-full max-w-[24rem]">
          <ul className="w-full h-full">
            {produtos.map((produto) => (
              <li
                key={produto.id}
                className="flex justify-between text-[#FF9633] text-lg font-extrabold w-full space-x-10"
              >
                <p className="w-1/3 text-center">
                  {produto.quantity}x {capitalize(produto.name)}
                </p>
                
                <p className="w-1/3 text-right">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(produto.price / 100)}
                </p>
              </li>
            ))}
          </ul>

            <div className="w-full h-[5px] bg-[#FF3D00] my-4" />

          <h2 className="flex justify-between items-center h-1/2 text-lg text-[#FF9633] font-extrabold relative w-full space-x-10">
            <span className="ml-1 w-1/3 text-center font-extrabold">Total:</span>
            <span className="w-1/3 text-right font-extrabold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total / 100)}
            </span>
          </h2>
        </div>

        

        <button
          onClick={handleFinalizarPedido}
          className="h-12 w-32 group  flex justify-center items-center  m-2 botao-laranja "
        >
          <span className="text-white font-Poppins font-bold text-lg block transition duration-[175ms] group-hover:scale-[1.05]">Já paguei </span>
          </button>
      </div>
    </div>
  );
}

