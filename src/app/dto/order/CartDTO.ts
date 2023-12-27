import { AddressDTO } from "../account/AddressDTO";
import { CartEntryDTO } from "./CartEntryDTO";
import { DeliveryMode } from "./DeliveryMode";
import { PaymentMode } from "./PaymentMode";

export interface CartDTO {
    paymentMode: string;
    deliveryMode: string;
    externalId: string;
    cartEntryList?: CartEntryDTO[];
    address?: AddressDTO;
}