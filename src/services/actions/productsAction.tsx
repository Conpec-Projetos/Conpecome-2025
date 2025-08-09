import { addProductsAcess, getProductsAcess, removeProductsAcess, updateProductsAcess } from "../dataAcess/productsAcess";

import { ProductItem } from "../dataAcess/productService";


export async function getProductsAction(){
    const response = await getProductsAcess()
    const products: ProductItem[] = []
    response.forEach((doc) => {
        const productData = doc.data() as ProductItem
        products.push({...productData, price: productData.price / 100, id: doc.id})
    })

    return products
}

export async function addProductsAction(body: ProductItem){
    const response = await addProductsAcess(body)
    return response.id
}

export async function updateProductsAction(body: ProductItem){
    const response = await updateProductsAcess(body)
    return response
}

export async function removeProductsAction(id: string){
    const response = await removeProductsAcess(id)
    return response
}