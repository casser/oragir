export interface Credentials {
    username: string,
    password: string
}


export class Api {
    url?: URL;
    headers: any;

    get token() {
        return localStorage.token
    }
    set token(value) {
        localStorage.token = value;
    }

    constructor(url?: URL) {
        this.url = url || new URL(window.location.origin);
        this.headers = {
            'Content-Type': "application/json"
        };
    }
    async request(method: string, path: string, params?: object, body?: object) {
        let url = new URL(path, this.url);
        let headers = {...this.headers};
        if (params) {
            for (let key in params) {
                url.searchParams.append(key, params[key]);
            }
        }
        if(this.token){
            headers.Authorization = this.token
        }
        return await fetch(url.href, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        }).then(r => r.json());
    }
    async logout(){
        delete localStorage.token
    }
    async login(credentials:Credentials) {
        const { token } = await this.request("POST", '/login', null, credentials);
        this.token = token;
        return this.me();
    }
    async me() {
        return await this.request("GET", '/me');
    }
    async getUsers(){
        return await this.request("GET", '/users');
    }
    async getJourneys(){
        return await this.request("GET", '/journeys');
    }
}