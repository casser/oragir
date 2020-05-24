import { DbService } from "./DbService";
import { Inject, Service } from "typedi";

@Service()
export class JourneyService {
    @Inject() db: DbService;
    async findJourneys(from = 0, size = 10) {
        const journeys = await this.db.find('tbl_journey' ,{}, {from,size});
        return journeys.map(journey => {
            return journey;
        });
    }
    async addJourney(journewNew, currentUser) {
        //const jObj = await this.db.query("insert into tbl_jorney ...`");
        journewNew.id = Math.random();
        journewNew.createdBy = currentUser.id;
        return journewNew;
    }
}