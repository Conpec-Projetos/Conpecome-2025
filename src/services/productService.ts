import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export interface Product {
  id: string;
  name: string;
  price: number;
  category_id: string;
  imgUrl: string;
}

export interface ProductType {
  id: string; 
  name: string;
  imgUrl: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(query(productsRef));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
};

export const getProductTypes = async (): Promise<ProductType[]> => {
  const typesRef = collection(db, 'product_types');
  const snapshot = await getDocs(query(typesRef));
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as ProductType));
};
