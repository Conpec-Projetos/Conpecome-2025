import { addProductsAcess, getProductsAcess, removeProductsAcess, updateProductsAcess } from "../dataAcess/productsAcess";

export interface Product {
    id: string;
    name: string;
    price: number;
    type: string;
    imageURL: string;
    stock: number
}

export async function getProductsAction(){
    const response = await getProductsAcess()
    const products: Product[] = []
    response.forEach((doc) => {
        const productData = doc.data() as Product
        products.push({...productData, price: productData.price / 100, id: doc.id})
    })

    return products
}

export async function addProductsAction(body: any){
    const response = await addProductsAcess(body)
    return response.id
}

export async function updateProductsAction(body: any){
    const response = await updateProductsAcess(body)
    return response
}

export async function removeProductsAction(id: string){
    const response = await removeProductsAcess(id)
    return response
}