import * as MySQL from "mysql";
import * as Fs from "fs";
import * as Path from "path";
import { ConfigService } from "./ConfigService";
import { Inject } from "typedi";
import { Service } from "typedi";


export interface FindOptions {
    from?: number,
    size?: number;
}
@Service()
export class DbService {
    async connect() {

    }


    async find(tableName: string, query?: any, options?:FindOptions): Promise<any[]> {
        return [];
    }
}

@Service()
export class DiskDbService extends DbService {
    @Inject() private config: ConfigService;
    private db: { [key: string]: any[]; };
    async connect() {
        this.db = {};
        const dataDir = Path.resolve(this.config.dataDir);
        const jsonFiles = Fs.readdirSync(dataDir);
        for (let fileName of jsonFiles) {
            const tableName = Path.basename(fileName, '.json');
            const tableData = JSON.parse(Fs.readFileSync(Path.resolve(this.config.dataDir, fileName), 'utf8'));
            this.db[tableName] = tableData;
        }
        for (let tableName in this.db) {
            console.info(tableName, this.db[tableName].length);
        }
    }

    // {username:"gugush"}
    async find(tableName: string, query?: any, options?: FindOptions): Promise<any[]> {
        let data = this.db[tableName];
        if (query) {
            data = data.filter((current) => {
                for (let field in query) {
                    if (query[field] != current[field]) {
                        return false;
                    }
                }
                return true;
            });
        }
        if(options){
            data = data.slice(options.from,options.size)
        }
        return data;
    };
}

export class MySqlDbService extends DbService {

    @Inject() private config: ConfigService;
    private connection: MySQL.Connection;
    async connect() {
        return new Promise<void>((accept, reject) => {
            const connection = MySQL.createConnection({
                port: this.config.dbPort,
                host: this.config.dbHost,
                user: this.config.dbUsername,
                password: this.config.dbPassword,
                database: this.config.dbName
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    this.connection = connection;
                    accept();
                }
            });
        });
    }
    async query(q: string, ...params: any[]) {
        return new Promise<any>((accept, reject) => {
            this.connection.query(q, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    accept(results);
                }
            });
        });
    }
}

