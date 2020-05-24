import { Service } from "typedi";

@Service()
export class ConfigService {
    dbPort = 3306;
    dbHost = 'localhost';
    dbName = 'oragir';
    dbUsername = 'raa';
    dbPassword = 'raa';
    apiSecret = 'server_$ecret:here';
    dataDir = './data';
}