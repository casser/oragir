import {JourneyInit, Journey, Member, Camera} from "../../../api/Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle, inputDateTimeLocalBlock} from "../../components/Inputs";
import {JMember} from "../Member";

export class NewNoteForm{
    parent_container: HTMLDivElement;
    // subtitles
    subtitleNewJourn: subTitle;
    subtitleNewMember: subTitle;
    form:HTMLFormElement;
    journey: Journey; 
    
    formHead: string;
    formHeadContainer: HTMLDivElement;
    // date 
    dateInputBlockFrom: inputDateTimeLocalBlock;
    dateInputBlockTo: inputDateTimeLocalBlock;
    //dateBeginInput: HTMLInputElement; 
    // journey
    regionInputBlock:inputBlock;
    districtInputBlock:inputBlock;
    settleInputBlock:inputBlock;
    typeInputBlock:inputBlock;
    nameInputBlock:inputBlock;
   
    notesInput: HTMLTextAreaElement; 
    //
    descriptionInput: HTMLTextAreaElement;
    //
    saveNoteBtn: HTMLButtonElement;
    //
    constructor(parent_container: HTMLDivElement, 
                Journ_id:string) {
        
        this.parent_container = parent_container as HTMLDivElement;
        this.form = document.createElement("form");
        this.form.setAttribute("class", "w3-container w3-light-grey w3-margin-top w3-margin-bottom");
        this.parent_container.appendChild(this.form);
        //
        this.dateInputBlockFrom = new inputDateTimeLocalBlock(
            this.form,
            "date_from",
            "w3-input w3-border",
            "date_from",
            "Սկիզբ",
            ""
        )
        this.dateInputBlockTo = new inputDateTimeLocalBlock(
            this.form,
            "date_to",
            "w3-input w3-border",
            "date_to",
            "Ավարտ",
            ""
        );
        this.regionInputBlock = new inputBlock(
            this.form,
            "region",
            "w3-input w3-border",
            "region",
            "Մարզ"
        );
        this.districtInputBlock = new inputBlock(
            this.form,
            "district",
            "w3-input w3-border",
            "district",
            "Շրջան"
        )
        this.settleInputBlock = new inputBlock(
            this.form,
            "settle",
            "w3-input w3-border",
            "settle",
            "Բնակավայր"
        )
        this.typeInputBlock = new inputBlock(
            this.form,
            "type",
            "w3-input w3-border",
            "type",
            "Տեսակ"
        )
        this.nameInputBlock = new inputBlock(
            this.form,
            "name",
            "w3-input w3-border",
            "name",
            "Անուն"
        )
        this.nameInputBlock = new inputBlock(
            this.form,
            "noteDescr",
            "w3-input w3-border",
            "noteDescr",
            "Լրացուցիչ նկարագրություն"
        )
        //
        this.saveNoteBtn = document.createElement("button") as HTMLButtonElement;
        this.saveNoteBtn.setAttribute("class", "w3-btn w3-border w3-green");
        this.saveNoteBtn.textContent="ԳՐԱՆՑԵԼ ԳՐԱՌՈՒՄԸ"
        this.form.appendChild(this.saveNoteBtn);
        //
    }
}
