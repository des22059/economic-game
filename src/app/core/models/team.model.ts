import { User } from "./user.model";

export interface Team {
    name: string,
    money: number,
    score: number,
    users: User[]
}