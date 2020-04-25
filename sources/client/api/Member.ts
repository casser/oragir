import {Member, Camera} from "./Api";
/*
export interface Member{
    member:string,
    photocamera?:Array<string>,
    videocamera?:Array<string>
}
export interface Camera{
    name:string,
    photo:boolean,
    video:boolean,
    model:string,
    owner?: string,
    date_creation_tag: string,
    tags: string[];
}
*/
export class JMembers{
    parent_container: HTMLDivElement;
    membersList:string[];  // from database
    photoCameraList:string[];// from database
    videoCameraList:string[];// from database
    members:Member[];// ... array of memners according to interface Member
    memberSelectElm : HTMLSelectElement;
    photoCameraSelectElm : HTMLSelectElement;
    videoCameraSelectElm : HTMLSelectElement;
    current_index:number;
    // form
    membersBlock : HTMLDivElement;
    membersFormTable : HTMLTableElement;

    constructor(membersList:string[]=["Արմեն", "Աշոտ", "Րաֆֆի", "Սասուն", "Անուշ"], 
                photoCameraList:string[]=["Nikon D 700", "Nikon D 5500", "Nikon D 750", "Nikon CoolPix 600", "Redmi tel"], 
                videoCameraList:string[]=["Nikon D 5500", "Nikon D 750", "Nikon CoolPix 600", "Redmi tel", "Sony camera"]){
        this.current_index = 0;
        this.attachPhotoCameras = this.attachPhotoCameras.bind(this);
        this.attachVideoCameras = this.attachVideoCameras.bind(this);
        this.membersList = membersList;
        this.photoCameraList = photoCameraList;
        this.videoCameraList = videoCameraList;
        for(let i=0; i<membersList.length; i++){
            this.members[i] = {member: membersList[i]};
        }
    }

    attachPhotoCameras(currentIndex:number, aPhotoCamera:string[]){
       // adding videoCamera to 
       if(aPhotoCamera.length>0){
           for(let i=0; i<aPhotoCamera.length; i++){
            //this.members[currentIndex].photocamera = aPhotoCamera[i];
           }
       }

    }
    attachVideoCameras(){
        
    }
}