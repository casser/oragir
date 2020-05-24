
import {JourneyList} from "./JourneyList";  // class
import {JourneyListTitle} from "./journeyListTitle";
import {Journey, Note} from "../../../api/Api";  // interface
import {convertJsonToJourney} from "./journeyFunctions";  //  function
import {jListArr} from "../../modelData/jLisArray";  // Json Array of journeys / ALL
import {noteListArr} from "../../modelData/tblOragir"; // json array of notes  / ALL
/*
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
}
*/
import {convertJsonToNote, findJsonById, findNotesByJournId, findNoteById} from "../note/noteFunctions";
//import {NoteList} from "../Notes";
import {NoteList} from "../note/noteList";
import {NoteListTitle} from "../note/noteListTitle";
import {Pagination} from "./pagination";

export interface selectedJourneyId {
    id:number;
};
var jornId:selectedJourneyId={
    id:0
}
//import {NewJourneyForm} from "./newJourneyForm";
//
export class JourneyPage{
    parentContainer:HTMLElement;
    mainContainer:HTMLElement;
    headerContainer:HTMLDivElement;
    tileContainer:HTMLDivElement;
    listTitle:JourneyListTitle;
    contentContainer:HTMLDivElement;
    footerContainer:HTMLDivElement;
    
    journeyList:JourneyList;
    titleMenu:String;
    //notes
    noteList:NoteList;
    noteListTitle:NoteListTitle;
    titleContainerNote:HTMLDivElement;
    contentContainerNote:HTMLDivElement;
    footerContainerNote:HTMLDivElement;
    paging:Pagination;
    startNum:number;
    notesPerPage:number


    // view mode
    viewJourneyMode:boolean; // ===false -> show Notes

    aNoteButtons:HTMLButtonElement[]=[];

    constructor(parent:HTMLElement){
        this.showNotes = this.showNotes.bind(this);
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        //this.headerContainer = document.createElement('div');
        this.tileContainer = document.createElement('div');
        this.tileContainer.setAttribute("class", "w3-container  menublock");
        this.getTitle = this.getTitle.bind(this);
        this.show=this.show.bind(this);
        this.hide=this.hide.bind(this);
        this.hideJourneyPage = this.hideJourneyPage.bind(this);
        this.showJourneyPage = this.showJourneyPage.bind(this);
        this.hideNotePage = this.hideNotePage.bind(this);
        this.showNotePage = this.showNotePage.bind(this);
        this.viewJourneyMode=true;
        //
        this.listTitle = new JourneyListTitle(this.tileContainer) as JourneyListTitle;
        this.titleMenu = "ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ";
        this.parentContainer.appendChild(this.mainContainer);
    
        this.contentContainer = document.createElement('div');
        this.contentContainer.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        
        this.footerContainer = document.createElement('div');
        this.footerContainer.setAttribute("class", "w3-bar w3-light-gray w3-card-2 menublock");
        this.footerContainer.innerHTML="Footer RAA";

        //note containers
        this.titleContainerNote = document.createElement('div');
        this.contentContainerNote = document.createElement('div');
        this.footerContainerNote = document.createElement('div');
        this.titleContainerNote.setAttribute("class", "w3-container  menublock");
        this.contentContainerNote.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        this.footerContainerNote.setAttribute("class", "w3-bar w3-light-gray w3-card-2 menublock");
        this.footerContainerNote.innerHTML = "Note Footer RAA";
        // note paging
        this.startNum=0;
        this.notesPerPage = 10;

        //
        this.mainContainer.appendChild(this.tileContainer);
        this.mainContainer.appendChild(this.contentContainer);
        this.mainContainer.appendChild(this.footerContainer);
        //
        this.mainContainer.appendChild(this.titleContainerNote);
        this.mainContainer.appendChild(this.contentContainerNote);
        this.mainContainer.appendChild(this.footerContainerNote);
        //
        this.titleContainerNote.style.display="none";
        this.contentContainerNote.style.display="none";
        this.footerContainerNote.style.display="none";
        //this.showJourneyPage();
        console.info("JourneyPage class Called!");
        console.info(jListArr);
        let aa:Journey[] = convertJsonToJourney(jListArr);
        console.info(aa);
        for(let i:number = 0; i<aa.length; i++){
            this.aNoteButtons[i] = document.createElement("button");
            this.aNoteButtons[i].onclick=()=>{
                this.showNotes(aa[i].id, aa[i], noteListArr);
            }
        }
        this.journeyList = new JourneyList(this.contentContainer, aa, this.aNoteButtons);
    }
    //
    showNotes(id:string, jorn:Journey, jsonArray:any[]){
        let aa:any[]|undefined = convertJsonToNote(jsonArray);
        let bb:Note[]= findNotesByJournId(Number(id), aa);
        let bb_part:Note[]=[];
        if(bb.length>this.notesPerPage){
            // show paging
            // retrieving portion to show
            let k:number=0;
            for(let i:number = this.startNum; i < (this.startNum + this.notesPerPage); i++){
                bb_part[k]=bb[i];
                k++;
            }
        }
        while (this.titleContainerNote.firstChild) {
            this.titleContainerNote.removeChild(this.titleContainerNote.firstChild);
        }
        while (this.contentContainerNote.firstChild) {
            this.contentContainerNote.removeChild(this.contentContainerNote.firstChild);
        }
        
        this.noteListTitle = new NoteListTitle(this.titleContainerNote, jorn, this.startNum, this.notesPerPage);
        this.noteList = new NoteList(this.contentContainerNote, bb_part);
        this.paging = new Pagination(this.noteListTitle.getPagingContainer(), this.startNum)
        this.showNotePage(); //ok()
        console.log(`show notes clicked with journey is =${id}`);
        console.log(bb);
        console.log(bb_part);
    }
    getTitle(){
        return this.titleMenu;
    }
    show(){
        this.mainContainer.style.display="block";
        if(this.viewJourneyMode === false){
            this.showJourneyPage();
            this.viewJourneyMode=true;
        }
    }
    hide(){
        this.mainContainer.style.display="none";
    }

    hideJourneyPage(){
        console.log("hideJourneyPage() Called");
        this.tileContainer.style.display="none";
        this.contentContainer.style.display="none";
        this.footerContainer.style.display="none";
        //this.mainContainer.innerHTML="Journey container is hidden"; // test 
        this.viewJourneyMode=false;
    }
    showJourneyPage(){
        console.log("showJourneyPage() Called");
        this.tileContainer.style.display="block";
        this.contentContainer.style.display="block";
        this.footerContainer.style.display="block";
        this.hideNotePage();
        this.viewJourneyMode=true;
    }
    hideNotePage(){
        console.log("hideJourneyPage() Called");
        delete this.noteListTitle;
        this.titleContainerNote.style.display="none";
        this.contentContainerNote.style.display="none";
        this.footerContainerNote.style.display="none";
    }
    showNotePage(){
        console.log("hideJourneyPage() Called");
        this.hideJourneyPage();
        this.titleContainerNote.style.display="block";
        this.contentContainerNote.style.display="block";
        this.footerContainerNote.style.display="block";
    }
    getNotesByJourneyId(id:number, notes:any[]):Note[] | undefined{
        return
    }
    
}