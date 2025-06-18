import { collection, getDocs, query, DocumentReference, getDoc, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

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
  id: string; 
  name: string;
  imgUrl: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(query(productsRef));
  return Promise.all(
    snapshot.docs.map(async (docSnap) => {
      const data = docSnap.data();
      try {
        if (data.type && typeof data.type === 'object') {
          console.log('Product data:', data);
          const typeRef = data.type as DocumentReference;
          console.log('Type reference:', typeRef.path);
          const typeDoc = await getDoc(typeRef);
          if (typeDoc.exists()) {
            const typeData = typeDoc.data();
            console.log('Type data:', typeData);
            return {
              ...data,
              id: docSnap.id,
              type: typeData.name, // Store the type name directly
              typeData: {
                id: typeDoc.id,
                name: typeData.name,
                imgUrl: typeData.imgUrl
              } as ProductType
            } as Product;
          }
        }
        console.log('No valid type reference found for product:', docSnap.id);
        return {
          ...data,
          id: docSnap.id,
          type: '',
          typeData: undefined
        } as Product;
      } catch (error) {
        console.error(`Error fetching type for product ${docSnap.id}:`, error);
        return {
          ...data,
          id: docSnap.id,
          type: '',
          typeData: undefined
        } as Product;
      }
    })
  );
};

export const getProductTypes = async (): Promise<ProductType[]> => {
  const typesRef = collection(db, 'product-types');
  const snapshot = await getDocs(query(typesRef));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as ProductType));
};

export const initializeProductTypes = async () => {
  const productTypes = [
    {
      name: "doces",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/conpecome-fbs.appspot.com/o/images%2Fdoces.png?alt=media"
    },
    {
      name: "salgados",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/conpecome-fbs.appspot.com/o/images%2Fsalgados.png?alt=media"
    },
    {
      name: "bebidas",
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/conpecome-fbs.appspot.com/o/images%2Fbebidas.png?alt=media"
    }
  ];

  try {
    // Check if collection is empty
    const snapshot = await getDocs(collection(db, 'product-types'));
    if (snapshot.empty) {
      const promises = productTypes.map(type => 
        addDoc(collection(db, 'product-types'), type)
      );
      await Promise.all(promises);
    }
  } catch (error) {
    console.error('Error initializing product types:', error);
  }
};
