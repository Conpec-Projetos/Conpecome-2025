import Product from "@/app/components/product";
import { db } from "@/firebase/firebase-config";
import { query, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'; // Importe os métodos necessários do Firestore


const productsReference = collection(db, 'products_teste');

export async function getProductsAcess(){
    const response = await getDocs(productsReference);
    return response;
}

export async function addProductsAcess(body: Product){
    const response = await addDoc(productsReference, body);
    return response;
}

export async function updateProductsAcess(body: Product){
    const response = await updateDoc(doc(db, 'products_teste', body.id), {name: body.name, imgURL: body.imgURL, stock: body.stock, price: body.price * 100, type: body.type})
    return response
}

export async function removeProductsAcess(id: string){
    const response = await deleteDoc(doc(db, 'products_teste', id))
    return response
}