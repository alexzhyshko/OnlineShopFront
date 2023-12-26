import { ProductDTO } from "../product/ProductDTO";

export interface OrderEntryDTO {
    externalId: string;
    timeCreated: Date;
    amount: number;
    quantity: number;
    product: ProductDTO;
}