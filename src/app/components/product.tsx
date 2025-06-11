import Image from 'next/image';
import { StaticImageData } from "next/image";
import { FC } from "react";

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
}

const Product: FC<ProductProps> = ({product}) => {
    return (
    <div className="bg-[#ffece4] rounded-2xl border-2 border-[#F54B00] h-[300px] w-full flex flex-row">
        <div className="flex items-center justify-center h-full w-1/3 pb-11">
            <Image src={product.imagem} alt={product.nome} width={160} height={160}/>
        </div>
        <div className='h-full w-2/3'>
            <div>{product.nome} dawda da</div>
            <div>{product.preco}</div>
            <div className='flex flex-row'>
                <button>

                </button>
                <div>
                    {product.quantidade}
                </div>
                <button>
                    retirar
                </button>
            </div>
        </div>
    </div>
    )
}
 
export default Product