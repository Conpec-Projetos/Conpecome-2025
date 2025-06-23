import { ProductType } from "@/interfaces/productsInterfaces";
import { addProductsAccess } from "../dataAccess/productsAccess";

export async function addProductsAction(body: ProductType) {
    const response = await addProductsAccess(body);
    return response.id;
}