import { AddressDTO } from "../account/AddressDTO";
import { DeliveryMode } from "./DeliveryMode";
import { OrderEntryDTO } from "./OrderEntryDTO";
import { OrderStatus } from "./OrderStatus";
import { PaymentMode } from "./PaymentMode";
import { PaymentStatus } from "./PaymentStatus";

export interface OrderDTO {
    externalId: string;
    orderEntries: OrderEntryDTO[];
    timeCreated: Date;
    orderStatus: string;
    paymentStatus: string;
    paymentMode: string;
    deliveryMode: string;
    address: AddressDTO;
}