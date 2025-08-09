import Image from 'next/image';
import { FC, useState, useRef } from "react";
import EditIcon from "@/assets/images/mingcute_edit-line.svg";
import { ProductType, ProductAddType } from "@/interfaces/productsInterfaces";
import { Pencil, Check, X, SquarePen } from "lucide-react";
import { updateProductsAction, removeProductsAction } from '@/firebase/services/actions/productsAction';

type ProductProps = {
    product: ProductAddType;
    setProducts: React.Dispatch<React.SetStateAction<ProductAddType[]>>;
}


const Product: FC<ProductProps> = ({product, setProducts}) => {
    const [editando, setEditando] = useState<boolean>(false);
    const [editField, setEditField] = useState<string | null>(null);


    // Form state to handle product edits
    const [form, setForm] = useState<ProductType>({
        uuid: product.uuid,
        imageURL: product.imageURL,
        name: product.name,
        price: product.price,
        imageFile: undefined as File | undefined,
        stock: product.stock,

        // Unused properties, but required for type consistency
        type: product.type,
    })

    // Reference to hidden file input element
    const fileInputRef = useRef<any>(null);

    // Auxiliar functions

    const formatPriceInBRL = (cents: number): string => {
        return `R$ ${(cents / 100).toFixed(2).replace(".", ",")}`;
    };

    // Handlers for editing
    
    const handleEditAccept = () => {
        setProducts(products => products.map(prod => prod.uuid === product.uuid ? {
            ...prod,
            name: form.name,
            price: (form.price),
            imageFile: form.imageFile,
            imageURL: product.imageURL, // The new image will have the same id and URL as the old one, so we don't need to change it here
            stock: form.stock
        } : prod));

        updateProductsAction({
            ...product,
            name: form.name,
            price: form.price,
            imageFile: form.imageFile,
            stock: form.stock
        });

        setForm(prevForm => ({
            ...prevForm,

            imageFile: undefined as File | undefined,
        }));

        setEditField(null);
        setEditando(false);
    }

    const handleEditCancel = () => {
        setForm({
            uuid: product.uuid,
            imageURL: product.imageURL,
            name: product.name,
            price: product.price,
            imageFile: undefined as File | undefined,
            stock: product.stock,
            type: product.type,
        });

        setEditField(null);
        setEditando(false);
    }

    // Auxiliar handlers

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
        setEditField(null);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    }

    // Handlers for form fields

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setForm({ ...form, name: newName });
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files != null) {
            const file = event.target.files[0]

            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    if (typeof result === 'string') {
                        setForm(prevForm => ({
                            ...prevForm,
                            imageFile: file,
                            imageURL: result, // now guaranteed to be a string
                        }));
                        console.log(result);
                    }
                };
                reader.readAsDataURL(file); // converts file to base64 string
            }

        };
    }
    

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // Regex to remove non-numeric characters
        const cents = value ? parseInt(value, 10) : 0;
        setForm({ ...form, price: cents });
    };

    const onDecrement = () => {
        if (form.stock > 0) {
            setForm(f => ({ ...f, stock: f.stock - 1 }));
        }
    }

    const onIncrement = () => {
        setForm(f => ({ ...f, stock: f.stock + 1 }));
    }

    // Remove Product

    const onRemove = () => {
        removeProductsAction(form.uuid)
        setProducts(products => products.filter(prod => prod.uuid !== form.uuid));
    }


    return (
        
    <div className="bg-[#ffece4] rounded-2xl border-2 border-[#f66c0e] h-[250px] w-full flex flex-row relative">

        {editando ? (
            <div className='flex flex-row space-x-2 absolute top-2 right-2'>
                <div className='botao-laranja text-white cursor-pointer hover:scale-110 h-8 w-8 flex items-center justify-center'>
                    <Check onClick={handleEditAccept} />
                </div>
                <div className='botao-laranja text-white cursor-pointer hover:scale-110 h-8 w-8 flex items-center justify-center'>
                    <X onClick={handleEditCancel} />
                </div>
            </div>
        ) : (
            <div className='botao-laranja absolute top-2 right-2 text-white cursor-pointer hover:scale-110 h-8 w-8 flex items-center justify-center' onClick={() => setEditando(!editando)}>
                <Pencil></Pencil>
            </div>
        )}
        

        <div className="flex items-center justify-center h-full w-1/3 pb-11 relative">
            {/* Enhanced image src handling */}
            <Image 
                src={
                  form.imageURL?.startsWith('http') || form.imageURL?.startsWith('data:image/')
                    ? form.imageURL
                    : form.imageURL
                      ? `/${form.imageURL.replace(/^\/+/, '')}`
                      : '/placeholder.png' // fallback image
                }
                alt={product.name}
                width={160} 
                height={160}
            />

            {editando && (
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".jpg, .jpeg, .png"
                        onChange={handleImageChange}
                        className="text-sm text-gray-500"
                        style={{ display: 'none' }}
                    />
                    <button className='mb-32 absolute top-6 right-0' onClick={handleImageClick}>
                        <SquarePen className='text-[#f66c0e] w-[30px] h-[30px]'/>
                    </button>
                </div>
            )}

        </div>
        <div className='h-full w-2/3 pl-14 pt-8 space-y-10'>
            <div className='flex flex-row space-x-7'>

                {((editField === "name") && editando) ? (
                    <input
                        type="text"
                        value={form.name}
                        onChange={handleNameChange}
                        onBlur={() => setEditField(null)}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                        className="text-[#f66c0e] font-poppins font-bold text-2xl w-52 mr-1 bg-transparent border-b border-[#f66c0e] outline-none"
                        placeholder="Inserir nome"
                    />
                    ) : (
                    <button
                        onClick={() => setEditField("name")}
                        className="w-full flex items-center hover:text-[#F54B00] transition-colors "
                        disabled={!editando}
                    >
                        <div className="text-[#f66c0e] font-poppins font-bold text-2xl mr-1 truncate">
                        {form.name || "Inserir nome"}
                        </div>
                        {editando && <SquarePen className='text-[#f66c0e] w-[1rem] h-[1rem]'/>}
                    </button>
                )}
            </div>
            <div className='flex flex-row space-x-6'>
                {((editField === "price") && editando) ? (
                    <input
                        type="text"
                        value={form.price === 0 ? "" : formatPriceInBRL(form.price)}
                        onChange={handlePriceChange}
                        onBlur={() => setEditField(null)}
                        onKeyDown={handleEditKeyDown}
                        autoFocus
                        className="text-[#f66c0e] font-poppins font-bold text-2xl w-52 mr-1 bg-transparent border-b border-[#f66c0e] outline-none"
                        placeholder="Inserir preço"
                    />
                    ) : (
                    <button
                        onClick={() => setEditField("price")}
                        className="w-full flex items-center hover:text-[#F54B00] transition-colors"
                        disabled={!editando}
                    >
                        <div className="text-[#f66c0e] font-poppins font-bold text-2xl truncate mr-1">
                        {form.price > 0
                            ? formatPriceInBRL(form.price)
                            : "Inserir preço"}
                        </div>
                        {editando && <SquarePen className='text-[#f66c0e] w-[1rem] h-[1rem]'/>}
                    </button>
                )}
                
            </div>
            <div className='flex flex-row justify-between w-4/5'>
                <div className={`flex flex-row ${editando ? "justify-between" : "justify-center"} items-center w-2/3 `}>
                    {editando &&<button 
                        className=' hover:scale-95 flex items-center justify-center text-white h-12 w-12 text-2xl font-poppins botao-laranja'
                        onClick={onDecrement}
                        disabled={form.stock <= 0}
                    >
                        -
                    </button>}
                    <div className='text-[#f66c0e] font-poppins font-bold text-2xl p-2 w-11 text-center'>
                        {form.stock}
                    </div>
                    {editando && <button 
                        className=' font-poppins  hover:scale-95 flex items-center justify-center text-white h-12 w-12 botao-laranja text-2xl'
                        onClick={onIncrement}
                    >
                        +
                    </button>}
                </div>

                <button className=' hover:scale-95 flex items-center justify-center text-white font-poppins h-12 w-12 botao-laranja text-2xl ml-10' onClick={onRemove}>
                    ×
                </button>
            </div>
        </div>
    </div>
    )
}
 
export default Product