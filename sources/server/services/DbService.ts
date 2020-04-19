import * as MySQL from "mysql";
import { ConfigService } from "./ConfigService";
import { Inject } from "typedi";

export class DbService {
    @Inject() config: ConfigService;
    private connection: MySQL.Connection;
    async connect() {
        return new Promise<void>((accept, reject) => {
            const connection = MySQL.createConnection({
                port: this.config.dbPort,
                host: this.config.dbHost,
                user: this.config.dbUsername,
                password: this.config.dbPassword,
                database: this.config.dbName
            })
            connection.connect((err) => {
                if (err) {
                    reject(err)
                } else {
                    this.connection = connection;
                    accept();
                }
            })
        });
    }
    async query(q: string, ...params: any[]) {
        return new Promise<any>((accept,reject)=>{
            this.connection.query(q,params,(error,results,fields)=>{
                if(error){
                    reject(error);
                }else{
                    accept(results);
                }
            });
        })
    }
}