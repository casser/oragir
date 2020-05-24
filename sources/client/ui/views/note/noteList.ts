import {Note} from "../../../api/Api";
import {NoteLine} from "./noteLine";
import "../journey/journey.css" ;


//
export class NoteList{
    parentContainer: HTMLDivElement;
    container:HTMLDivElement;
    headerContainer: HTMLDivElement;
    addButton:HTMLButtonElement;
    noteLine: NoteLine[]=[];
    formHead: string;
    //
    aData:Note[];

    constructor(parentContainer: HTMLDivElement, data:Note[]) {
        this.parentContainer = parentContainer as HTMLDivElement;
        this.container = document.createElement("div");
        //this.container.setAttribute("class", "w3-border w3-light-grey");
        this.parentContainer.appendChild(this.container);
        this.aData = data;    // array of Note interface objects to display in page as one Row Tables
        for(let i=0; i<this.aData.length; i++){
            this.noteLine[i] = new NoteLine(this.container, this.aData[i]);
        }
     }
    // 
}
//

    
