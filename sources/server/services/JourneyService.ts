import { DbService } from "./DbService";
import { Inject, Service } from "typedi";

@Service()
export class JourneyService {
    @Inject() db: DbService;
    async findJourneys() {
        const journeys = await this.db.query("select * from `tbl_journey`")
        return journeys.map(journey => {
            return journey
        })
    }
    async addJourney(journewNew, currentUser){
        //const jObj = await this.db.query("insert into tbl_jorney ...`");
        journewNew.id = Math.random();
        journewNew.createdBy = currentUser.id
        return  journewNew;
    }
}