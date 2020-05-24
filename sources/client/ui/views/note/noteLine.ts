import {Journey, Note, NoteShort} from "../../../api/Api";

//
import {NoteDetails} from "./noteDetails";
import {findNoteById, convertJsonToNote} from "./noteFunctions";
import {noteListArr} from "../../modelData/tblOragir" // 1  // All notes

//
export class NoteLine{
    parentDiv: HTMLDivElement;    // The Parent Div Element
    lineContainer:HTMLDivElement;
    detailedPreviewDiv:HTMLDivElement;
    noteData:Note;
    
    editButton:HTMLButtonElement;       // Button
    
    btnPlace:HTMLButtonElement; // for map
    btnClosedOpened:HTMLButtonElement;        // Image when State is Open: isOpened = true
    btnImages: HTMLButtonElement;           // Գրառման նկարները
    btnVideos: HTMLButtonElement;            // Գրառման տեսանյութերը
    btnAudio: HTMLButtonElement;            // Գրառման ձայնգրությունները
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

    cellImages: HTMLDivElement;             // Cell
    cellVideos: HTMLDivElement;             // Cell
    cellAudios: HTMLDivElement;             // Cell

    cellEdit: HTMLDivElement;             // Cell
    isOpened: boolean;                  // State Variable
    cssTable:string;    // css class
    cssRow:string;    // css class
    cssCell:string;    // css class
    id:number;
    journey:Journey;
    //
    note:Note;      // New
    noteDetails: NoteDetails;   // New


    constructor(parentContainer: HTMLDivElement, 
                data:Note) {
        this.parentDiv = parentContainer;
        this.lineContainer = document.createElement("div");
        this.lineContainer.setAttribute("class", " w3-border-bottom")
        this.detailedPreviewDiv = document.createElement("div");
        this.detailedPreviewDiv.style.display = "none";
        // map button
        this.btnPlace = document.createElement("button");
        //images button
        this.btnImages = document.createElement("button");
        this.btnImages.innerHTML = `<i class="material-icons" title="Images">photo_album</i>`
        this.btnImages.setAttribute("class", "w3-button w3-white w3-border w3-round ");
        //Videos button
        this.btnVideos = document.createElement("button");
        this.btnVideos.innerHTML = `<i class="material-icons" title="Videos">movie</i>`
        this.btnVideos.setAttribute("class", "w3-button w3-white w3-border w3-round ");
        //audio buttons  audiotrack
        this.btnAudio = document.createElement("button");
        this.btnAudio.innerHTML = `<i class="material-icons" title="Audio">audiotrack</i>`
        this.btnAudio.setAttribute("class", "w3-button w3-white w3-border w3-round ");
        // modal
        this.modalEditDialog = document.createElement("div");
        this.modalEditDialog.setAttribute("class", "w3-modal");
        this.modalContent = document.createElement("div") as HTMLDivElement;
        this.modalContent.setAttribute("class", "w3-modal-content");
        
        this.modalHeader = document.createElement("header") as HTMLHeadingElement;
        this.modalHeader.setAttribute("class", "w3-container w3-green");
        this.modalHeader.innerHTML=`<h5>Խմբագրել գրառումը</h5>`;

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
        this.cellImages = document.createElement("div") as HTMLDivElement;
        this.cellVideos = document.createElement("div") as HTMLDivElement;
        this.cellAudios = document.createElement("div") as HTMLDivElement;
        
        this.cellEdit  = document.createElement("div") as HTMLDivElement;
        this.noteData = {
            note_id: data.note_id,
            jorn_id: data.jorn_id,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            userId: data.userId,
            inputDate: data.inputDate
        }
       let shortContent:string = `id: <b>${this.noteData.note_id}</b>, `;
        if(data.region !== undefined){
            this.noteData.region = data.region;
            shortContent +=  `${this.noteData.region}`;
        }
        if(data.district !== undefined){
            this.noteData.district = data.district;
            shortContent +=  `, ${this.noteData.district}`;
        }
        if(data.settlement !== undefined){
            this.noteData.settlement = data.settlement;
            shortContent +=  `, ${this.noteData.settlement}`;
        }
        if(data.name !== undefined){
            this.noteData.name = data.name;
            shortContent +=  `, ${this.noteData.name}`;
        }
        if(data.type !== undefined){
            this.noteData.type=data.type;
            shortContent +=  `, ${this.noteData.type}`;
        }
        this.id = this.noteData.note_id;

        this.note = findNoteById(Number(this.id), convertJsonToNote(noteListArr));
        
        let j_from:string
        if(this.note.dateFrom === undefined){
            j_from="Invalid date from"
        }
        else{
            j_from=this.note.dateFrom.toUTCString() ;
        }
        let j_to:string 
        if(this.note.dateTo === undefined){
            j_to="Invalid date to";
        }
        else{
            j_to=this.note.dateTo.toUTCString() ;
        }

        
        //
        let region:string|undefined
        if(this.note.region != undefined){
            region=this.note.region.toString();
        }
        //
        let district:string|undefined
        if(this.note.district != undefined){
            district=this.note.district.toString();
        }
        //
        let settlement:string|undefined
        if(this.note.settlement != undefined){
            settlement=this.note.settlement.toString();
        }
        //
        let name:string|undefined
        if(this.note.name != undefined){
            name=this.note.name.toString();
        }
        //
        let type:string|undefined
        if(this.note.type != undefined){
            type=this.note.type.toString();
        }
        //
        let parallel:string|undefined
        if(this.note.parallel != undefined){
            parallel=this.note.parallel.toString();
        }
        //
        let meridian:string|undefined
        if(this.note.meridian != undefined){
            meridian=this.note.meridian.toString();
        }
        //
        let description:string|undefined
        if(this.note.description != undefined){
            description=this.note.description.toString();
        }
        //
        
        let modalContent:string=`id: <b>${this.note.jorn_id.toString()}</b>
                                    <br> սկիզբ - <b>${j_from}</b> - ավարտ <b>${j_to}</b>`;
        if(region != undefined){
            modalContent += `<br>Մարզ - <b>${this.note.region.toString()}</b>`;
        }
        if(district != undefined){
            modalContent += `<br>Շրջան - <b>${this.note.district.toString()}</b>`;
        }
        if(settlement != undefined){
            modalContent += `<br>Բնակավայր - <b>${this.note.settlement.toString()}</b>`;
        }
        if(name != undefined){
            modalContent += `<br>Անուն - <b>${this.note.name.toString()}</b>`;
        }
        if(type != undefined){
            modalContent += `<br>Տեսակ - <b>${this.note.type.toString()}</b>`;
        }
        if(parallel != undefined){
            modalContent += `<br>Հորիզոնական - <b>${this.note.parallel.toString()}</b>`;
        }
        if(meridian != undefined){
            modalContent += `<br>Միջօրեական - <b>${this.note.meridian.toString()}</b>`;
        }
        if(description != undefined){
            modalContent += `<br>Նկարագրություն - <b>${this.note.description.toString()}</b>`;
        }

        this.modalContentContainer.innerHTML = modalContent;

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
        if(this.noteData.dateFrom === undefined){
            this.cellDateFrom.innerHTML="undefined fate from";
        }
        else{
            this.cellDateFrom.innerHTML=this.noteData.dateFrom.toString();
        }
        
        this.cellDateTo.setAttribute("class", this.cssCell);
        this.cellDateTo.style.width="150px";
        if(this.noteData.dateTo){
            this.cellDateTo.innerHTML=this.noteData.dateTo.toString();
        }
        else{
            this.cellDateTo.innerHTML="չի նշված";
        }
        this.cellDescription.setAttribute("class", this.cssCell);
        this.cellDescription.style.width="65%";
        // all fields
        this.cellDescription.innerHTML = shortContent;

        this.cellPlace.setAttribute("class", this.cssCell);
        this.cellImages.setAttribute("class", this.cssCell);
        this.cellVideos.setAttribute("class", this.cssCell);
        this.cellAudios.setAttribute("class", this.cssCell);
        this.cellEdit.setAttribute("class", this.cssCell);
        //buttons
        this.btnClosedOpened = document.createElement("button") as HTMLButtonElement;
        this.btnClosedOpened.setAttribute("class", "w3-button w3-ripple  w3-text-red ");
        this.btnClosedOpened.innerHTML=`<i class="material-icons">arrow_right</i>`
        //this.btnClosedOpened.textContent="+";
        this.cellArrow.appendChild(this.btnClosedOpened);
        //this.plusClosed.src="closed.png";
        //this.minusOpened.src="../icons/opened.png";
        // buttons
        // geo location
        this.btnPlace.setAttribute("class", "w3-button w3-border w3-white w3-round ");
        this.cellPlace.appendChild(this.btnPlace);
        this.cellPlace.style.width="5%";
        this.btnPlace.innerHTML=`<i class="material-icons" title="Show Places in Google Map">place</i>`;
        // images
        this.cellImages.appendChild(this.btnImages);
        this.cellImages.style.width="5%";
        // videos
        this.cellVideos.appendChild(this.btnVideos);
        this.cellVideos.style.width="5%";
        // audios
        this.cellAudios.appendChild(this.btnAudio);
        this.cellAudios.style.width="5%";

        this.editButton = document.createElement("button") as HTMLButtonElement;
        this.editButton.setAttribute("class", "w3-button w3-border w3-white w3-round ");
        this.editButton.innerHTML=`<i class="material-icons" title="Edit Journey">edit</i>`
        this.cellEdit.appendChild(this.editButton);
        this.cellEdit.style.width="5%";

        
        // state
        this.isOpened = false;
        //
        this.table.appendChild(this.row);
        this.row.appendChild(this.cellArrow);
        this.row.appendChild(this.cellDateFrom);
        this.row.appendChild(this.cellDateTo);
        this.row.appendChild(this.cellDescription);
        this.row.appendChild(this.cellPlace);
        this.row.appendChild(this.cellImages);
        this.row.appendChild(this.cellVideos);
        this.row.appendChild(this.cellAudios);
        this.row.appendChild(this.cellEdit);
        this.lineContainer.appendChild(this.table);
        this.lineContainer.appendChild(this.detailedPreviewDiv);
        //
        if(this.note !== undefined){
            this.noteDetails = new NoteDetails( this.detailedPreviewDiv, this.note);
        }
        else{
            this.detailedPreviewDiv.innerHTML=` Note with id = ${this.id} not found`;
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
            console.log(this.noteData );
        }
    }
}