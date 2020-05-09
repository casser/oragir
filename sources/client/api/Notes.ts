import {NoteInit, Note, NoteShort} from "./Api";
import {selectBlock, inputBlock, subTitle, inputDateTimeBlock, inputAreaBlock} from "./Inputs";
import {SubMenu} from "./SubMenu";
import {geoPointForm} from "./GeoPoint";

/*
export interface NoteShort{
    journey_id: string,
    start_date_time: Date,
    end_date_time: Date,
    short_description: string
}
*/
const noteSampleJSON: NoteShort[] = [
    {   
        id: "3",
        journey_id:"2",
        start_date_time: new Date("2018-10-02 11:58:00"),
        end_date_time: new Date("2018-10-02 12:10:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Իջևանատուն Շահ Աբաս"
    },
    {
        id: "4",
        journey_id:"2",
        start_date_time: new Date("2018-10-02 12:21:00"),
        end_date_time: new Date("2018-10-02 12:35:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Իջևանատուն Շահ Աբաս 2"
    },
    {
        id: "5",
        journey_id:"2",
        start_date_time: new Date("2018-10-02 12:46:00"),
        end_date_time: new Date("2018-10-02 13:12:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Իջևանատուն Շահ Աբաս 3"
    },
    {
        id: "6",
        journey_id:"15",
        start_date_time: new Date("2018-10-02 18:20:00"),
        end_date_time: new Date("2018-10-02 18:30:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։ Գերեզմանոց"
    },
    {
        id: "7",
        journey_id:"15",
        start_date_time: new Date("2018-10-02 18:25:00"),
        end_date_time: new Date("2018-10-02 18:50:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։ Գերեզմանոց 2"
    },
    {
        id: "8",
        journey_id:"39",
        start_date_time: new Date("2018-10-02 18:10:00"),
        end_date_time: new Date("2018-10-02 18:13:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։"
    },
    {
        id: "9",
        journey_id:"39",
        start_date_time: new Date("2018-10-02 19:00:00"),
        end_date_time: new Date("2018-10-02 19:16:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու 2։"
    },
    {
        id: "10",
        journey_id:"39",
        start_date_time: new Date("2018-10-02 19:05:00"),
        end_date_time: new Date("2018-10-02 19:18:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։ 3"
    },
    {
        id: "11",
        journey_id:"39",
        start_date_time: new Date("2018-10-02 19:45:00"),
        end_date_time: new Date("2018-10-02 20:15:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։ 4"
    },
    {
        id: "12",
        journey_id:"39",
        start_date_time: new Date("2018-10-02 18:10:00"),
        end_date_time: new Date("2018-10-02 18:13:00"),
        short_description: "Արևելյան Ատրպատական, Ղարադաղ, Ղալամլու։"
    },
    {
        id: "13",
        journey_id:"332",
        start_date_time: new Date("2018-11-02 14:11:00"),
        end_date_time: new Date("2018-11-02 14:25:00"),
        short_description: "Արևելյան Ատրպատական, Lalala, Lwulwulwu"
    }
]
//
export class NoteNew{
    parent_container: HTMLElement;
    journey_id: string;
    date_time_input:inputDateTimeBlock;
    regionInputElement:inputBlock;
    districtInputElement:inputBlock;
    settlementInputElement:inputBlock;
    typeInputElement:inputBlock;
    nameInputElement:inputBlock;
    geoPointInputElement:geoPointForm;
    descriptionInputElement:inputAreaBlock;
    descriptionElement:inputAreaBlock; // new
    cssClass:string;
    //
    saveNoteBtn:HTMLButtonElement;

    //
    constructor(journey_id: string
                ){
        this.setJourneyId = this.setJourneyId.bind(this);
        this.getContainer = this.getContainer.bind(this);
        this.parent_container = document.createElement("div");
        this.journey_id = journey_id;
        this.cssClass="w3-select  msInput";
        this.date_time_input=new inputDateTimeBlock(this.parent_container, "dt", this.cssClass);
        this.regionInputElement= new inputBlock(this.parent_container,
            "region_name",
            "w3-input w3-border",
            "region_name",
            "Մարզը", "ՄՈՒՏՔԱԳՐԵՔ ՄԱՐԶԻ ԱՆՎԱՆՈՒՄԸ");
        this.districtInputElement= new inputBlock(this.parent_container,
            "district_name",
            "w3-input w3-border",
            "district_name",
            "Շրջանը", "ՄՈՒՏՔԱԳՐԵՔ ՇՐՋԱՆԻ ԱՆՎԱՆՈՒՄԸ");
        this.settlementInputElement= new inputBlock(this.parent_container,
            "settle_name",
            "w3-input w3-border",
            "settle_name",
            "Բնակավայրը", "ՄՈՒՏՔԱԳՐԵՔ ԲՆԱԿԱՎԱՅՐԻ ԱՆՎԱՆՈՒՄԸ․ ՔԱՂԱՔ, ԳՅՈՒՂ, ․․․");
        this.typeInputElement = new inputBlock(this.parent_container,
            "type_name",
            "w3-input w3-border",
            "type_name",
            "Տեսակը", "ՄՈՒՏՔԱԳՐԵՔ ՀՈՒՇԱՐՁԱՆԻ ԿԱՄ ԲՆԱԿԱՎԱՅՐԻ ՏԵՍԱԿԸ․ ԵԿԵՂԵՑԻ, ՎԱՆՔ, ԲԵՐԴ․․․, ՔԱՂԱՔ, ԳՅՈՒՂ, ․․․");
        this.nameInputElement = new inputBlock(this.parent_container,
            "name_name",
            "w3-input w3-border",
            "name_name",
            "Անունը", "ՄՈՒՏՔԱԳՐԵՔ ՀՈՒՇԱՐՁԱՆԻ ԱՆՎԱՆՈՒՄԸ, ԿԱՄ ԱՅԼ ՏԵՂԵԿՈՒԹՅՈՒՆՆԵՐ");
        this.geoPointInputElement = new geoPointForm(this.parent_container);
        //
        this.descriptionInputElement = new inputAreaBlock(this.parent_container,
            "description",
            "w3-input w3-border ",
            "description",
            "Լրացուցիչ նկարագրություն");
        //
        this.saveNoteBtn = document.createElement("button") as HTMLButtonElement;
        this.saveNoteBtn.setAttribute("class", "w3-btn w3-border w3-green");
        this.saveNoteBtn.textContent="ԳՐԱՆՑԵԼ ՆՇՈՒՄԸ"
        this.parent_container.appendChild(this.saveNoteBtn);

        //
        this.saveNoteBtn.addEventListener('click', (e) => {
            //console.info(globalThis);
            //console.info(this);
            console.info(this.regionInputElement.getValue());
            console.info(this.districtInputElement.getValue());
            console.info(this.settlementInputElement.getValue());
            console.info(this.typeInputElement.getValue());
            console.info(this.nameInputElement.getValue());
            console.info(this.geoPointInputElement.getValue());
            console.info(this.descriptionInputElement.getValue());
            e.preventDefault(); //ok
        });
    }
    //
    setJourneyId(journey_id: string){
        this.journey_id = journey_id;
    }
    
    getContainer(){
        return this.parent_container;
    }
}
//
export class NoteList{
    parent_container: HTMLDivElement;
    //selectJourneyContainer:HTMLDivElement;
    list_container:HTMLDivElement;
    pagingContainer:HTMLDivElement;
    rowCount:number;
    start_index:number;
    journey_id: string; // from the select box of journeys list
    
    // The rezult of search is Table with 4 columns
    Col_1_Title:string="Սկիզբ";
    Col_2_Title:string="Ավարտ";
    Col_3_Title:string="Նշում";
    Col_4_Title:string="Խմբ․";
    //
    tblRowHead:HTMLTableRowElement;
    tblCellHead:HTMLTableHeaderCellElement[]=[]; //<th>
    tblRow:HTMLTableRowElement[] = [];
    tbl_line:HTMLTableElement[]= []; // One table foe one row of data
    tblCell_1:HTMLTableCellElement[] = [];  // Date from
    tblCell_2:HTMLTableCellElement[] = [];  // Date to 
    tblCell_3:HTMLTableCellElement[] = [];  // Data Line 
    tblCell_4:HTMLTableCellElement[] = [];  // Edit Buttons column
    //
    constructor(parent_container: HTMLDivElement,
                journey_id: string,
                start_index:number = 0,
                rowCount:number = 10
                ){
        this.show=this.show.bind(this);
        this.hide=this.hide.bind(this);
        this.findObjById = this.findObjById.bind(this);
        this.parent_container = parent_container;
        this.journey_id = journey_id;
        this.start_index = start_index;
        this.rowCount = rowCount;
        /*
    selectJourneyContainer:HTMLDivElement;
    list_container:HTMLDivElement;
    pagingContainer:HTMLDivElement;
        */
       //this.selectJourneyContainer = document.createElement("div");
       //this.selectJourneyContainer.setAttribute("class", "w3-container");
       //
       this.list_container = document.createElement("div");
       this.list_container.setAttribute("class", "w3-container");
       this.list_container.style.display="none";
       //
       this.pagingContainer = document.createElement("div");
       this.pagingContainer.setAttribute("class", "w3-container");
       this.pagingContainer.style.display="none";
    }
    //
    show(){
        this.list_container.style.display = "block";
    }
    //
    hide(){
        this.list_container.style.display = "none";
    }
    //
    findObjById(id:string, aNSH:NoteShort[]):NoteShort[] {
        let nshort:NoteShort[]=[];
        for(let i:number=0; i<aNSH.length; i++){
            if(aNSH[i].journey_id === id){
                nshort.push(aNSH[i]) ;
            }
        }
        if(nshort.length>0){
                    return nshort;
        }
        else{
            return
        }
    }
    //
    makeShortLineRow(parent:HTMLTableElement, id:string){
        let nshort:NoteShort[] = this.findObjById(id, noteSampleJSON);
        if(nshort.length>0){
            let aRows: HTMLTableRowElement[];
            for(let i:number = 0; i<nshort.length; i++){
                aRows[i]= document.createElement("tr");
                aRows[i].setAttribute("class", "w3-table");
                let cell_id:HTMLTableCellElement = document.createElement("td");
                let cell_dtFrom:HTMLTableCellElement = document.createElement("td");
                let cell_dtTo:HTMLTableCellElement = document.createElement("td");
                let cell_short:HTMLTableCellElement = document.createElement("td");
                let cell_edit:HTMLTableCellElement = document.createElement("td");
                aRows[i].appendChild(cell_id);
                aRows[i].appendChild(cell_dtFrom);
                aRows[i].appendChild(cell_dtTo);
                aRows[i].appendChild(cell_short);
                aRows[i].appendChild(cell_edit);
                cell_id.innerHTML = nshort[i].journey_id;
                cell_dtFrom.innerHTML = nshort[i].start_date_time.toString();
                cell_dtTo.innerHTML = nshort[i].end_date_time.toString();
                cell_short.innerHTML = nshort[i].short_description;
                let editBtn:HTMLButtonElement = document.createElement("button");
                editBtn.value="EDIT";
                editBtn.setAttribute("class", "w3-button w3-white w3-border w3-border-red w3-round-large");
                editBtn.addEventListener("click", (e)=>{
                    console.log(cell_id);
                    e.preventDefault();
                });
                cell_edit.appendChild(editBtn);
                parent.appendChild(aRows[i]);
                //
                cell_id=null;
                cell_dtFrom=null;
                cell_dtTo=null;
                cell_short=null;
                cell_edit=null;
                editBtn=null;
            }
        }
        else{
            parent.innerHTML="No data found with this id: "+id;
        }
    }
}   // End of   class NoteList....
//
export class NoteEdit{
    parent_container: HTMLDivElement;
    journey_id: string;
    // blocks inputs
    date_time_input:inputDateTimeBlock;
    regionInputElement:inputBlock;
    districtInputElement:inputBlock;
    settlementInputElement:inputBlock;
    typeInputElement:inputBlock;
    nameInputElement:inputBlock;
    geoPointInputElement:geoPointForm;
    cssClass:string;
    // data from database
    id: string; // tbl_oragir.or_id
    date_from:string;
    time_from:string;
    date_to:string;
    time_to:string;   
    region:string;
    district:string;
    settlement:string;
    mon_type:string;
    name:string;
    lat:number;
    lon:number;
    description:string;

    //
    constructor(parent_container: HTMLDivElement,
                journey_id: string){
        this.parent_container = parent_container;
        this.journey_id = journey_id;
        this.cssClass="w3-select w100";
        this.date_time_input=new inputDateTimeBlock(this.parent_container, "dt", this.cssClass);
        this.regionInputElement= new inputBlock(this.parent_container,
            "region_name",
            "w3-input w3-border",
            "region_name",
            "Մարզը", "ՄՈՒՏՔԱԳՐԵՔ ՄԱՐԶԻ ԱՆՎԱՆՈՒՄԸ");
        this.districtInputElement= new inputBlock(this.parent_container,
            "district_name",
            "w3-input w3-border",
            "district_name",
            "Շրջանը", "ՄՈՒՏՔԱԳՐԵՔ ՇՐՋԱՆԻ ԱՆՎԱՆՈՒՄԸ");
        this.settlementInputElement= new inputBlock(this.parent_container,
            "settle_name",
            "w3-input w3-border",
            "settle_name",
            "Բնակավայրը", "ՄՈՒՏՔԱԳՐԵՔ ԲՆԱԿԱՎԱՅՐԻ ԱՆՎԱՆՈՒՄԸ․ ՔԱՂԱՔ, ԳՅՈՒՂ, ․․․");
        this.typeInputElement = new inputBlock(this.parent_container,
            "type_name",
            "w3-input w3-border",
            "type_name",
            "Տեսակը", "ՄՈՒՏՔԱԳՐԵՔ ՀՈՒՇԱՐՁԱՆԻ ԿԱՄ ԲՆԱԿԱՎԱՅՐԻ ՏԵՍԱԿԸ․ ԵԿԵՂԵՑԻ, ՎԱՆՔ, ԲԵՐԴ․․․, ՔԱՂԱՔ, ԳՅՈՒՂ, ․․․");
        this.nameInputElement = new inputBlock(this.parent_container,
            "name_name",
            "w3-input w3-border",
            "name_name",
            "Անունը", "ՄՈՒՏՔԱԳՐԵՔ ՀՈՒՇԱՐՁԱՆԻ ԱՆՎԱՆՈՒՄԸ, ԿԱՄ ԱՅԼ ՏԵՂԵԿՈՒԹՅՈՒՆՆԵՐ");
        this.geoPointInputElement = new geoPointForm(this.parent_container)
    }
}
//
export class NoteInport{
    parent_container: HTMLDivElement;
    constructor(){

    }
}
//
export class Notes{
    parent_container: HTMLDivElement;
    journey_id:string[];
    journey_id_init:string;
    selectJourneyContainer:HTMLDivElement;
    selectJourney: selectBlock;
    selectJourneyElement: HTMLSelectElement; // need for onchange event
    // subtitles
    subtitleNewNote: subTitle;
    subtitleNoteList: subTitle;
    subtitleNoteEdit: subTitle;
    subtitleNoteImport: subTitle;
    // containers
    subtitleNewNoteBlock:HTMLDivElement;
    subtitleNoteListBlock:HTMLDivElement;
    subtitleNoteEditBlock:HTMLDivElement;
    subtitleNoteBlock:HTMLDivElement;
    // page content objects
    note_new: NoteNew;
    note_list: NoteList;
    note_edit: NoteEdit;
    note_import: NoteInport;
    //
    journ_id:string[]=[];   // from database: jorn_id
    journ_line:string[]=[]; // from database: j_name + date_from + date_to
    // submenu 
    submenu_container:HTMLDivElement;
    submenu: SubMenu;
    submenuTitles:string[] = ["ՆՈՐ", "ՑՈՒՑԱԿԸ", "ԽՄԲԱԳՐՈՒՄ", "ՆԵՐՄՈՒԾՈՒՄ"];
    //
    form: HTMLFormElement;
    // date from
    dateInputBlock: inputBlock;
    dateBeginInput: HTMLInputElement; 
    // journey
    jNameInputBlock:inputBlock;
    journeyNameInput: HTMLInputElement; 
    // Leader
    leaderInputBlock: inputBlock;
    // country
    newCountryInput: HTMLInputElement; 
    selectCountryInput: HTMLSelectElement; 
    countryNames:string[];      // from database: SELECT DISTINCT country from tbl_jorney
    countryName_id:string[];    // from database: is the same as countryNames

    journeyLeaderInput: HTMLInputElement; 
    selectJourneyElm: HTMLSelectElement; 
    notesInput: HTMLTextAreaElement; 
    
    //
    descriptionInput: HTMLTextAreaElement;
    //
    saveNoteBtn: HTMLButtonElement;
    //
    onChangeJourney: (journ_id:string) => void;
    //
    constructor(parent_container: HTMLDivElement) {
        //this.makeSubTitle = this.makeSubTitle.bind(this);
        this.selectJourneyContainer = document.createElement("div");
        //
        //this.makeTextArea = this.makeTextArea.bind(this);
        //
        this.parent_container = parent_container as HTMLDivElement;
        this.parent_container.appendChild(this.selectJourneyContainer);
        this.journ_id=["2", "15", "39", "332"];
        this.journ_line=["Թուրքիա 2012", "Վրաստան 2013․ 2019-05-25 - 06-13", "Իրան 2019", "Թուրքիա 2020"];
        //
        this.form = document.createElement("form");
        this.form.setAttribute("class", "w3-container w3-card-2 w3-border w3-light-grey");
        this.parent_container.appendChild(this.form);
        this.selectJourney = new selectBlock(this.form,
            this.journ_id,
            this.journ_line,
            "- - - - - - - - - - - - - - - - - -",
            "w3-select w3-border w3-padding",
            "Ընտրեք Ճամփորդությունը",
            1, 
            false);
       //
        this.selectJourneyElm = this.selectJourney.getSelectElement();
        console.info(this.selectJourneyElm);
        this.selectJourneyElm.addEventListener("change", ()=>{
            let sselind:string = this.selectJourney.getSelectedIndex().toString();
            let vval:string|string[] = this.selectJourney.getSelectedValue();
            let txt:string|string[] = this.selectJourney.getSelectedText();
            console.log(sselind);
            console.log(vval);
            console.log(this.selectJourney.getSelectedText());                
        })
        //
        this.note_new = new NoteNew("2");
        // submenu
        this.submenuTitles = ["ՆՈՐ", "ՑՈՒՑԱԿԸ", "ԽՄԲԱԳՐՈՒՄ", "ՆԵՐՄՈՒԾՈՒՄ"];
        this.submenu_container = document.createElement("div");
        this.submenu_container.setAttribute("class", "w3-container");
        this.form.appendChild(this.submenu_container);
        this.submenu = new SubMenu(this.submenu_container, 
                                this.submenuTitles,
                                0,
                                [this.note_new, "b", "c", "d"]);
        //

        /*
        this.makeTextArea(this.form, 
            "description", 
            "w3-input w3-border", 
            "description", 
            "Լրացուցիչ նկարագրություն", 
            this.descriptionInput
        ); 
        */
        //
        
        // onAddMember: (member_id:string) => void;

    
    }
    // 

    
    //
    
    //
    /*
    makeTextArea(container:HTMLFormElement, 
                name:string, 
                cssclass:string, 
                id:string, 
                label:string,
                element:HTMLTextAreaElement){
        let pElement:HTMLParagraphElement = document.createElement("p");
        container.appendChild(pElement);
        let lebelElement:HTMLLabelElement = document.createElement("label");
        lebelElement.innerText = label;
        pElement.appendChild(lebelElement);
        let inputElement:HTMLTextAreaElement = document.createElement("textarea");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("class", cssclass);
        inputElement.setAttribute("name", name);
        inputElement.setAttribute("id", id);
        pElement.appendChild(inputElement);
        element = inputElement
    } 
    //
   */

}
