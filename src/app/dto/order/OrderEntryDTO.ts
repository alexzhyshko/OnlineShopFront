import { ProductDTO } from "../product/ProductDTO";
import { ReviewEntryDTO } from "../review/ReviewEntryDTO";

export interface OrderEntryDTO {
    externalId?: string;
    timeCreated?: Date;
    amount?: number;
    quantity?: number;
    product?: ProductDTO;
    reviewEntry: ReviewEntryDTO;
}