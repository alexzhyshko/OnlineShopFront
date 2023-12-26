import { AuthorDTO } from "./AuthorDTO";
import { CategoryDTO } from "./CategoryDTO";
import { ProductAttributeDTO } from "./ProductAttributeDTO";
import { ProductType } from "./ProductType";
import { PublisherDTO } from "./PublisherDTO";

export interface ProductDTO {
    externalId: string;
    productAttributes: ProductAttributeDTO[];
    authors: AuthorDTO[];
    publishers: PublisherDTO[];
    categories: CategoryDTO[];
    imageLink: string;
    price: number;
    type: ProductType;
    name: string;
}