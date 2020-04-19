import { DbService } from "./DbService";
import { Inject } from "typedi";

export class UserService {
    @Inject() db: DbService;
    async findUsers() {
        const users = await this.db.query("select * from `tbl_user`")
        return users.map(user => {
            const roles = user.roles.trim();
            return {
                id: user.usr_login,
                name: user.usr_name,
                createdAt: user.usr_reg_date,
                active: user.active,
                roles: roles ? roles.split(',') : []
            }
        })
    }
}