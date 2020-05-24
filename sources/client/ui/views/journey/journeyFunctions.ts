import {Journey} from "../../../api/Api";


export function findJourneyById(id:number, aJourney:Journey[]):Journey | undefined {
    for(let i:number=0; i<aJourney.length; i++){
        if(id == Number(aJourney[i].id)){
            return aJourney[i];
        }
    }
}
//
export function convertJsonToJourney(aJSON:any[]):Journey[] {
    let bb:any[]=[];
    //let a:Journey;
    let aa:any[]=[];    //any ==  Journey[] 
    for(let i:number=0; i<aJSON.length; i++){
        bb[i] = JSON.parse(JSON.stringify(aJSON[i]));
    } 
    for(let i:number=0; i<bb.length; i++){
        aa[i]={
            country: bb[i].country.toString(),
            start_day: new Date(),
            //end_day: new Date(),
            name: bb[i].j_name.toString(),
            id: bb[i].jorn_id,
            description: bb[i].notes.toString(),
            group_head: bb[i].ph_author.toString()
        }
        let oo:string[] = (bb[i].date_from).split("-")
        aa[i].start_day=new Date();
        aa[i].start_day.setFullYear(Number(oo[0]));
        aa[i].start_day.setMonth(Number(oo[1]));
        aa[i].start_day.setDate(Number(oo[2]));
        aa[i].start_day.setHours(0);
        aa[i].start_day.setMinutes(0);
        aa[i].start_day.setSeconds(1);
        oo=[];
        //
        if(bb[i].date_to !== undefined && bb[i].date_to != null){
            let cc:string[] = (bb[i].date_to).split("-")
            aa[i].end_day=new Date();
            aa[i].end_day.setFullYear(Number(cc[0]));
            aa[i].end_day.setMonth(Number(cc[1]));
            aa[i].end_day.setDate(Number(cc[2]));
            aa[i].end_day.setHours(23);
            aa[i].end_day.setMinutes(59);
            aa[i].end_day.setSeconds(59);

            cc=[];
        }
    }  
    return aa;
}