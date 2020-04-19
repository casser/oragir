import { Service } from "typedi";

@Service()
export class ConfigService {
    dbPort = 3306;
    dbHost = 'localhost';
    dbName = 'raa';
    dbUsername = 'sergey';
    dbPassword = 'raamypa$5';
    apiSecret = 'server_$ecret:here';
}