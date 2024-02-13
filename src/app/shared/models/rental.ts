import { Book } from "./book";
import { User } from "./user";

export interface Rental {
    id: number,
    user: User,
    book: Book,
    rentAt: Date,
    returnAt: Date | null
}
