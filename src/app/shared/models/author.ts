import { Book } from "./book"

export interface Author {
    id:number,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    grade: string,
    books: Book[] | null
}
