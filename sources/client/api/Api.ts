
export interface Credentials {
    username: string,
    password: string;
}
// 
export interface Geopoint {
    lat: number,
    lon: number;
}
//
/*
export interface Journey{
    jorn_id:number,
    j_name:string,
    country:string,
    ph_author:string,
    notes:string,
    date_from:Date,
    date_to?:Date
} 
*/
//
export interface JourneyShort {
    id: string,
    start_day: Date,
    end_day?: Date,
    name: string,
}
export interface JourneyInit {
    title: string,
    start_day: Date,
    name: string,
    description: string,
    country: string,
    group_head: string,
    members?: Array<Member>;
}
// for search result and editing form of journey
export interface Journey {
    id: string,
    title: string,
    start_day: Date,
    end_day?: Date,
    name: string,
    description: string,
    country: string,
    group_head: string,
    members?: Array<Member>;
}
export interface NoteShort {
    id: string,
    journey_id: string,
    start_date_time: Date,
    end_date_time: Date,
    short_description: string;
}
// NoteInit, Note
export interface NoteInit {
    journey_id: string,
    start_date_time: Date,
    end_date_time?: Date,
    region?: string,
    district?: string,
    settlement?: string,
    type?: string,
    name?: string,
    latitude?: number,
    longitude?: number,
    description?: string;
}
export interface Note {
    note_id: number,
    jorn_id: number,
    region?: string,
    district?: string,
    settlement?: string,
    type?: string,
    name?: string,
    description?: string,
    dateFrom: Date,
    dateTo: Date,
    parallel?: number,
    meridian?: number,
    userId: number,
    inputDate: Date;
}

// Journey menbers (authors of Photo/Video)
export interface Member {
    id?: string,
    member: string,
    photocamera?: Array<Camera>,
    videocamera?: Array<Camera>;
}
// VideoCamera
export interface Camera {
    name: string,
    photo: boolean,
    video: boolean,
    model: string,
    owner?: string,
    date_creation_tag?: string,
    tags_photo?: string[];
    tags_video?: string[];
}
interface User {
    
}
// settings : new user registration/edit form, members list, cameras list, ....other settings
export class Api {
    url?: URL;
    headers: any;

    get token() {
        return localStorage.token;
    }
    set token(value) {
        localStorage.token = value;
    }

    constructor(url?: URL) {
        this.url = url || new URL(window.location.origin);
        //this.url = url || new URL("http://localhost:3000");

        this.headers = {
            'Content-Type': "application/json"
        };
    }
    async request(method: string, path: string, params?: object, body?: object) {
        let url = new URL(path, this.url);
        let headers = { ...this.headers };
        if (params) {
            for (let key in params) {
                if (typeof params[key] !== undefined) {
                    url.searchParams.append(key, params[key]);
                }
            }
        }
        if (this.token) {
            headers.Authorization = this.token;
        }
        return await fetch(url.href, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        }).then(r => r.json());
    }
    async logout() {
        delete localStorage.token;
    }
    async login(credentials: Credentials) {
        const { token } = await this.request("POST", '/login', null, credentials);
        this.token = token;
        return this.me();
    }
    async me(): Promise<User> {
        return await this.request("GET", '/me');
    }
    async getUsers() {
        return await this.request("GET", '/users');
    }
    async getJourneys(from?: number, size?: number): Promise<Journey[]> {
        return await this.request("GET", '/journeys', { from, size });
    }
    async addJourney(journey: JourneyInit): Promise<Journey> {
        return await this.request("POST", '/journeys', null, journey);
    }
}