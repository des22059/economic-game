import { Job } from "./job.model";
import { User } from "./user.model";

export interface Participant {
    gameId: string,
    job: Job,
    money: number,
    score: number,
    teamId: string,
    teamName: string,
    user: User
}