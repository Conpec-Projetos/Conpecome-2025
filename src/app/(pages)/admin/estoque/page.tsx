"use client";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-orange-500 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="flex flex-col gap-4">
          <button className="bg-slate-100" onClick={router.back}>VOLTAR</button>
          <button className="bg-slate-100" onClick={() => {router.push("./add-product");}}>ADICIONAR PRODUTOS</button>
            <button className="bg-slate-100" onClick={() => {router.push("./historico_pedidos");}}>HISTORICO DE PEDIDOS</button>

        </div>
        
    
      </main>
    </div>
  );
}
