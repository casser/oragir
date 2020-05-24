import {NewJourneyForm} from "./newJourneyForm";
//import "./journey/journey.css" ;

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
    newJourneFormModal:NewJourneyForm;
/*
this.newJourneFormModal = new NewJourneyForm(this.modalContentContainer);
*/
    //
    constructor(parent:HTMLElement){
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        this.colTitle = document.createElement('div');
        this.colTitle.setAttribute("class","w3-col s6 w3-text-green");
        this.colTitle.innerHTML="ՀՃՈՒ ԲՈԼՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆՆԵՐԸ";
        this.colButton = document.createElement('div');
        this.colButton.setAttribute("class","w3-col s6  right_align");
        this.parentContainer.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.colTitle);
        this.mainContainer.appendChild(this.colButton);
        //this.mainContainer.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        this.btnAddJourney = document.createElement('button');
        this.btnAddJourney.textContent="ՆՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ";
        this.btnAddJourney.setAttribute("class", "w3-button w3-ripple w3-round  w3-border ")
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
        
        this.modalFooter = document.createElement("footer") as HTMLFontElement;
        this.modalFooter.setAttribute("class", "w3-container w3-green");
        //this.modalFooter.innerHTML=`<p>Modal Footer new Journey</p>`;
        
        this.modalNewDialog.appendChild(this.modalContent);
        this.modalContent.appendChild(this.modalHeader);
        this.modalContent.appendChild(this.modalContentContainer);
        this.modalContent.appendChild(this.modalFooter);
        this.parentContainer.appendChild(this.modalNewDialog);
        this.newJourneFormModal = new NewJourneyForm(this.modalContentContainer);
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