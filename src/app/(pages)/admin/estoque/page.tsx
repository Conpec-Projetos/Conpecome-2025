'use client'
import { useEffect, useRef, useState } from 'react'

import IconTodos from '@/assets/images/IconTodos.png'
import IconDoces from '@/assets/images/IconDoces.png'
import IconBebidas from '@/assets/images/IconBebidas.png'
import IconSalgados from '@/assets/images/IconSalgados.png'

import FoodButton from '@/app/components/foodbutton'
import Product from '@/app/components/product'
import MainHeader from "@/app/components/ui/main_header";

import { useRouter } from 'next/navigation'
import { getProductsAction, removeProductsAction, updateProductsAction } from '@/firebase/services/actions/productsAction'
import { ProductType } from '@/interfaces/productsInterfaces'
import bg from '@/assets/images/background.png'

export default function Estoque_ADM() {
  const router = useRouter()
  
  const [initialProducts, setInitialProducts] = useState<ProductType[]>([])
  const [debouncedProducts, setdebouncedProducts] = useState<ProductType[]>([])
  const removeIDRef = useRef<string>('')
  const [filteredType, setFilteredType] = useState<string>('TODOS')

  /* Get all products from firebase */
  useEffect(() => {
    getProductsAction().then((products) => {
    setInitialProducts(products)
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


  const handleFoodButtonClick = (type: string) => {
    setFilteredType(type);
  }

  const filter = (type: string) => {
    return filteredType === "TODOS" ? true : type === filteredType;
  };

  return (
    <div className="bg-[#fff4ef h-screen w-full overflow-x-hidden"
      style={{ backgroundImage: `url(${bg.src})` }}>
      <MainHeader
        showAdminActions={true}
        onAddProduct={() => router.push("./add-product")}
        onHistorico={() => router.push("./historico_pedidos")}
        onLogout={() => router.back()}
      />
      <main>
        <div className='h-1/6 mb-1 mt-6 ml-36 flex flex-row space-x-2'>
          <FoodButton image={IconTodos} type='TODOS' onClick={handleFoodButtonClick}></FoodButton>
          <FoodButton image={IconSalgados} type='SALGADO' onClick={handleFoodButtonClick}></FoodButton>
          <FoodButton image={IconDoces} type='DOCE' onClick={handleFoodButtonClick}></FoodButton>
          <FoodButton image={IconBebidas} type='BEBIDA' onClick={handleFoodButtonClick}></FoodButton>
        </div>
        <div className='w-2/5 mb-2 ml-36 space-y-3'>
          {
            initialProducts.filter(product => filter(product.type))
              .map((product) => (
                <Product key={product.uuid} product={product} setProducts={setInitialProducts} />
              ))
          }
        </div>
      </main>
      
    </div>
  );
}
