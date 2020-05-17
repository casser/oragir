import {JourneyShort,  Member, Camera} from "../../api/Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle} from "../components/Inputs";
import {JMember} from "./Member";
import {noteListArr} from "../modelData/tblOragir";
import {newJourneyForm} from "./Journey";
/*
export interface JourneyShort{
    id: string,
    start_day: Date,
    end_day?: Date,
    name: string,
}
// json from database
{
    "jorn_id":"6",
    "j_name":"Արևմտյան Հայաստան 2010",
    "country":"Թուրքիա",
    "date_from":"2010-10-20",
    "date_to":null,
    "ph_author":"Սամվել Կարապետյան",
    "notes":"20.10.2010
}
*/
export interface Journey{
    jorn_id:number,
    j_name:string,
    country:string,
    ph_author:string,
    notes:string,
    date_from:Date,
    date_to?:Date
}
//
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
//
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
//
//
export function findJourneyById(id:number, aJourney:Journey[]):Journey | undefined {
    for(let i:number=0; i<aJourney.length; i++){
        if(id == aJourney[i].jorn_id){
            return aJourney[i];
        }
    }
}
//
export function convertJsonToJourney(aJSON:any[]):Journey[] {
    let bb:any[]=[];
    let a:Journey;
    let aa:Journey[]=[];
    for(let i:number=0; i<aJSON.length; i++){
        bb[i] = JSON.parse(JSON.stringify(aJSON[i]));
    } 
    for(let i:number=0; i<bb.length; i++){
        aa[i]={
            country: bb[i].country.toString(),
            date_from: new Date(),
            //date_to: new Date(),
            j_name: bb[i].j_name.toString(),
            jorn_id: Number(bb[i].jorn_id),
            notes: bb[i].notes.toString(),
            ph_author: bb[i].ph_author.toString()
        }
        let oo:string[] = (bb[i].date_from).split("-")
        aa[i].date_from=new Date();
        aa[i].date_from.setFullYear(Number(oo[0]));
        aa[i].date_from.setMonth(Number(oo[1]));
        aa[i].date_from.setDate(Number(oo[2]));
        aa[i].date_from.setHours(0);
        aa[i].date_from.setMinutes(0);
        aa[i].date_from.setSeconds(1);
        oo=[];
        //
        if(bb[i].date_to !== undefined && bb[i].date_to != null){
            let cc:string[] = (bb[i].date_to).split("-")
            aa[i].date_to=new Date();
            aa[i].date_to.setFullYear(Number(cc[0]));
            aa[i].date_to.setMonth(Number(cc[1]));
            aa[i].date_to.setDate(Number(cc[2]));
            aa[i].date_to.setHours(23);
            aa[i].date_to.setMinutes(59);
            aa[i].date_to.setSeconds(59);

            cc=[];
        }
    }  
    return aa;
}
export var jListArr:any=[
    {
        "jorn_id":"6",
        "j_name":"Արևմտյան Հայաստան 2010",
        "country":"Թուրքիա",
        "date_from":"2010-10-20",
        "date_to":null,
        "ph_author":"Սամվել Կարապետյան",
        "notes":"20.10.2010. Վաղ առավոտյան 16 անդամներից բաղկացած մեր խումբը ճանապարհվեց դեպի Արևմտյան Հայաստան: Սահմանն անցանք բարեհաջող և սովորականի նման գիշերեցինք Արդահանի անտառում:"
    },
    {
        "jorn_id":"5",
        "j_name":"Պարսկաստան 2010",
        "country":"Իրան",
        "date_from":"2010-06-05",
        "date_to":"2010-07-04",
        "ph_author":"Սամվել Կարապետյան",
        "notes":"6 անդամներից բաղկացած արշավախումբը` Սամվել Կարապետյան, Րաֆֆի Քորթոշյան, Աշոտ Հակոբյան, Հայկ Թորոսյան, Անուշ Համբարձումյան և Էմմա Աբրահամյան Ֆորդ-տրանզիտ մեքենայով ճանապարհվեց դեպի Իրան:"
    },
    {
        "jorn_id":"7",
        "j_name":"Արևմտյան Հայաստան",
        "country":"Թուրքիա",
        "date_from":"2010-07-28",
        "date_to":"2010-08-25",
        "ph_author":"Սամվել Կարապետյան",
        "notes":"28.07.2010. Վաղ առավոտյան 6 անդամներից բաղկացած մեր արշավախումբը (Սամվել Կարապետյան, Րաֆֆի Քորթոշյան, Աշոտ Հակոբյան, Հայկ Թորոսյան, Անուշ Համբարձումյան և Էմմա Աբրահամյան) Ֆորդ-տրանզիտ մեքենայով ճանապարհվեց դեպի Արևմտյան Հայաստան: Սահմանն անցանք և գիշերեցի"
    },
    {
        "jorn_id":"8",
        "j_name":"Հնդկաստան 2011",
        "country":"Հնդկաստան",
        "date_from":"2011-02-09",
        "date_to":"2011-03-02",
        "ph_author":"Սամվել Կարապետյան",
        "notes":"Փետրվարի 9-ի գիշերը Դելհիի օդակայանում վեց հոգուց բաղկացած մեր խմբին դիմավորեց Հնդկաստանում Հայաստանի Հանրապետության դեսպան Արա Հակոբյանի օգնական` Դավիթ .....յանը, որն երկու մեքենաներով մեզ առաջնորդեց վաղօրոք մեզ համար պատվիրված քաղաքի հյուրանոցը:"},
    {
        "jorn_id":"9",
        "j_name":"Պարսկաստան 2011",
        "country":"Իրան",
        "date_from":"2011-06-10",
        "date_to":"2011-07-10",
        "ph_author":"Սամվել Կարապետյան",
        "notes":"Երևանից դուրս եկանք ժամը մոտ 11-ին: Ժամը 19.25-ին գիշերատեղ ընտրեցինք ճանապարհի ձախ եզրին գտնվող մի գյուղատեղիի մոտ, որտեղ կար նաև միանավ, զույգ ավանդատներով կանգուն մի եկեղեցի:"}
]    
export class KeyValueTable{
    parent:HTMLElement;
    key:string;
    val:string;
    keyWidth:number;
    valWidth:number;
    isPixel:boolean; // if==true: "px" // else: "%";
    table:HTMLTableElement;            // Table
    row: HTMLTableRowElement;           // Row
    keyCell: HTMLTableCellElement;      // Cell
    valCell: HTMLTableCellElement;      // Cell
    cssTable:string;    // css class
    cssRow:string;    // css class
    cssCellKey:string;    // css class
    cssCellVal:string;    // css class
    constructor(parentDiv:HTMLElement,
                key:string,
                val:string,
                wKey:number=150,
                wVal:number=400, 
                isMeasurementPx:boolean = true){
        this.parent = parentDiv;
        this.key = key;
        this.val = val;
        this.keyWidth = wKey;
        this.valWidth = wVal;
        this.isPixel=isMeasurementPx;
        this.cssTable="w3-table w3-margin-left w3-margin-right";
        this.cssRow="w3-border-bottom";
        this.cssCellKey="w3-right-align";
        this.cssCellVal="b";
        // making table with two rows
        this.table = document.createElement("table") as HTMLTableElement;
        this.row = document.createElement("tr") as HTMLTableRowElement;
        this.keyCell = document.createElement("td") as HTMLTableCellElement;
        this.valCell = document.createElement("td") as HTMLTableCellElement;
        this.table.setAttribute("class", this.cssTable);
        this.table.appendChild(this.row);
        this.row.setAttribute("class", this.cssRow);
        this.row.appendChild(this.keyCell);
        this.row.appendChild(this.valCell);
        this.keyCell.setAttribute("class", this.cssCellKey);
        this.valCell.setAttribute("class", this.cssCellVal);
        //this.keyCell.style.width=this.keyWidth.toString();
        //this.valCell.style.width=this.valWidth.toString();
        this.keyCell.setAttribute("width", this.keyWidth.toString());
        this.valCell.setAttribute("width", this.valWidth.toString());
        this.keyCell.innerHTML=this.key;
        this.valCell.innerHTML=this.val;
        this.parent.appendChild(this.table);
        //
    }
}
//
export class NoteDetails{
    parentDiv:HTMLDivElement;
    keyVal:KeyValueTable[]=[];
    contentBlock:HTMLDivElement;
    note:Note;
    constructor(parent:HTMLDivElement, note:Note){
        this.parentDiv = parent;
        this.note = note;
    }

}
//
export class JourneyDetails{
    parentDiv: HTMLDivElement;
    title: string;
    btnDetails: HTMLButtonElement; // Ճամփորդության մանրամասները
    btnNotes: HTMLButtonElement; // Ճամփորդության Օրագիրը
    notesContainer: HTMLDivElement;
    titleBlock: HTMLDivElement;
    contentBlock: HTMLDivElement;
    keyVal: KeyValueTable[] = [];
    journey:Journey;
    constructor(parent:HTMLDivElement, journey:Journey){
        this.titleBlock = document.createElement('div');
        //this.titleBlock.innerHTML="Journey details";
        this.btnDetails = document.createElement("button");
        this.btnDetails.textContent = "Journey Details";
        this.btnDetails.setAttribute("class", "w3-button w3-white w3-border w3-border-green w3-round-large submenu_button");
        this.btnNotes = document.createElement("button");
        this.btnNotes.textContent = "Journey Notes";
        this.btnNotes.setAttribute("class", "w3-button w3-white w3-border w3-round-large submenu_active submenu_button");
        this.titleBlock.appendChild(this.btnDetails);
        this.titleBlock.appendChild(this.btnNotes);
        this.titleBlock.setAttribute("class","w3-container w3-text-green")
        this.contentBlock = document.createElement('div');
        this.parentDiv = parent;
        let ii:number = 0;
        // .toISOString().split('T')[0]
        
        for (let [key, value] of Object.entries(journey)) {
            if(key=="date_from"){
                value=value.toISOString().split('T')[0];
            }
            if(key=="date_to"){
                if(value == "undefined"){
                    value = "Չի նշված";
                }
                else{
                    value = value.toISOString().split('T')[0];
                }
                
            }
            this.keyVal[ii] = new KeyValueTable(this.contentBlock, key, value );
            ii++;
            console.log(`${key}: ${value}`);
        }
        this.parentDiv.appendChild(this.titleBlock);
        this.parentDiv.appendChild(this.contentBlock);
    }
}
//
export class JourneyLine{
    parentDiv: HTMLDivElement;    // The Parent Div Element
    lineContainer:HTMLDivElement;
    detailedPreviewDiv:HTMLDivElement;
    journeyData:JourneyShort;           // data structure
    editButton:HTMLButtonElement;       // Button
    openButton:HTMLButtonElement;       // Button
    closeButton:HTMLButtonElement;      // Button
    btnClosedOpened:HTMLButtonElement;        // Image when State is Open: isOpened = true
    //
    modalEditDialog:HTMLDivElement;     // modal block
    modalContent:HTMLDivElement;
    modalHeader:HTMLHeadingElement;
    modalContentContainer:HTMLDivElement;
    modalFooter:HTMLFontElement;
    modalCloseIcon:HTMLSpanElement;
    //minusOpened: HTMLImageElement;      // Image when Sate is Closed: isOpened = false
    table: HTMLDivElement;              // Table
    row: HTMLDivElement;                // Row
    cellArrow: HTMLDivElement;            // Cell
    cellDateFrom: HTMLDivElement;         // Cell
    cellDateTo: HTMLDivElement;           // Cell
    cellDescription: HTMLDivElement;      // Cell
    cellEdit: HTMLDivElement;             // Cell
    isOpened: boolean;                  // State Variable
    cssTable:string;    // css class
    cssRow:string;    // css class
    cssCell:string;    // css class
    id:string;
    journey:Journey | undefined;
    journeyDetails:JourneyDetails;
    constructor(parentContainer: HTMLDivElement, 
                data:Journey) {
        this.parentDiv = parentContainer;
        this.lineContainer = document.createElement("div");
        this.lineContainer.setAttribute("class", " w3-border-bottom")
        this.detailedPreviewDiv = document.createElement("div");
        this.detailedPreviewDiv.style.display = "none";
        // modal
        this.modalEditDialog=document.createElement("div");
        this.modalEditDialog.setAttribute("class", "w3-modal");
        this.modalContent = document.createElement("div") as HTMLDivElement;
        this.modalContent.setAttribute("class", "w3-modal-content");
        
        this.modalHeader = document.createElement("header") as HTMLHeadingElement;
        this.modalHeader.setAttribute("class", "w3-container w3-green");
        this.modalHeader.innerHTML=`<h5>Modal Header</h5>`;

        this.modalCloseIcon = document.createElement("span") as HTMLSpanElement;
        this.modalCloseIcon.setAttribute("class", "w3-button w3-display-topright");
        this.modalCloseIcon.innerHTML="&times;";
        this.modalHeader.appendChild(this.modalCloseIcon);

        this.modalContentContainer = document.createElement("div") as HTMLDivElement;
        this.modalContentContainer.setAttribute("class", "w3-container am_12");
        
        //this.modalContentContainer.innerHTML="Modal Content<br>Modal Content<br>Modal Content<br>Modal Content<br>Modal Content<br>";
        
        this.modalFooter = document.createElement("footer") as HTMLFontElement;
        this.modalFooter.setAttribute("class", "w3-container w3-green");
        this.modalFooter.innerHTML=`<p>Modal Footer</p>`;
        
        this.modalEditDialog.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalContent.appendChild(this.modalContentContainer);
        this.modalContent.appendChild(this.modalFooter);
        this.lineContainer.appendChild(this.modalEditDialog);
        this.modalEditDialog.style.display="none";
        this.modalCloseIcon.onclick=()=>{
            this.modalEditDialog.style.display="none";
        }

        //
        this.table = document.createElement("div") as HTMLDivElement;
        this.row  = document.createElement("div") as HTMLDivElement;
        this.cellArrow = document.createElement("div") as HTMLDivElement;
        this.cellDateFrom = document.createElement("div") as HTMLDivElement;
        this.cellDateTo  = document.createElement("div") as HTMLDivElement;
        this.cellDescription  = document.createElement("div") as HTMLDivElement;
        this.cellEdit  = document.createElement("div") as HTMLDivElement;
        this.journeyData = {
            id: data.jorn_id.toString(),
            start_day: data.date_from,
            name: data.j_name
        }
        this.id = this.journeyData.id;
        this.journey = findJourneyById(Number(this.id), convertJsonToJourney(jListArr));
        let j_to:string|undefined = this.journey.date_to == undefined ? "not set" : this.journey.date_to.toISOString().split('T')[0];
        this.modalContentContainer.innerHTML=`id: <b>${this.journey.jorn_id.toString()}</b>
                                                <br>Երկիր - <b>${this.journey.country.toString()}</b>
                                                <br> սկիզբ - <b>${this.journey.date_from.toISOString().split('T')[0]}</b> - ավարտ <b>${j_to}</b>
                                                <br> անունը - <b>${this.journey.j_name}</b>
                                                <br>նշումներ - <b>${this.journey.notes}</b>
                                                <br>ղեկավարը - <b>${this.journey.ph_author}</b>`;
        if(data.date_to != undefined && data.date_to != null){
            this.journeyData.end_day = data.date_to;
        }
        // css
        this.cssTable="tableDiv w3-table";
        this.cssRow="rowDiv";
        this.cssCell="rowCell";
        this.table.setAttribute("class", this.cssTable);
        this.row.setAttribute("class", this.cssRow);
        this.cellArrow.setAttribute("class", `${this.cssCell}`);
        this.cellArrow.style.width="60px";
        //this.cellArrow.innerHTML=">";
        this.cellDateFrom.setAttribute("class", this.cssCell);
        this.cellDateFrom.style.width="150px";
        this.cellDateFrom.innerHTML=this.journeyData.start_day.toISOString().split('T')[0];
        this.cellDateTo.setAttribute("class", this.cssCell);
        this.cellDateTo.style.width="150px";
        if(this.journeyData.end_day){
            this.cellDateTo.innerHTML=this.journeyData.end_day.toISOString().split('T')[0];
        }
        else{
            this.cellDateTo.innerHTML="չի նշված";
        }
        this.cellDescription.setAttribute("class", this.cssCell);
        this.cellDescription.innerHTML=this.journeyData.name;
        this.cellEdit.setAttribute("class", this.cssCell);

        //buttons
        this.btnClosedOpened = document.createElement("button") as HTMLButtonElement;
        this.btnClosedOpened.setAttribute("class", "w3-button w3-ripple w3-white w3-round-xxlarge w3-text-green");
        this.btnClosedOpened.textContent="+";
        this.cellArrow.appendChild(this.btnClosedOpened);
        //this.plusClosed.src="closed.png";
        //this.minusOpened.src="../icons/opened.png";
        // buttons
        this.editButton = document.createElement("button") as HTMLButtonElement;
        this.editButton.setAttribute("class", "w3-button w3-ripple w3-white w3-round-xxlarge w3-text-green submenu_button");
        this.editButton.textContent="Edit";
        this.cellEdit.appendChild(this.editButton);
        this.cellEdit.style.width="30px";
        this.openButton = document.createElement("button") as HTMLButtonElement;
        this.closeButton = document.createElement("button") as HTMLButtonElement;
        // state
        this.isOpened = false;
        //
        this.table.appendChild(this.row);
        this.row.appendChild(this.cellArrow);
        this.row.appendChild(this.cellDateFrom);
        this.row.appendChild(this.cellDateTo);
        this.row.appendChild(this.cellDescription);
        this.row.appendChild(this.cellEdit);
        this.lineContainer.appendChild(this.table);
        this.lineContainer.appendChild(this.detailedPreviewDiv);
        //
        if(this.journey !== undefined){
            this.journeyDetails = new JourneyDetails( this.detailedPreviewDiv, this.journey);
        }
        else{
            this.detailedPreviewDiv.innerHTML=` Journey with id = ${this.id} not found`;
        }
        this.parentDiv.appendChild(this.lineContainer);
        this.btnClosedOpened.onclick=()=>{
            if(this.isOpened == false){
                console.log("open clicked");
                this.detailedPreviewDiv.style.display="block";
                this.btnClosedOpened.textContent="|";
                // border
                this.lineContainer.setAttribute("class", "w3-leftbar w3-border-green  w3-border-bottom  w3-border-top")
            }
            else{
                console.log("Close Button clicked");
                this.detailedPreviewDiv.style.display="none";
                this.btnClosedOpened.textContent="+";
                // border
                this.lineContainer.setAttribute("class", "w3-border-bottom")
            }
            this.isOpened = !this.isOpened;
        }
        this.editButton.onclick=()=>{
            this.modalEditDialog.style.display="block";
            console.log(this.journeyData );
        }
    }
}
//
export class JourneyList{
    parentContainer: HTMLDivElement;
    container:HTMLDivElement;
    headerContainer: HTMLDivElement;
    addButton:HTMLButtonElement;
    //journey: JourneyShort; 
    journeyLine: JourneyLine[]=[];
    formHead: string;
    //
    aData:Journey[];
    //
    constructor(parentContainer: HTMLDivElement, data:Journey[]) {
        //this.makeSubTitle = this.makeSubTitle.bind(this);
        this.parentContainer = parentContainer as HTMLDivElement;
        this.container = document.createElement("div");
        //this.container.setAttribute("class", "w3-border w3-light-grey");
        this.parentContainer.appendChild(this.container);
        this.aData = data;    // array of Journey interface objects to display in page as one Row Tables
        for(let i=0; i<this.aData.length; i++){
            this.journeyLine[i] = new JourneyLine(this.container, this.aData[i]);
        }
     }
    // 
}
//
export class JourneyListTitle{
    parentContainer:HTMLElement;
    mainContainer:HTMLDivElement;
    colTitle:HTMLDivElement;
    colButton:HTMLDivElement;
    btnAddJourney:HTMLButtonElement;
    //
    // modal block
    modalNewDialog:HTMLDivElement;     //
    modalContent:HTMLDivElement;
    modalHeader:HTMLHeadingElement;
    modalContentContainer:HTMLDivElement;
    modalFooter:HTMLFontElement;
    modalCloseIcon:HTMLSpanElement;
    //
    newJourneFormModal:newJourneyForm;
/*
this.newJourneFormModal = new newJourneyForm(this.modalContentContainer);
*/
    //
    constructor(parent:HTMLElement){
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        this.colTitle = document.createElement('div');
        this.colTitle.setAttribute("class","w3-col s6 w3-text-green");
        this.colTitle.innerHTML="ՀՃՈՒ ԲՈԼՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆՆԵԸ";
        this.colButton = document.createElement('div');
        this.colButton.setAttribute("class","w3-col s6  right_align");
        this.parentContainer.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.colTitle);
        this.mainContainer.appendChild(this.colButton);
        //this.mainContainer.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        this.btnAddJourney = document.createElement('button');
        this.btnAddJourney.textContent="ՆՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ";
        this.btnAddJourney.setAttribute("class", "w3-button w3-ripple w3-round-xxlarge w3-text-green w3-border submenu_button ")
        this.colButton.appendChild(this.btnAddJourney);
        // modal
        this.modalNewDialog=document.createElement("div");
        this.modalNewDialog.setAttribute("class", "w3-modal");
        this.modalContent = document.createElement("div") as HTMLDivElement;
        this.modalContent.setAttribute("class", "w3-modal-content  w3-light-grey");
        
        this.modalHeader = document.createElement("header") as HTMLHeadingElement;
        this.modalHeader.setAttribute("class", "w3-container w3-green");
       this.modalHeader.innerHTML=`<h5>Նոր ճամփորդության գրանցում</h5>`;

        this.modalCloseIcon = document.createElement("span") as HTMLSpanElement;
        this.modalCloseIcon.setAttribute("class", "w3-button w3-display-topright");
        this.modalCloseIcon.innerHTML="&times;";
        this.modalHeader.appendChild(this.modalCloseIcon);

        this.modalContentContainer = document.createElement("div") as HTMLDivElement;
        this.modalContentContainer.setAttribute("class", "w3-container");
       // this.modalContentContainer.innerHTML="Modal Content New Journey<br>Modal Content<br>Modal Content<br>Modal Content<br>Modal Content<br>";
        
        this.modalFooter = document.createElement("footer") as HTMLFontElement;
        this.modalFooter.setAttribute("class", "w3-container w3-green");
        //this.modalFooter.innerHTML=`<p>Modal Footer new Journey</p>`;
        
        this.modalNewDialog.appendChild(this.modalContent);
       this.modalContent.appendChild(this.modalHeader);
        this.modalContent.appendChild(this.modalContentContainer);
        this.modalContent.appendChild(this.modalFooter);
        this.parentContainer.appendChild(this.modalNewDialog);
        this.newJourneFormModal = new newJourneyForm(this.modalContentContainer);
        this.modalNewDialog.style.display="none";
        this.modalCloseIcon.onclick=()=>{
            this.modalNewDialog.style.display="none";
        }
        this.btnAddJourney.onclick=()=>{
            this.modalNewDialog.style.display="block";
        }
        //
    }
}
    
