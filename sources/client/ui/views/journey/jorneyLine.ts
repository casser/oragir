import {JourneyShort, Journey, Note} from "../../../api/Api";
import {JourneyDetails} from "./journeyDetails";
import {findJourneyById} from "./journeyFunctions";
import {convertJsonToJourney} from "./journeyFunctions";
import {jListArr} from "../../modelData/jLisArray";
import {noteListArr} from "../../modelData/tblOragir";
import {findNotesByJournId} from "../note/noteFunctions";
import {convertJsonToNote} from "../note/noteFunctions";
//import {selectedJourneyId} from "./JourneyPage";
//
//
//
export class JourneyLine{
    parentDiv: HTMLDivElement;    // The Parent Div Element
    lineContainer:HTMLDivElement;
    detailedPreviewDiv:HTMLDivElement;
    journeyData:JourneyShort;           // data structure
    editButton:HTMLButtonElement;       // Button
    openButton:HTMLButtonElement;       // Button
    closeButton:HTMLButtonElement;      // Button
    btnPlace:HTMLButtonElement; // for map
    btnClosedOpened:HTMLButtonElement;        // Image when State is Open: isOpened = true
    btnNotes: HTMLButtonElement; // Ճամփորդության Օրագիրը
    //
    modalEditDialog:HTMLDivElement;     // modal block
    modalContent:HTMLDivElement;
    modalHeader:HTMLHeadingElement;
    modalContentContainer:HTMLDivElement;
    modalFooter:HTMLFontElement;
    modalCloseIcon:HTMLSpanElement;
    //
    table: HTMLDivElement;              // Table
    row: HTMLDivElement;                // Row
    cellArrow: HTMLDivElement;            // Cell
    cellDateFrom: HTMLDivElement;         // Cell
    cellDateTo: HTMLDivElement;           // Cell
    cellDescription: HTMLDivElement;      // Cell
    cellPlace: HTMLDivElement;             // Cell
    cellNotes: HTMLDivElement;             // Cell
    cellEdit: HTMLDivElement;             // Cell
    isOpened: boolean;                  // State Variable
    cssTable:string;    // css class
    cssRow:string;    // css class
    cssCell:string;    // css class
    id:string;
    journey:Journey|undefined;
    journeyDetails:JourneyDetails;
    // data: all notes
    allNotes:Note[] = [];
    constructor(parentContainer: HTMLDivElement, 
                data:Journey, 
                noteButton:HTMLButtonElement) {
        this.parentDiv = parentContainer;
        this.lineContainer = document.createElement("div");
        this.lineContainer.setAttribute("class", " w3-border-bottom")
        this.detailedPreviewDiv = document.createElement("div");
        this.detailedPreviewDiv.style.display = "none";
        // map button
        this.btnPlace = document.createElement("button");
        
        //notes button
        this.btnNotes = noteButton;
        //this.btnNotes.textContent = "ՕՐԱԳԻՐ";
        this.btnNotes.innerHTML = `<i class="material-icons" title="Notes">list_alt</i>`
        this.btnNotes.setAttribute("class", "w3-button w3-white w3-border w3-round ");
        // modal
        this.modalEditDialog = document.createElement("div");
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
        this.cellPlace  = document.createElement("div") as HTMLDivElement;
        this.cellNotes = document.createElement("div") as HTMLDivElement;
        this.cellEdit  = document.createElement("div") as HTMLDivElement;
        this.journeyData = {                // JourneyShort
            id: data.id,
            start_day: data.start_day,
            name: data.name
        }
        this.id = this.journeyData.id;
        this.journey = findJourneyById(Number(this.id), convertJsonToJourney(jListArr));

        let j_to:string|undefined
        
        if(this.journey.end_day === undefined){
            j_to ="not set"
        }
        else{
            j_to = this.journey.end_day.toISOString().split('T')[0];
        } 
        this.modalContentContainer.innerHTML=`id: <b>${this.journey.id.toString()}</b>
                                                <br>Երկիր - <b>${this.journey.country.toString()}</b>
                                                <br> սկիզբ - <b>${this.journey.start_day.toISOString().split('T')[0]}</b> - ավարտ <b>${j_to}</b>
                                                <br> անունը - <b>${this.journey.name}</b>
                                                <br>նշումներ - <b>${this.journey.description}</b>
                                                <br>ղեկավարը - <b>${this.journey.group_head}</b>`;
        if(data.end_day != undefined && data.end_day != null){
            this.journeyData.end_day = data.end_day;
        }
        // css
        this.cssTable="tableDiv w3-table";
        this.cssRow="rowDiv";
        this.cssCell="rowCell";
        this.table.setAttribute("class", this.cssTable);
        this.row.setAttribute("class", this.cssRow);
        this.cellArrow.setAttribute("class", `${this.cssCell}`);
        this.cellArrow.style.width="5%";
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
        this.cellDescription.style.width="65%";
        this.cellDescription.innerHTML=this.journeyData.name;
        this.cellPlace.setAttribute("class", this.cssCell);
        this.cellEdit.setAttribute("class", this.cssCell);
        //buttons
        this.btnClosedOpened = document.createElement("button") as HTMLButtonElement;
        this.btnClosedOpened.setAttribute("class", "w3-button w3-ripple w3-text-green ");
        this.btnClosedOpened.innerHTML=`<i class="material-icons">arrow_right</i>`
        //this.btnClosedOpened.textContent="+";
        this.cellArrow.appendChild(this.btnClosedOpened);
        //this.plusClosed.src="closed.png";
        //this.minusOpened.src="../icons/opened.png";
        // buttons
        this.btnPlace.setAttribute("class", "w3-button w3-border w3-white w3-round ");
        this.cellPlace.appendChild(this.btnPlace);
        this.cellPlace.style.width="5%";
        this.btnPlace.innerHTML=`<i class="material-icons" title="Show Places in Google Map">place</i>`;
        this.cellNotes.appendChild(this.btnNotes);

        this.cellNotes.style.width="5%";
        this.editButton = document.createElement("button") as HTMLButtonElement;
        this.editButton.setAttribute("class", "w3-button w3-border w3-white w3-round ");
        this.editButton.innerHTML=`<i class="material-icons" title="Edit Journey">edit</i>`
        this.cellEdit.appendChild(this.editButton);
        this.cellEdit.style.width="5%";
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
        this.row.appendChild(this.cellPlace);
        this.row.appendChild(this.cellNotes);
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
                //this.btnClosedOpened.textContent="|";
                //this.btnClosedOpened.setAttribute("class", "w3-button w3-ripple w3-white w3-round-xxlarge w3-text-green minusBtn");
                this.btnClosedOpened.innerHTML=`<i class="material-icons">arrow_drop_down</i>`
                // border
                this.lineContainer.setAttribute("class", "w3-leftbar w3-border-green  w3-border-bottom  w3-border-top")
            }
            else{
                console.log("Close Button clicked");
                this.detailedPreviewDiv.style.display="none";
                //this.btnClosedOpened.textContent="+";
                // border
                this.lineContainer.setAttribute("class", "w3-border-bottom");
                this.btnClosedOpened.innerHTML=`<i class="material-icons">arrow_right</i>`
                //this.btnClosedOpened.setAttribute("class", "w3-button w3-ripple w3-white w3-round-xxlarge w3-text-green plusBtn");
            }
            this.isOpened = !this.isOpened;
        }
        this.editButton.onclick=()=>{
            this.modalEditDialog.style.display="block";
            console.log(this.journeyData );
        }

    }
}