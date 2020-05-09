import { DbService } from "./DbService";
import { Inject } from "typedi";

export class JourneyService {
    @Inject() db: DbService;
    async findJourneys() {
        const journeys = await this.db.query("select * from `tbl_journey`")
        return journeys.map(journey => {
            return journey
        })
    }
}