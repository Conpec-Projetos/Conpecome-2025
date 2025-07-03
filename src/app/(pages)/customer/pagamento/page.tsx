"use client";

import { useRouter, useSearchParams } from "next/navigation";

import arrowLeft from "@/assets/images/arrow-left.png";
import Conpecome from "@/assets/images/CONPECOME.png";
import Conpec from "@/assets/images/Conpec.png";
import pedido from "@/assets/images/Pedido.png";
import copy from "@/assets/images/copiar-texto.png"

import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/firebase-config";

import Header from "../../../components/ui/header"

export default function Pagamento() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    const dataHora = new Date().toLocaleDateString("pt-BR");;

    try {
      for (const item of produtos) {
        const pedidoIndividual = {
          comprador: nome,
          email: email,
          dataHora: dataHora,
          nome: item.name,
          quantidade: item.quantity,
          preco: item.price / 100,
        };
      await addDoc(collection(db, "purchases"), pedidoIndividual);    
    }
      
      router.push("/");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

  return (
    <div className="h-screen w-screen rounded-4xl bg-[#fff4ef] relative flex flex-col gap-5">
      
      <Header />
      
      <div className="h-48 w-full">
        <div className="h-full w-full flex justify-center items-center">
          <img
            src={pedido.src}
            alt="Pedido"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <div className="h-48 w-full flex flex-row justify-center items-center gap-6">
        <button className="bg-white w-64 h-12 rounded-full border-[#f66c0e] border-2 shadow-md flex justify-center items-center">
          <h1 className="text-gray-600 font-bold text-sm">código</h1>
        </button>

        <button className="h-12 w-1/12  flex justify-around items-center botao-laranja">
          <img src={copy.src} alt="copy" className="h-4 w-4 ml-2 invert"/>
          <h1 className="text-white text-xl font-Poppins font-bold mr-2">Copiar</h1>
        </button>
      </div>

      <div className="bg-[#ff7c022e] gap-1 h-full w-full rounded-t-3xl flex flex-col items-center text-center">
        <h2 className="flex justify-between items-end h-4 w-1/4 text-[#FF9633] font-extrabold"></h2>

        <ul>
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="flex justify-between text-[#FF9633] text-lg font-extrabold gap-32"
            >
              <p>
                {produto.quantity}x {capitalize(produto.name)}
              </p>
              <p>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.price / 100)}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="flex justify-between items-center h-1/2 text-lg w-[385px] text-[#FF9633] font-extrabold relative">
          <span className="ml-1">Total:</span>
          <span className="flex items-end">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(total / 100)}
          </span>
        </h2>

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
