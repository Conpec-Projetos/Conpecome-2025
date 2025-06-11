'use client'; 
import Image, { StaticImageData } from 'next/image'
import { useState } from 'react';

import Logo from '@/app/assets/Conpec.png'
import Seta from '@/app/assets/Vector.png'
import Relogio from '@/app/assets/Group.png'
import BotaoAdicionar from '@/app/assets/Add.png'
import BotaoSair from '@/app/assets/Sair.png'
import IconTodos from '@/app/assets/IconTodos.png'
import IconDoces from '@/app/assets/IconDoces.png'
import IconBebidas from '@/app/assets/IconBebidas.png'
import IconSalgados from '@/app/assets/IconSalgados.png'
import Sanduiche from '@/app/assets/sanduiche.png'

import FoodButton from '@/app/components/foodbutton'
import Product from '@/app/components/product'



export default function Estoque_ADM() {

  interface Product {
    id: string;
    nome: string;
    preco: number;
    tipo: string;
    imagem: StaticImageData
    quantidade: number
  }
  
  const estoqueFicticio: Product[] = [
    {
      id: '1',
      nome: 'Coxinha',
      preco: 5.5,
      tipo: 'Salgados',
      imagem: Sanduiche,
      quantidade: 10
    },
    {
    id: '2',
    nome: 'Suco de Laranja',
    preco: 4.0,
    tipo: 'Bebidas',
    imagem: Sanduiche,  
    quantidade: 5,
    },
  ]

  const [estoqueInicial, setEstoqueInicial] = useState<Product[]>(estoqueFicticio)

  const [estoqueAlterado, setEstoqueAlterado] = useState<Product[]>(estoqueInicial)


  const increment = (id: string) => {
    setEstoqueInicial(produtos => produtos.map((produto) => produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto))
    setEstoqueAlterado(produtos => produtos.map((produto) => produto.id === id ? { ...produto, quantidade: produto.quantidade + 1 } : produto))
  }

  const decrement = (id: string) => {
    // Estou usando operadores ternários para verificar se estou decrementando a quantidade do produto com id certo e se sua quantidade já não está em zero.
    setEstoqueInicial(produtos => produtos.map((produto) => produto.id === id ? produto.quantidade == 0 ? produto : { ...produto, quantidade: produto.quantidade - 1 } : produto))
    setEstoqueAlterado(produtos => produtos.map((produto) => produto.id === id ? produto.quantidade == 0 ? produto : { ...produto, quantidade: produto.quantidade - 1 } : produto))
  }

  const remove = (id: string) => {
    setEstoqueInicial(produtos => produtos.filter((produto) => produto.id != id))
    setEstoqueAlterado(produtos => produtos.filter((produto) => produto.id != id))
  }

  const handleFoodButtonClick = (tipo: string) => {
    if (tipo == 'Todos')
      setEstoqueAlterado(() => estoqueInicial)
    else
      if (tipo == 'Salgados')
        setEstoqueAlterado(() => estoqueInicial.filter((produto) => produto.tipo === 'Salgados'))
    else
      if (tipo == 'Bebidas')
        setEstoqueAlterado(() => estoqueInicial.filter((produto) => produto.tipo === 'Bebidas'))
    else
      setEstoqueAlterado(() => estoqueInicial.filter(produto => produto.tipo === 'Doces')) 
  }
 

  return (
    <main className='bg-[#fff4ef] h-screen w-full overflow-x-hidden'>
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

    <div className='h-1/6 mb-1 mt-6 ml-36 flex flex-row space-x-2'>
      <FoodButton image={IconTodos} tipo='Todos' onClick={handleFoodButtonClick}></FoodButton>
      <FoodButton image={IconSalgados} tipo='Salgados' onClick={handleFoodButtonClick}></FoodButton>
      <FoodButton image={IconDoces} tipo='Doces' onClick={handleFoodButtonClick}></FoodButton>
      <FoodButton image={IconBebidas} tipo='Bebidas' onClick={handleFoodButtonClick}></FoodButton>
    </div>

    <div className='w-2/5 mb-2 ml-36 space-y-3'>
      {estoqueAlterado.map((produto) => (
        <Product key={produto.id} product={produto} onIncrement={increment} onDecrement={decrement} onRemove={remove}></Product>
      ))}
    </div>

    </main>
  );
}
