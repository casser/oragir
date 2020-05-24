
import * as jwt from 'jwt-simple'
import { ConfigService } from './ConfigService';
import { DbService } from './DbService';
import { Inject, Service } from 'typedi';

export interface User {
    id: string;
    name: string;
    roles: string[]
    createdAt: Date;
    password?: string;
    active: boolean;
}

export interface Session {
    token: string;
}

export interface Credentials {
    username: string;
    password: string;
}

@Service()
export class AuthService {

    @Inject() config: ConfigService;
    @Inject() db: DbService;

    async login({ username, password }: Credentials): Promise<Session> {
        const user = await this.findUserByUsername(username);
        if (user && user.password == password) {
            delete user.password;
            return {
                token: jwt.encode(user, this.config.apiSecret)
            };
        }
    }
    async findUserByHeader(header: string): Promise<User> {
        try {
            return jwt.decode(header, this.config.apiSecret)
        } catch (error) {
            throw new Error('invalid token');
        }
    }
    async findUserByUsername(username: string): Promise<User> {
        //select * from `tbl_user` where `usr_login` = ?
        const users = await this.db.find('tbl_user', {usr_login:username});
        if (users && users.length == 1) {
            const user = users[0];
            const roles = user.roles.trim();
            return {
                id: user.usr_login,
                name: user.usr_name,
                createdAt: user.usr_reg_date,
                password: user.usr_passw,
                active: user.active,
                roles: roles ? roles.split(',') : []
            };
        }
    }
}

