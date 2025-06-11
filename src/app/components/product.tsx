import Image from 'next/image';
import { StaticImageData } from "next/image";
import { FC } from "react";
import EditIcon from "@/app/assets/EditIcon.png"

interface Product {
    id: string;
    nome: string;
    preco: number;
    tipo: string;
    imagem: StaticImageData;
    quantidade: number
  }

type ProductProps = {
    product: Product;
    onDecrement: (id: string) => void
    onIncrement: (id: string) => void
    onRemove: (id: string) => void
}

const Product: FC<ProductProps> = ({product, onDecrement, onIncrement, onRemove}) => {
    return (
    <div className="bg-[#ffece4] rounded-2xl border-2 border-[#F54B00] h-[250px] w-full flex flex-row">
        <div className="flex items-center justify-center h-full w-1/3 pb-11">
            <Image src={product.imagem} alt={product.nome} width={160} height={160}/>
            <button className='mb-32'><Image src={EditIcon} width={30} height={30} alt='Editar'/></button>
        </div>
        <div className='h-full w-2/3 pl-14 pt-8 space-y-10'>
            <div className='flex flex-row space-x-7'>
                <div className='text-[#FF9633] font-poppins font-bold text-2xl'>{product.nome}</div>
                <button className='pt-1'><Image src={EditIcon} width={26} height={26} alt='Editar'/></button>
            </div>
            <div className='flex flex-row space-x-6'>
                <div className='text-[#FF9633] font-poppins font-bold text-2xl'>R$ {product.preco.toFixed(2).replace('.', ',')}</div>
                    <button className='pt-1'><Image src={EditIcon} width={26} height={26} alt='Editar'/></button>
            </div>
            <div className='flex flex-row justify-between w-4/5'>
                <button className='bg-[#FF9633] h-12 w-12 rounded-full text-2xl font-poppins' onClick={() => onDecrement(product.id)}>
                    -
                </button>
                <div className='text-[#FF9633] font-poppins font-bold text-2xl p-2 w-11'>
                    {product.quantidade}
                </div>
                <button className='bg-[#FF9633] font-poppins h-12 w-12 rounded-full text-2xl' onClick={() => onIncrement(product.id)}>
                    +
                </button>
                <button className='bg-[#FF9633] font-poppins h-12 w-12 rounded-full text-2xl ml-10' onClick={() => onRemove(product.id)}>
                    ×
                </button>
            </div>
        </div>
    </div>
    )
}
 
export default Product