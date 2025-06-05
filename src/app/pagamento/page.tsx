export default function Pagamento() {
    return(
        <div className="h-screen w-screen rounded-4xl bg-[#fff4ef] relative flex flex-col">
            <div className="h-16 w-full flex flex-row">
                
                <div className="h-full w-28 flex justify-center items-center">
                  <img src="/img/arrow-left.png" alt="Seta esquerda" className="h-full w-16 object-contain" />
                </div>

                <div className="h-full w-80 flex justify-center items-center ">
                  <img src="/img/Conpecome.png" alt="Conpecome" className="h-full w-5/6 object-contain"/>
                </div>

                <div className="h-18 w-28 absolute right-5 flex justify-center items-center">
                  <img src="/img/Conpec.png" alt="Logo" className="h-full w-3/4 object-contain" />
                </div>
            </div>

            <div className="h-44 w-full ">
                <div className="h-full w-full flex justify-center items-center">
                    <img src="/img/Pedido.png" alt="Pedido" className="h-full w-full object-contain" />
                </div>
            </div>

            <div className="h-20 w-full flex flex-row justify-center items-center gap-6">
              <div className="bg-white w-64 h-12 rounded-full border-[#FF5C01] border-2 shadow-md flex justify-center items-center">
                <h1 className="text-gray-600 font-bold text-sm"> código </h1>
              </div>
              <div className="bg-[#FF5C01] h-12 w-1/12 rounded-full flex justify-center items-center shadow-md"> 
                <h1 className="text-white font-semibold text-xl font-mono">Copiar</h1>
              </div>
            </div>
            
            <div className="bg-[#ff7c022e]  gap-1 h-1/2 w-full rounded-t-3xl flex flex-col items-center text-center">
              <h2 className="flex justify-between items-end h-12 w-1/4 text-[#FF9633] font-extrabold"> 
                <span> {} x {} </span>
                <span className="mr-12"> R${}</span>
              </h2>
              <h2 className="flex justify-between items-center  w-1/4 text-[#FF9633] font-extrabold"> 
                <span> {} x {} </span>
                <span className="mr-12"> R${}</span>
              </h2>
              <h2 className="flex justify-between items-center  w-1/4 text-[#FF9633] font-extrabold"> 
                <span> {} x {} </span>
                <span className="mr-12"> R${}</span>
              </h2>
              <h2 className="flex justify-between items-center h-1/2 w-1/4 text-[#FF9633] font-extrabold"> 
                <span> Total: </span>
                <span className="mr-12"> R${}</span>
              </h2>

              <div className="bg-[#FF5C01] h-12 w-1/12 rounded-full flex justify-center items-center shadow-md m-2"> 
                <h1 className="text-white font-semibold text-lg">Já paguei</h1>
              </div>
              
            </div>
        </div>
    )
}
