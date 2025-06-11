export default function Pagamento() {
  type Produtos = {
    id: number;
    qtd: number;
    nome: string;
    valor: number;
  };

  const produtos: Produtos[] = [
    { id: 0, qtd: 1, nome: "Paçoquinha", valor: 0.85},
    { id: 1, qtd: 1, nome: "Sonho de Valsa", valor: 1.50},
    { id: 2, qtd: 1, nome: "Toddynho", valor: 0.89},
    { id: 3, qtd: 1, nome: "KitKat", valor: 1.20}
  ]
    
  const total: number = produtos.reduce((soma, produto) => {
    return soma + produto.qtd * produto.valor;
  }, 0);

    return(
        <div className="h-screen w-screen rounded-4xl bg-[#fff4ef] relative flex flex-col gap-5">
            <div className="h-20 w-full flex flex-row justify-between">
                
                <button className="h-full w-28 flex justify-center items-center">
                  <img src="/img/arrow-left.png" alt="Seta esquerda" className="h-full w-16 object-contain" />
                </button>

                <div className="h-20 w-72 flex justify-center items-center ">
                  <img src="/img/Conpecome.png" alt="Conpecome" className="h-full w-5/6 object-contain"/>
                </div>

                <div className="h-18 w-28 flex justify-center items-center">
                  <img src="/img/Conpec.png" alt="Logo" className="h-5/6 w-3/4 object-contain" />
                </div>
            </div>

            <div className="h-48 w-full ">
                <div className="h-full w-full flex justify-center items-center">
                    <img src="/img/Pedido.png" alt="Pedido" className="h-full w-full object-contain" />
                </div>
            </div>

            <div className="h-48 w-full flex flex-row justify-center items-center gap-6">
              <button className="bg-white w-64 h-12 rounded-full border-[#FF5C01] border-2 shadow-md flex justify-center items-center">
                <h1 className="text-gray-600 font-bold text-sm"> código </h1>
              </button>
              <button className="bg-[#FF5C01] h-12 w-1/12 rounded-full flex justify-center items-center shadow-md hover:bg-[#F66C0E]"> 
                <h1 className="text-white  text-xl font-Poppins font-bold">Copiar</h1>
              </button>
            </div>
            
            <div className="bg-[#ff7c022e]  gap-1 h-full w-full rounded-t-3xl flex flex-col items-center text-center">
              <h2 className="flex justify-between items-end h-4 w-1/4 text-[#FF9633] font-extrabold"> </h2>
                <ul className="">
                  {produtos.map((produto) => (
                    <li key={produto.id} className="flex justify-between text-[#FF9633] text-lg font-extrabold gap-32">
                      <p>{produto.qtd}x {produto.nome}</p> <p>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(produto.valor)}</p>
                      

                    </li>
                  )
                  )}
                </ul>

              
              <h2 className="flex justify-between items-center h-1/2 text-lg w-[385px] text-[#FF9633] font-extrabold relative"> 
                <span className="ml-1"> Total: </span>
                <span className="flex items-end"> {new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(total)}</span>
              </h2>

              <button className="bg-[#FF5C01] h-16 w-32 rounded-full flex justify-center items-center shadow-md m-2 hover:bg-[#F66C0E]"> 
                <h1 className="text-white font-Poppins font-bold text-md">Já paguei</h1>
              </button>
              
            </div>
        </div>
    )
}
