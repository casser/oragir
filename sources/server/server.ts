import "reflect-metadata"; // this shim is required
import * as express from "express";
import { createExpressServer } from "routing-controllers";
import { Action } from "routing-controllers";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";

import { UserController } from "./controllers/UserController";
import { AuthService } from "./services/AuthService";
import { DbService } from "./services/DbService";
import { MySqlDbService } from "./services/DbService";
import { DiskDbService } from "./services/DbService";
import { JourneyController } from "./controllers/JourneyController";





async function start() {

    Container.set(DbService,Container.get(DiskDbService));
    
    const db: DbService = Container.get(DbService);
    const auth: AuthService = Container.get(AuthService);
    console.info(db.connect);
    // bootstrap 
    await db.connect();
    // configure dependecy injection 
    useContainer(Container);
    // initialize server and controllers 
    const app = createExpressServer({
        controllers: [UserController, JourneyController],
        async authorizationChecker(action: Action, roles: string[]) {
            const token = action.request.headers["authorization"];
            const user = await auth.findUserByHeader(token);
            console.info(user);
            if (user && !roles.length)
                return true;
            if (user && roles.find(role => user.roles.indexOf(role) !== -1))
                return true;
            return false;
        },
        async currentUserChecker(action: Action) {
            const token = action.request.headers["authorization"];
            const user = await auth.findUserByHeader(token);
            return user;
        }

    });

    app.use(express.static('./dist'));
    // run express application on port 3000
    app.listen(3000);
}

start().catch(console.error);