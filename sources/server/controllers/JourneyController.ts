import { Inject } from "typedi";
import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized, CurrentUser, QueryParam } from "routing-controllers";
import { UserService } from "../services/UserService";
import { AuthService, Credentials } from "../services/AuthService";
import { JourneyService } from "../services/JourneyService";

@JsonController()
export class JourneyController {

   @Inject() journeys: JourneyService;
  
   @Get("/journeys")
   @Authorized()
   async getAll(@QueryParam('from') from:number, @QueryParam('size') size:number) {
      return this.journeys.findJourneys(from,size);
   }
   
   @Post("/journeys")
   @Authorized()
   async addJourney(@Body() journewNew, @CurrentUser() currentUser){
      return this.journeys.addJourney(journewNew, currentUser);
   }
}