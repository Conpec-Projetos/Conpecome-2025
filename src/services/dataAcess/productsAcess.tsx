import Product from "@/app/components/product";
import { db } from "@/firebase/firebase-config";
import { query, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'; // Importe os métodos necessários do Firestore
import { ProductItem } from "./productService";


const productsReference = collection(db, 'products');

export async function getProductsAcess(){
    const response = await getDocs(productsReference);
    return response;
}

export async function addProductsAcess(body: ProductItem){
    const response = await addDoc(productsReference, body);
    return response;
}

export async function updateProductsAcess(body: ProductItem){
    const response = await updateDoc(doc(db, 'products', body.id), {name: body.name, imgURL: body.imageURL, stock: body.stock, price: body.price * 100, type: body.type})
    return response
}

export async function removeProductsAcess(id: string){
    const response = await deleteDoc(doc(db, 'products', id))
    return response
}