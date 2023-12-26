export interface CategoryDTO {
    externalId: string;
    subcategories: CategoryDTO[];
    name: string;
}