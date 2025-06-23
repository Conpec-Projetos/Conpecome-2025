import { db, storage } from "@/firebase/firebase-config";
import { ProductAddType, ProductType } from "@/interfaces/productsInterfaces";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const productsReference = collection(db, "products");

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
    const storageRef = ref(storage, `images/products/${uuid}`);
    await uploadBytesResumable(storageRef, body.imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    await updateDoc(doc(db, "products", uuid), {
        uuid: uuid,
        imageURL: downloadURL
    });
    return response;
}
