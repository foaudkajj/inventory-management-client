import { Gender } from "./enums";

export class Product {
    id: string;
    name: string;
    barcode: string;
    shortCode?: string;
    colorId?: string;
    gender?: Gender;
    price: number;
    size?: number;
    quantity: number;
    branchId: string;
    sellingPrice: number;
    description?: string;
    pictureUrl?: string;
    unitId: string;
    categoryId: string;
}