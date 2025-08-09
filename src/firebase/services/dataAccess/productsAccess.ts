import { db, storage } from "@/firebase/firebase-config";
import { ProductAddType, ProductType } from "@/interfaces/productsInterfaces";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const productsReference = collection(db, "products");

/* Main functions */

export async function addProductsAccess(body: ProductType) {
    const productObject : ProductAddType = {
        uuid: "",
        imageURL: body.imageURL,
        name: body.name,
        price: body.price,
        stock: body.stock,
        type: body.type
    }
    const response = await addDoc(productsReference, productObject);
    const uuid = response.id;

    const downloadURL = body.imageFile ? await addImageToProductAccess(uuid, body.imageFile) : "";
    await updateDoc(doc(db, "products", uuid), {
        uuid: uuid,
        imageURL: downloadURL
    });

    return response;
}

export async function removeProductsAccess(id: string){
    await deleteImage(id);
    await deleteDoc(doc(db, 'products', id))
}

export async function updateProductsAccess(body: ProductType){
    if (body.imageFile) {
        const downloadURL = await addImageToProductAccess(body.uuid, body.imageFile);
        body.imageURL = downloadURL;
    }

    await updateDoc(doc(db, 'products', body.uuid), {
        uuid: body.uuid,
        imageURL: body.imageURL,
        name: body.name,
        price: body.price,
        stock: body.stock,
        type: body.type
    });
}

export async function getProductsAcess(){
    const response = await getDocs(productsReference);
    return response;
}



/* Auxiliar functions */

async function addImageToProductAccess(id: string, imageFile: File): Promise<string> {
    const storageRef = ref(storage, `images/products/${id}`);
    await uploadBytesResumable(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
}

async function deleteImage(id: string) {
    const imageRef = ref(storage, `images/products/${id}`);
    try {
        await deleteObject(imageRef);
        console.log(`Deleted image with ID: ${id}`);
    } catch (error) {
        if (error instanceof FirebaseError) {
            if (error.code === 'storage/object-not-found') {
                console.warn(`Image not found: ${id}`);
            } else {
                console.error(`Error deleting image (${id}):`, error);
            }
        } else {
            console.error('Unknown error:', error);
        }
    }
    
}



