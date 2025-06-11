'use client'; 
import Image, { StaticImageData } from 'next/image';
import Logo from '@/app/assets/Conpec.png'
import Seta from '@/app/assets/Vector.png'
import Relogio from '@/app/assets/Group.png'
import BotaoAdicionar from '@/app/assets/Add.png'
import BotaoSair from '@/app/assets/Sair.png'
import IconTodos from '@/app/assets/IconTodos.png'
import IconDoces from '@/app/assets/IconDoces.png'
import IconBebidas from '@/app/assets/IconBebidas.png'
import IconSalgados from '@/app/assets/streamline-emojis_pizza-2.png'
import FoodButton from '@/app/components/foodbutton'
import Sanduiche from '@/app/assets/sanduiche.png'
import Product from '@/app/components/product'

export default function Estoque_ADM() {
  
  const handleBotaoClick = (id: string) => {

  }

  interface Product {
    id: string;
    nome: string;
    preco: number;
    tipo: string;
    imagem: StaticImageData
    quantidade: number
  }

  const estoqueInicial: Product[] = [
    {
      id: '1',
      nome: 'Coxinha',
      preco: 5.5,
      tipo: 'salgado',
      imagem: Sanduiche,
      quantidade: 10
    }
  ]

  return (
    <main className='bg-[#fff4ef] h-screen w-screen'>
     <header className='rounded-2xl h-[151px] w-screen bg-[#FFE8D7] flex flex-row items-center'>
        <Image src={Logo} alt='Logo' width={65} height={63} unoptimized={true}/>

        <div className='flex flex-col m-5'>
          <h1 className='text-6xl text-[#FF3D00] font-pixelify-sans font-bold'>CONPECOME</h1>
          <div className='text-[#FF3D00] font-poppins font-bold'>Já pode aomossar?</div>
        </div>

        <div className='h-full w-3/6 flex items-center pt-14 ml-10 justify-around'>
          <button className=' w-[235px] font-poppins underline text-[#FF7D02] justify-between font-bold flex flex-row'>
            Adicionar Novo Produto <Image src={Seta} alt='' width={25} height={20}/>
          </button>

          <button className='w-52 font-poppins underline text-[#FF7D02] justify-between font-bold flex flex-row'>
            Histórico de pedidos <Image src={Relogio} alt='' width={25} height={20} objectFit='contain'/>
            </button>
        </div>

        <div className='h-full w-2/3 flex items-center justify-end pr-16 space-x-10'>
          <button>
          <Image src={BotaoAdicionar} alt='Botão para Adicionar' width={90} height={96} unoptimized={true}/>
          </button>

          <button>
          <Image src={BotaoSair} alt='Botão para Sair' width={90} height={96} unoptimized={true}/>
          </button>
        </div>

    </header>

    <div className='h-1/6 mb-6 mt-6 ml-36 flex flex-row space-x-2'>
      <FoodButton image={IconTodos} id='Todos' onClick={handleBotaoClick}></FoodButton>
      <FoodButton image={IconSalgados} id='Salgados' onClick={handleBotaoClick}></FoodButton>
      <FoodButton image={IconDoces} id='Doces' onClick={handleBotaoClick}></FoodButton>
      <FoodButton image={IconBebidas} id='Bebidas' onClick={handleBotaoClick}></FoodButton>
    </div>

    <div className='w-2/5 ml-36'>
      <Product product={estoqueInicial[0]}></Product>
    </div>

    </main>
  );
}
