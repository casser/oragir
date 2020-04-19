import { Inject } from "typedi";
import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized, CurrentUser } from "routing-controllers";
import { UserService } from "../services/UserService";
import { AuthService, Credentials } from "../services/AuthService";
import { JourneyService } from "../services/JourneyService";

@JsonController()
export class JourneyController {

   @Inject() journeys: JourneyService;

   @Get("/journeys")
   @Authorized("ADMIN")
   async getAll() {
      return this.journeys.findJourneys();
   }
}