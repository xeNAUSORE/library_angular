import { Book } from "./book";
import { User } from "./user";

export interface Rental {
    id: number,
    user: User,
    book: Book,
    rentailDate: Date,
    returnDate: Date | null
}
