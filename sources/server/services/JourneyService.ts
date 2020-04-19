import { DbService } from "./DbService";
import { Inject } from "typedi";

export class JourneyService {
    @Inject() db: DbService;
    async findJourneys() {
        const users = await this.db.query("select * from `tbl_journey`")
        return users.map(journey => {
            return journey
        })
    }
}