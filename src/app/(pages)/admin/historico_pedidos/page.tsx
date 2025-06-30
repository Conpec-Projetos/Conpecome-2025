'use client'
import Image from "next/image"
import lupa from "../../../../assets/images/lupa-conpecome.png"
import adicionar from "../../../../assets/images/Adicionar.png"
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from "next/navigation"
import { db } from "@/firebase/firebase-config"
import { collection, getDocs } from "firebase/firestore"
import Header from "@/app/components/ui/header"
import TextField from "@/app/components/text-field"

interface pedido {
  id: string;
  comprador: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Item {
  cliente: string;
  produto: string;
  valor: number;
}
interface Mes {
  label: string;
  ano: number;
  itens: Item[];
}

export default function HistoricoPedidos() {

  const [Pedidos, setPedidos] = useState<pedido[]>([]);

  const HistoricoCollectionRef = collection(db, "purchases");
  
  useEffect(() => {
    const getPedidos = async () => {
      const data = await getDocs(HistoricoCollectionRef);
      console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      setPedidos(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as pedido[]);
    }
    getPedidos();
  },[])

  const totalGeralPedidos = useMemo(() => {
      return Pedidos.reduce((acumulador, pedido) => acumulador + pedido.preco, 0);
    }, [Pedidos]);

  const router = useRouter();
  // dados iniciais
  const [meses] = useState<Mes[]>([
    {
      label: 'Fevereiro',
      ano: 2025,
      itens: [
        
        { cliente: 'João',  produto: 'Sonho de Valsa', valor: 1.50 },
        { cliente: 'João',  produto: 'Toddynho',       valor: 0.89 },
        { cliente: 'Maria', produto: 'KitKat',         valor: 1.20 },
      ],
    },
    {
      label: 'Janeiro',
      ano: 2025,
      itens: [
        { cliente: 'Maria', produto: 'KitKat',   valor: 1.20 },
        { cliente: 'João',  produto: 'Toddynho', valor: 0.89 },
      ],
    },
  ]);

  const [search, setSearch] = useState('');

  // filtra itens pelo nome do cliente
  const mesesFiltrados = meses.map(m => ({
    ...m,
    itens: m.itens.filter(it =>
      it.cliente.toLowerCase().includes(search.trim().toLowerCase())
    )
  })).filter(m => m.itens.length > 0);

  return (
    <main className="bg-[#FFF4EF] min-h-screen w-full">

      <Header />

      <div>

        <div className="text-5xl font-pixelify text-[#FF3D00] flex flex-row justify-center py-1">
        Histórico de Pedidos
        </div>

        <div className="flex items-center left-40 absolute w-1/4 max-w-md">
            <TextField 
              placeholder="Cliente"
              className="placeholder-gray-400 w-full pl-14 text-[15px]"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Image
                src={lupa}
                alt="lupa"
                width={40}
                height={40}
              />
            </div>
          </div>

      </div>
        
      
      <div className="w-3/5 px-20 py-12">
        {mesesFiltrados.map((mes, i) => {
          const total = mes.itens.reduce((sum, it) => sum + it.valor, 0);

          return (
            <div key={i}>
              {/* cabeçalho do mês */}
              <h3 className="text-2xl font-Poppins font-bold text-[#FF9633] uppercase py-6">
                {mes.label} – {mes.ano}
              </h3>

              {/* grid de itens */}
              <div className="px-10 space-y-2">
                {Pedidos.map((pedido) => (
                  <div key={pedido.id}
                       className="flex flex-row justify-between font-Poppins font-bold text-2xl">
                    <span className="text-[#FF9633]">{pedido.comprador}</span>
                    <span className="text-[#FF9633]">{pedido.nome}</span>
                    <span className="text-[#FF9633]">R${pedido.preco.toFixed(2)}</span>
                  </div>
                ))}

                {/* total do mês */}
                <div className="grid grid-cols-[1fr_1fr_auto] font-Poppins font-extrabold text-[#FF9633] text-2xl ">
                  <span>Total</span><span></span>
                  <span>R${totalGeralPedidos.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section >
        <div className="flex justify-end px-12">
          <button>
            <Image 
              src={adicionar}
              alt="adicionar"
              className="py-16"
              width={80}
              height={80}
            />
          </button>
        </div>
      </section>
    </main>
  );
}