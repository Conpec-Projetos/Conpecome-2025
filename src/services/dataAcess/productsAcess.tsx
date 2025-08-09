import Product from "@/app/components/product";
import { db, storage } from "@/firebase/firebase-config";
import { query, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'; // Importe os métodos necessários do Firestore
import { getStorage, ref, deleteObject } from "firebase/storage";
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
    const productDoc = doc(db, 'products', body.id);
    const productSnapshot = await getDoc(productDoc);
    const currentImageURL = productSnapshot.data()?.imageURL;

    if (currentImageURL !== body.imageURL) {
        await deleteImage(currentImageURL);
    }


    const response = await updateDoc(doc(db, 'products', body.id), {name: body.name, imageURL: body.imageURL, stock: body.stock, price: body.price * 100, type: body.type})
    return response
}

export async function removeProductsAcess(id: string){
    const productDoc = doc(db, 'products', id);
    const productData = await getDoc(productDoc);

    deleteImage(productData.data()?.imageURL || '');

    const response = await deleteDoc(doc(db, 'products', id))
    return response
}

const deleteImage = async (id: string) => {
  const imageRef = ref(storage, `images/products/${id}`);
  await deleteObject(imageRef);
};

