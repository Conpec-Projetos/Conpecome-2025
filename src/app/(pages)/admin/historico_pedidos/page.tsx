'use client'
import { useEffect, useState } from 'react';
import { db } from "@/firebase/firebase-config"
import { collection, getDocs } from "firebase/firestore"
import AuxHeader from "@/app/components/ui/auxHeader"
import { Download, Search } from "lucide-react"

interface pedido {
  id: string;
  comprador: string;
  nome: string;
  preco: number;
  quantidade: number;
  dataHora: string;
  email: string;
}

interface Item {
  cliente: string;
  produto: string;
  valor: number;
}

function getMonthName(monthNumber: number): string {
  // monthNumber: 1–12
  const date = new Date(2000, monthNumber - 1); // JS months are 0-based
  return date.toLocaleString('pt-BR', { month: 'long' });
}

export default function HistoricoPedidos() {

  const [Pedidos, setPedidos] = useState<pedido[]>([]);
  const [mesesDict, setMesesDict] = useState<Record<string, Item[]>>({});

  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const getPedidos = async () => {
      const data = await getDocs(collection(db, "purchases"));
      console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      setPedidos(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as pedido[]);
    }
    getPedidos();
  },[])

  useEffect(() => {
    // Agrupa os pedidos por mês e ano
    const meses: Record<string, Item[]> = {};
    Pedidos
    .filter(pedido => (
      pedido.comprador.toLowerCase().includes(search.trim().toLowerCase()) // Filtra por cliente
    ))
    .forEach(pedido => {
      const [, mes, ano] = pedido.dataHora.split('/');
      const mesAno = `${ano}/${mes}`; // Formato: "YYYY/MM"
      if (!meses[mesAno]) {
        meses[mesAno] = [];
      }
      meses[mesAno].push({
        cliente: pedido.comprador,
        produto: pedido.nome, 
        valor: pedido.preco * pedido.quantidade,
      } as Item);
    });
    console.log(meses);
    setMesesDict(meses);
  }, [Pedidos, search]);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "dataHora,comprador,email,nome,quantidade,preco individual\n" +
      Pedidos.slice()
      .sort((a, b) => {
        // Convert dd/mm/yyyy to Date objects for comparison
        const [da, ma, ya] = a.dataHora.split('/');
        const [db, mb, yb] = b.dataHora.split('/');
        const dateA = new Date(+ya, +ma - 1, +da);
        const dateB = new Date(+yb, +mb - 1, +db);
        return dateB.getTime() - dateA.getTime(); // Newest first
      })
      .map(pedido =>
        `"${pedido.dataHora}","${pedido.comprador}","${pedido.email}","${pedido.nome}","${pedido.quantidade}","${pedido.preco}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "order_history.csv");
    document.body.appendChild(link);
    link.click();
  };



  return (
    <div className="bg-[#FFF4EF] min-h-screen w-full flex flex-col">

      <AuxHeader />

      <main className="flex flex-col items-center justify-start ">
        <div className="w-full">
          <div className="text-5xl font-pixelify-sans text-[#FF3D00] flex flex-row justify-center py-1 text-center">
            Histórico de Pedidos
          </div>

            <div className="relative flex items-center pl-2 pr-20 sm:pl-[5rem] w-full">
              <Search className="absolute left-[1.3rem] sm:left-[5.8rem] top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                className="default-input placeholder-gray-400 max-w-md pl-14 text-[15px]"
                placeholder="Cliente"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              />
            </div>

        </div>
          
        
        <div className="w-4/5 h-full px-0 md:px-16 py-12  flex-1 flex flex-col justify-start ">
          {mesesDict && Object.keys(mesesDict).length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-2xl font-Poppins font-bold text-[#FF9633] text-center">
              Nenhum pedido encontrado.
              </div>
            </div>
          ) : (
            <div className="w-full h-full max-w-4xl flex flex-col justify-start">
              {
              Object.keys(mesesDict)
                .sort((a, b) => b.localeCompare(a)) // Ordena descendente
                .map((mesAno, index) => {
                const [ano, mesNum] = mesAno.split("/");
                const mesNome = getMonthName(parseInt(mesNum) + 1);
                const items = mesesDict[mesAno]

                const total = items.reduce((sum, item) => sum + ((item.valor)/100), 0);

                return (
                  <div key={index}>
                  
                    <h3 className="text-2xl font-Poppins font-bold text-[#FF9633] uppercase py-6">
                      {mesNome.toLocaleUpperCase()} – {ano}
                    </h3>

                    <div className="pr-6 md:px-10 space-y-2">
                      {items.map((item, i) => (
                      <div key={i} className="flex flex-row justify-between font-Poppins font-bold text-xl md:text-2xl space-x-1">
                        <span className="text-[#FF9633] w-2/6">{item.cliente}</span>
                        <span className="text-[#FF9633] text-center w-1/2">{item.produto}</span>
                        <span className="text-[#FF9633] w-1/6">R${(item.valor/100).toFixed(2)}</span>
                      </div>
                      ))}

                      <div className="grid grid-cols-[1fr_1fr_auto] font-Poppins font-extrabold text-[#FF9633] text-2xl ">
                      <span>Total</span><span></span>
                      <span>R${total.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                );
                })
              }
            </div>
          )}
        </div>

        <div className="fixed bottom-8 right-8 z-50">
          <button className="botao-laranja flex flex-col items-center justify-center w-20 h-20 rounded-full shadow-lg"
            onClick={downloadCSV}>
            <Download className="text-white" size={60} />
          </button>
        </div>

      </main>

    </div>
  );
}
