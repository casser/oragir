import {JourneyShort,  Member, Camera, Journey} from "../../../api/Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle} from "../../components/Inputs";
import {JMember} from "../Member";
import {noteListArr} from "../../modelData/tblOragir";
import {NewJourneyForm} from "./newJourneyForm";
import {JourneyLine} from "./jorneyLine";
import {JourneyListTitle} from "./journeyListTitle";
import "./journey.css" ;


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
    aButtonsNote:HTMLButtonElement[]=[];

    constructor(parentContainer: HTMLDivElement, data:Journey[], aButtons:HTMLButtonElement[]) {
        this.parentContainer = parentContainer as HTMLDivElement;
        this.container = document.createElement("div");
        //this.container.setAttribute("class", "w3-border w3-light-grey");
        this.parentContainer.appendChild(this.container);
        this.aData = data;    // array of Journey interface objects to display in page as one Row Tables
        this.aButtonsNote = aButtons;
        for(let i=0; i<this.aData.length; i++){
            this.journeyLine[i] = new JourneyLine(this.container, this.aData[i], this.aButtonsNote[i]);
        }
     }
    // 
    
}
//

    
