import { Address } from "./address";
import { Rental } from "./rental";

export interface User {
    id: number
    firstname: string
    lastname: string
    email: string
    phone: string
    address: Address, 
    rentals: Rental[] | null,
}
