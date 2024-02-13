import { Book } from "./book";

export interface Domain {
    id: number 
    name: string
    description: string
    books: Book[] | null
}
