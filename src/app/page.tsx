import Image from "next/image";

export default function Home() {
  let lista = Array.from({ length: 25 }, (_, i) => (i + 1) ** 2);

  return (
    <div className="bg-orange-500 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-5xl">
          CONPEC 🦣 ?
        </div>



        
        {lista.map((item, index) => {
          return <ul key={index}>{item}</ul>
        })}  
        
      </main>
    </div>
  );
}
