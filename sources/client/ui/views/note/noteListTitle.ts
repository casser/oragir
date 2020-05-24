import {NewNoteForm} from "./newNoteForm";
import {Pagination} from "../journey/pagination";
import { Journey, JourneyShort } from "../../../api/Api";
//import "./journey/journey.css" ;

export class NoteListTitle{
    parentContainer:HTMLElement;
    mainContainer:HTMLDivElement;
    colTitle:HTMLDivElement;
    colPaging:HTMLDivElement;
    colButton:HTMLDivElement;
    btnAddNote:HTMLButtonElement;
    journey:Journey;
    startNum:number;
    endNum:number;
    notesPerPage:number;
    //
    //paging:Pagination;
    // modal block
    modalNewDialog:HTMLDivElement;     //
    modalContent:HTMLDivElement;
    modalHeader:HTMLHeadingElement;
    modalContentContainer:HTMLDivElement;
    modalFooter:HTMLFontElement;
    modalCloseIcon:HTMLSpanElement;
    //
    newNoteFormModal:NewNoteForm;
    //
    constructor(parent:HTMLElement, 
                journ:Journey, 
                //notePagination:Pagination, 
                startNumber:number,
                noteCount:number=10){
        this.getPagingContainer = this.getPagingContainer.bind(this);
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        this.colTitle = document.createElement('div');
        this.colTitle.setAttribute("class","w3-col s6 w3-text-green");
        this.journey = journ;
        //this.paging =  notePagination;
        this.startNum = startNumber;
        this.notesPerPage = noteCount;
        this.endNum = this.startNum + noteCount;
        this.colTitle.innerHTML =`ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ․ <b>${this.journey.name}</b><br>`;
        this.colTitle.innerHTML +=`ԳՐԱՌՈՒՄՆԵՐ. <b>${this.startNum} - ${this.endNum}</b>`;

        this.colPaging = document.createElement('div');
        this.colPaging.setAttribute("class","w3-col s3  right_align");
        //this.colPaging.innerHTML="Pagination";

        this.colButton = document.createElement('div');
        this.colButton.setAttribute("class","w3-col s3  right_align");

        this.parentContainer.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.colTitle);
        this.mainContainer.appendChild(this.colPaging);
        this.mainContainer.appendChild(this.colButton);
        //this.mainContainer.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        this.btnAddNote = document.createElement('button');
        this.btnAddNote.textContent="ՆՈՐ ԳՐԱՌՈՒՄ";
        this.btnAddNote.setAttribute("class", "w3-button w3-ripple w3-round  w3-border ")
        this.colButton.appendChild(this.btnAddNote);
        // modal
        this.modalNewDialog=document.createElement("div");
        this.modalNewDialog.setAttribute("class", "w3-modal");
        this.modalContent = document.createElement("div") as HTMLDivElement;
        this.modalContent.setAttribute("class", "w3-modal-content  w3-light-grey");
        
        this.modalHeader = document.createElement("header") as HTMLHeadingElement;
        this.modalHeader.setAttribute("class", "w3-container w3-green");
        this.modalHeader.innerHTML=`<h5>Նոր գրառման գրանցում</h5>`;

        this.modalCloseIcon = document.createElement("span") as HTMLSpanElement;
        this.modalCloseIcon.setAttribute("class", "w3-button w3-display-topright");
        this.modalCloseIcon.innerHTML="&times;";
        this.modalHeader.appendChild(this.modalCloseIcon);

        this.modalContentContainer = document.createElement("div") as HTMLDivElement;
        this.modalContentContainer.setAttribute("class", "w3-container");
        
        this.modalFooter = document.createElement("footer") as HTMLFontElement;
        this.modalFooter.setAttribute("class", "w3-container w3-green");
        //this.modalFooter.innerHTML=`<p>Modal Footer new Journey</p>`;
        
        this.modalNewDialog.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalContent.appendChild(this.modalContentContainer);
        this.modalContent.appendChild(this.modalFooter);
        this.parentContainer.appendChild(this.modalNewDialog);
        this.newNoteFormModal = new NewNoteForm(this.modalContentContainer, this.journey.id);
        this.modalNewDialog.style.display="none";
        this.modalCloseIcon.onclick=()=>{
            this.modalNewDialog.style.display="none";
        }
        this.btnAddNote.onclick=()=>{
            this.modalNewDialog.style.display="block";
        }
        //
    }
    getPagingContainer(){
        return this.colPaging;
    }
}