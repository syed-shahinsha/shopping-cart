export interface AddProduct{
    name:string;
    category:string;
    description:string;
    quantity:number;
    price:number;
    availability:string| number;
    photos:PhotoObjectPartial[] | null;
}

export const ImagePath = 'sarees/';
export const DocumentPath = 'product/';    

export interface AddProductPartial extends Partial<AddProduct> {}

export interface PhotoObject{
    name:string;
    fullPath:string;
    downloadURL:string;
}
export interface PhotoObjectPartial extends Partial<PhotoObject>{}