import { Author } from "./author";
import { Domain } from "./domain";
import { Rental } from "./rental";

export interface Book {
    id: number,
    title: string,
    description: string,
    domain: Domain | null,
    author: Author | null,
    rentals: Rental[] | null
}
