import{KeyValueTable} from "../../components/keyValueTable";
import {Journey} from "../../../api/Api";

export class JourneyDetails{
    parentDiv: HTMLDivElement;
    title: string;
    btnPlace: HTMLButtonElement; // Ճամփորդության մանրամասները
    //btnNotes: HTMLButtonElement; // Ճամփորդության Օրագիրը
    notesContainer: HTMLDivElement;
    titleBlock: HTMLDivElement;
    contentBlock: HTMLDivElement;
    keyVal: KeyValueTable[] = [];
    journey:Journey;
    constructor(parent:HTMLDivElement, journey:Journey){
        this.titleBlock = document.createElement('div');
        //this.btnDetails.textContent = "Journey Details";
       // this.btnDetails.setAttribute("class", "w3-button w3-white w3-border w3-border-green w3-round-large submenu_button");
        this.titleBlock.innerHTML=`ՃԱՄՓՈՐԴՈՒԹՅԱՆ ՄԱՆՐԱՄԱՍՆԵՐԸ`;
        
        this.titleBlock.setAttribute("class","w3-container w3-text-green w3-center w3-border-bottom");
        this.titleBlock.style.letterSpacing="1.3em";
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