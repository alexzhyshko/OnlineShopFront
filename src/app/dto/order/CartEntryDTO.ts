import { ProductDTO } from "../product/ProductDTO";

export interface CartEntryDTO {
    externalId: string;
    timeCreated: Date;
    amount: number;
    quantity: number;
    product: ProductDTO;
}