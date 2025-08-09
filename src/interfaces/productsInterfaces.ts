export interface LocalProduct { // Only for React state management
  id: number;
  imageURL: string;
  imageFile?: File;
  name: string;
  price: number;
  stock: number;
  type: string;
}

export interface ProductType {
    uuid: string;
    imageURL: string;
    imageFile?: File;
    name: string;
    price: number;
    stock: number;
    type: string;
}

export interface ProductAddType {
    uuid: string;
    imageURL: string;
    name: string;
    price: number;
    stock: number;
    type: string;
}