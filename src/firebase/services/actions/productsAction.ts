import { ProductType } from "@/interfaces/productsInterfaces";
import { addProductsAccess, getProductsAcess, updateProductsAccess, removeProductsAccess } from "../dataAccess/productsAccess";

export async function addProductsAction(body: ProductType) {
    const response = await addProductsAccess(body);
    return response.id;
}

export async function getProductsAction(){
    const response = await getProductsAcess()
    const products: ProductType[] = []
    response.forEach((doc) => {
        const productData = doc.data() as ProductType
        products.push({...productData, price: productData.price, uuid: doc.id})
    })

    return products
}

export async function updateProductsAction(body: ProductType){
    const response = await updateProductsAccess(body)
    return response
}

export async function removeProductsAction(id: string){
    const response = await removeProductsAccess(id)
    return response
}





