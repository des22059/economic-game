import { Bank } from "./bank.model";
import { JobType } from "./jobType.model";
import { Job } from "./job.model";
import { Period } from "./period.model";
import { Item } from "./item.model";

export interface Script {
    name: string,
    description: string,
    entities: {
        banks: Bank[],
        jobs: Job[],
        jobTypes: JobType[],
        items: Item[],
        periods: Period[],
    }
}