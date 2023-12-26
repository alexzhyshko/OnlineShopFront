import { AddressDTO } from "./AddressDTO";
import { CartDTO } from "../order/CartDTO";

export interface UserDTO {
    externalId?: string;
    cart?: CartDTO;

    timeCreated?: Date;
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    address?: AddressDTO;
    password?: string;
}