import { AddressDTO } from "../account/AddressDTO";

export interface PublisherDTO {
    externalId: string;
    name: string;
    address: AddressDTO;
    email: string;
    website: string;
    phone: string;

}