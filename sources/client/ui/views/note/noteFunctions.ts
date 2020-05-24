import {Note} from "../../../api/Api";

export function findNotesByJournId(journId:number, aNotes:Note[]):Note[] | undefined {
    let notes:Note[]=[];
    for(let i:number=0; i<aNotes.length; i++){
        if(journId == aNotes[i].jorn_id){
            notes.push(aNotes[i]);
        }
    }
    if(notes.length>0){
        return notes;
    }
}

export function findNoteById(id:number, aNote:Note[]):Note | undefined {
    for(let i:number=0; i<aNote.length; i++){
        if(id == aNote[i].note_id){
            return aNote[i];
        }
    }
}
//
export function findJsonById(idName:string, idValue:string, aNote:any[]):any[] | undefined {
    let aJson:any[]=[];
    for(let i:number=0; i<aNote.length; i++){
        console.info(aNote[i].idName)
        if(idValue == aNote[i].idName){
            aJson.push(aNote[i]);
        }
    }
    if(aJson.length>0){
        return aJson;
    }
}
/*
export interface Note{
    note_id:number,
    jorn_id:number,
    region?:string,
    district?:string,
    settlement?:string,
    type?:string,
    name?:string,
    description?:string,
    dateFrom:Date,
    dateTo:Date,
    parallel?:number,
    meridian?:number,
    userId:number,
    inputDate:Date
}
export var noteListArr:any[] = [
{
    "or_id":"17",
    "jorn_id":"5",
    "montype":"",
    "name":"",
    "region":"",
    "district":"",
    "settlement":"Թեհրան",
    "date_from":"2010-06-07 19:30:00",
    "date_to":"2010-06-09 01:59:00",
    "description":"Առավոտյան 7:30 Արան եկավ և միասին գնացինք ոստիկանատուն: Օրվա կեսն անցավ մինչև հաջողվեց ստանալ մեքենայի պարսկական համարը: Արային հրաժեշտ տալուց հետո շարժվեցինք Թեհրան և ուշ երեկոյան հասանք քաղաք: Քաղաքի մոտ մեզ դիմավորեցին Շերլի Ավետյանը և Ասպետ Հովսեփյանը: Նրանց ուղեկցությամբ հասանք Թեհրանի Սբ. Աստվածածին եկեղեցու բակում գտնվող «Վաչե Հովսեփյան» համալիրի հյուրանոց, որտեղ էլ գիշերեցինք:",
    "parallel":"0",
    "meridian":"0",
    "user_id":"58",
    "input_date":"2010-10-05 13:55:52"
},
*/
//
export function convertJsonToNote(aJSON:any[]):Note[] {
    let bb:any[]=[];
    //let a:Journey;
    let aa:any[]=[];    //any ==  Journey[] 
    for(let i:number=0; i<aJSON.length; i++){
        bb[i] = JSON.parse(JSON.stringify(aJSON[i]));
    } 
    for(let i:number=0; i<bb.length; i++){
        aa[i]={
            note_id: bb[i].or_id,
            jorn_id: bb[i].jorn_id,
            dateFrom: new Date(),
            dateTo: new Date(),
            userId:Number(bb[i].user_id),
            inputDate: new Date(bb[i].input_date)
        }
        let oo:string[] = (bb[i].date_from).split("-")
        aa[i].dateFrom = new Date();
        aa[i].dateFrom.setFullYear(Number(oo[0]));
        aa[i].dateFrom.setMonth(Number(oo[1]));
        aa[i].dateFrom.setDate(Number(oo[2]));
        aa[i].dateFrom.setHours(0);
        aa[i].dateFrom.setMinutes(0);
        aa[i].dateFrom.setSeconds(1);
        oo=[];
        //
        if(bb[i].date_to != undefined){
            let cc:string[] = (bb[i].date_to).split("-")
            aa[i].dateTo = new Date();
            aa[i].dateTo.setFullYear(Number(cc[0]));
            aa[i].dateTo.setMonth(Number(cc[1]));
            aa[i].dateTo.setDate(Number(cc[2]));
            aa[i].dateTo.setHours(23);
            aa[i].dateTo.setMinutes(59);
            aa[i].dateTo.setSeconds(59);
            cc=[];
        }
        //
        if(bb[i].region != undefined){
            aa[i].region = bb[i].region;
        }
        if(bb[i].district != undefined){
            aa[i].district = bb[i].district;
        }
        if(bb[i].settlement != undefined){
            aa[i].settlement = bb[i].settlement;
        }
        if(bb[i].type != undefined){
            aa[i].type = bb[i].type;
        }
        if(bb[i].name != undefined){
            aa[i].name = bb[i].name;
        }
    }  
    return aa;
}