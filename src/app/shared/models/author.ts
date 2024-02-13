import { Book } from "./book"

export interface Author {
    id:number,
    firstname: string,
    lastname: string,
    mail: string,
    phone: string,
    books: Book[] | null
}
