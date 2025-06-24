"use client";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-orange-500 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <div className="text-5xl">
          CONPEC 🦣 
        </div>

        <div className="flex flex-col gap-4 justify-items-center">
          <button className="bg-slate-100" onClick={() => {router.push("admin/login");}}>ADM</button>
          <button className="bg-slate-100" onClick={() => {router.push("customer/carrossel");}}>CUSTOMER</button>
        </div>
        
    
      </main>
    </div>
  );
}
