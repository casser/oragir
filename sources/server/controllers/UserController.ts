import { Inject } from "typedi";
import { JsonController, Param, Body, Get, Post, Put, Delete, Authorized, CurrentUser } from "routing-controllers";
import { UserService } from "../services/UserService";
import { AuthService, Credentials } from "../services/AuthService";

@JsonController()
export class UserController {

   @Inject() auth: AuthService;
   @Inject() users: UserService;

   @Get("/me")
   @Authorized()
   me(@CurrentUser() user) {
      return user;
   }

   @Post("/login")
   login(@Body() credentials: Credentials) {
      return this.auth.login(credentials);
   }

   @Get("/users/:id")
   @Authorized()
   getOne(@Param('id') id: string) {
      return {
         id: id,
         name: id
      }
   }

   @Get("/users")
   @Authorized("ADMIN")
   async getAll() {
      return this.users.findUsers();
   }
}