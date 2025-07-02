import Image from 'next/image';
import { StaticImageData } from "next/image";
import { FC, useState, useRef } from "react";
import EditIcon from "@/assets/images/EditIcon.png";
// Update the path below to the correct relative path if needed
import { ProductItem } from '@/services/dataAcess/productService';

type ProductProps = {
    product: ProductItem;
    onDecrement: (id: string) => void
    onIncrement: (id: string) => void
    onRemove: (id: string) => void
    onEdit: (newProduct: ProductItem) => void
}


const Product: FC<ProductProps> = ({product, onDecrement, onIncrement, onRemove, onEdit}) => {

    const [editando, setEditando] = useState<boolean>(false);
    const [form, setForm] = useState({
    name: product.name,
    price: product.price.toFixed(2),
    imgURL: product.imageURL})
    const fileInputRef = useRef<any>(null);
    const ClickRef = useRef<any>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                    if (typeof reader.result === 'string') {
                        setForm({ ...form, imgURL: reader.result})
                        onEdit({
                        ...product,
                        name: form.name,
                        price: parseFloat(form.price),
                        imageURL: reader.result,
                        });
                    }
                }
                reader.readAsDataURL(file);
            }
        };
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    const handleClick = () => {
        setEditando(true)
        ClickRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleKeyPress = (e: React.KeyboardEvent | undefined) => {
        if (e != undefined)
            if (e.key === "Enter") {
            onEdit({
                ...product,
                name: form.name,
                price: parseFloat(form.price),
                imageURL: form.imgURL});
            setEditando(false);
                }
            };

    return (
        
    <div className="bg-[#ffece4] rounded-2xl border-2 border-[#f66c0e] h-[250px] w-full flex flex-row">
        <div className="flex items-center justify-center h-full w-1/3 pb-11">
            <Image src={product.imageURL} alt={product.name} width={160} height={160}/>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              className="text-sm text-gray-500"
              style={{ display: 'none' }}
            />
            <button className='mb-32'><Image src={EditIcon} width={30} height={30} alt='Editar' onClick={handleImageClick}/></button>
        </div>
        <div className='h-full w-2/3 pl-14 pt-8 space-y-10'>
            <div className='flex flex-row space-x-7'>

                {editando == false ? <div className='text-[#f66c0e] font-poppins font-bold text-2xl'>{product.name}</div> :
                <input ref={ClickRef}
                  className='text-[#f66c0e] font-poppins font-bold text-2xl border-2 border-[#f66c0e] w-52'
                  value={form.name}
                  name='name'
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}>
                </input>}

                <button className='pt-1'><Image src={EditIcon} width={26} height={26} alt='Editar' onClick={handleClick}/></button>
            </div>
            <div className='flex flex-row space-x-6'>
                {editando == false ? <div className='text-[#f66c0e] font-poppins font-bold text-2xl'>R$ {product.price.toFixed(2).replace('.', ',')}</div> : 
                <input ref={ClickRef}
                  className='text-[#f66c0e] font-poppins font-bold text-2xl border-2 border-[#f66c0e] w-52'
                  value={form.price}
                  name='price'
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}>
                </input>}
                <button className='pt-1'><Image src={EditIcon} width={26} height={26} alt='Editar' onClick={handleClick}/></button>
            </div>
            <div className='flex flex-row justify-between w-4/5'>
                <button className=' hover:scale-95 flex items-center justify-center text-white h-12 w-12 text-2xl font-poppins botao-laranja' onClick={() => onDecrement(product.id)}>
                    -
                </button>
                <div className='text-[#f66c0e] font-poppins font-bold text-2xl p-2 w-11'>
                    {product.stock}
                </div>
                <button className=' font-poppins  hover:scale-95 flex items-center justify-center text-white h-12 w-12 botao-laranja text-2xl' onClick={() => onIncrement(product.id)}>
                    +
                </button>
                <button className=' hover:scale-95 flex items-center justify-center text-white font-poppins h-12 w-12 botao-laranja text-2xl ml-10' onClick={() => onRemove(product.id)}>
                    ×
                </button>
            </div>
        </div>
    </div>
    )
}
 
export default Product