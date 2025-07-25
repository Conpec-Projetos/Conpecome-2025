'use client'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'

import IconTodos from '@/assets/images/IconTodos.png'
import IconDoces from '@/assets/images/IconDoces.png'
import IconBebidas from '@/assets/images/IconBebidas.png'
import IconSalgados from '@/assets/images/IconSalgados.png'

import FoodButton from '@/app/components/foodbutton'
import Product from '@/app/components/product'
import MainHeader from "@/app/components/ui/main_header";

import { useRouter } from 'next/navigation'
import { addProductsAction, getProductsAction, removeProductsAction, updateProductsAction } from '@/services/actions/productsAction'
import { ProductItem } from '@/services/dataAcess/productService'


export default function Estoque_ADM() {
  const router = useRouter()
  


  // addProductsAction({
  //       imgURL: "https://firebasestorage.googleapis.com/v0/b/conpecome-fbs.appspot.com/o/images%2Fproducts%2Farroz.png?alt=media&token=f5d4886b-4d32-4760-a8af-5d2debd98724",
  //       name: "frango",
  //       price: 600,
  //       stock: 7,
  //       type: 'salgado'})
  

  // const estoqueFicticio: Product[] = [
  //   {
  //     id: '1',
  //     name: 'Coxinha',
  //     price: 5.5,
  //     type: 'salgados',
  //     imgURL: '/images/sanduiche.png',
  //     stock: 10
  //   },
  //   {
  //     id: '2',
  //     name: 'Suco de Laranja',
  //     price: 4.0,
  //     type: 'bebidas',
  //     imgURL: '/images/sanduiche.png',  
  //     stock: 5,
  //   },
  //   {
  //     id: '3',
  //     name: 'Chocolate',
  //     price: 8.0,
  //     type: 'doces',
  //     imgURL: '/images/sanduiche.png',  
  //     stock: 7,
  //   },
  // ]
  const [initialProducts, setInitialProducts] = useState<ProductItem[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([])
  const [debouncedProducts, setdebouncedProducts] = useState<ProductItem[]>([])
  const removeIDRef = useRef<string>('')

  useEffect(() => {
    getProductsAction().then((products) => {
    setInitialProducts(products)
    setFilteredProducts(products)
    })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebouncedProducts(initialProducts)
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [initialProducts])
  
  useEffect(() => {
    if (!removeIDRef.current){
    debouncedProducts.forEach(product => {
      updateProductsAction(product)
    })}
    else {
      removeProductsAction(removeIDRef.current)
    }
  }, [debouncedProducts])
  

  const increment = (id: string) => {
    setInitialProducts(products => products.map((product) => product.id === id ? { ...product, stock: product.stock + 1 } : product))
    setFilteredProducts(products => products.map((product) => product.id === id ? { ...product, stock: product.stock + 1 } : product))
  }

  const decrement = (id: string) => {
    // Estou usando operadoproducts ternários para verificar se estou decrementando a stock do product com id certo e se sua stock já não está em zero.
    setInitialProducts(products => products.map((product) => product.id === id ? product.stock == 0 ? product : { ...product, stock: product.stock - 1 } : product))
    setFilteredProducts(products => products.map((product) => product.id === id ? product.stock == 0 ? product : { ...product, stock: product.stock - 1 } : product))
  }

  const remove = (id: string) => {
    setInitialProducts(products => products.filter((product) => product.id != id))
    setFilteredProducts(products => products.filter((product) => product.id != id))
    removeIDRef.current = id
  }

  const edit = (newProduct: ProductItem) => {
    setInitialProducts((products) => products.map(product => (product.id === newProduct.id ? newProduct : product)))
    setFilteredProducts((products) => products.map(product => (product.id === newProduct.id ? newProduct : product)))
  }

  const handleFoodButtonClick = (type: string) => {
    if (type == 'todos')
      setFilteredProducts(() => initialProducts)
    else
      if (type == 'salgados') {
        setFilteredProducts(() => initialProducts.filter((product) => product.type === 'SALGADO'))
      }
    else
      if (type == 'bebidas')
        setFilteredProducts(() => initialProducts.filter((product) => product.type === 'BEBIDA'))
    else
      setFilteredProducts(() => initialProducts.filter(product => product.type === 'DOCE')) 
  }

  
  return (
    <main className="bg-[#fff4ef] bg-[url('@/assets/images/background.png')] h-screen w-full overflow-x-hidden">
      <MainHeader
        showAdminActions={true}
        onAddProduct={() => router.push("./add-product")}
        onHistorico={() => router.push("./historico_pedidos")}
        onLogout={() => router.back()}
      />
      <div className='h-1/6 mb-1 mt-6 ml-36 flex flex-row space-x-2'>
        <FoodButton image={IconTodos} type='todos' onClick={handleFoodButtonClick}></FoodButton>
        <FoodButton image={IconSalgados} type='salgados' onClick={handleFoodButtonClick}></FoodButton>
        <FoodButton image={IconDoces} type='doces' onClick={handleFoodButtonClick}></FoodButton>
        <FoodButton image={IconBebidas} type='bebidas' onClick={handleFoodButtonClick}></FoodButton>
      </div>
      <div className='w-2/5 mb-2 ml-36 space-y-3'>
      {filteredProducts.map((product) => (
        <Product key={product.id} product={product} onIncrement={increment} onDecrement={decrement} onRemove={remove} onEdit={edit}></Product>
      ))}
    </div>
    </main>
  );
}
