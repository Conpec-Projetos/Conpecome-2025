import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';
import docesIcon from "@/assets/images/product_types/doces.png";
import salgadosIcon from "@/assets/images/product_types/salgados.png";
import bebidasIcon from "@/assets/images/product_types/bebidas.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  type: string;
  typeData?: ProductType;
  imgUrl: string;
  stock: number;
}

export interface ProductType {
  name: string;
  displayName: string;
  imgUrl: string;
}

const productTypes: ProductType[] = [
  {
    name: 'DOCE',
    displayName: 'Doces',
    imgUrl: docesIcon.src
  },
  {
    name: 'SALGADO',
    displayName: 'Salgados',
    imgUrl: salgadosIcon.src
  },
  {
    name: 'BEBIDA',
    displayName: 'Bebidas',
    imgUrl: bebidasIcon.src
  }
];

export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(query(productsRef));
  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    // Attach local typeData based on type name
    const typeData = productTypes.find(pt => pt.name === data.type);
    return {
      ...data,
      id: docSnap.id,
      typeData: typeData
    } as Product;
  });
};

export const getProductTypes = async (): Promise<ProductType[]> => {
  return productTypes;
};

export const initializeProductTypes = async (): Promise<void> => {
  return;
};
