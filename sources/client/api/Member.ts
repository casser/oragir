import {Member, Camera} from "./Api";
/*
export interface Member{
    id?: string,
    member: string, // unique
    photocamera?: Array<Camera>,
    videocamera?: Array<Camera>
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
export class JMember{
    parent_container: HTMLElement;  //? user for making view of one instance
    member:Member;                  // from database.tbl_members
    cameraList:Camera[];       // to insert into tbl_jorn_mem_cam
    journ_id:number;                // tbl_jorney.jorn_id - after inserting into tbl_jorney
    
    // form
    membersBlock : HTMLDivElement;
    membersFormTable : HTMLTableElement;

    constructor(member:Member, 
                journ_id:number,
                cameraList:Camera[],
                parent_container: HTMLElement){
        this.attachCameras = this.attachCameras.bind(this);
        this.member = member;
        this.journ_id = journ_id;
        this.cameraList = cameraList;
        this.parent_container = parent_container;
    }
    //
    attachCameras(camera:Camera){
       // checking if the same camera is available
       // adding videoCamera to 
       let aNames:string[] = [];
       if(this.cameraList.length>0){
           for(let i=0; i<this.cameraList.length; i++){
            aNames.push(this.cameraList[i].name);
           }
       }
       if(aNames.includes(camera.name)){
           console.info("The same camera is allready attached");
       }
       else{
        this.cameraList.push(camera);
       }
    }
    //
    removeCamera(camera:Camera){
       this.cameraList = this.cameraList.filter(obj => obj !== camera);
    }
    //
    preview(){
        // here code to make a table wih one row and columns
        // member name, cmera_name(s) (vid|Photo), this journey name

    }
}