import {KeyValueTable} from "../../components/keyValueTable";
import {Note} from  "../../../api/Api";
//
export class NoteDetails{
    parentDiv:HTMLDivElement;
    titleBlock:HTMLDivElement;
    keyVal:KeyValueTable[]=[];
    contentBlock:HTMLDivElement;
    note:Note;
    constructor(parent:HTMLDivElement, note:Note){
        this.parentDiv = parent;
        this.note = note;
        
        this.titleBlock = document.createElement('div');
        
        this.titleBlock.innerHTML=`ԳՐԱՌՄԱՆ ՄԱՆՐԱՄԱՍՆԵՐԸ`;
        
        this.titleBlock.setAttribute("class","w3-container w3-text-green w3-center w3-border-bottom");
        this.titleBlock.style.letterSpacing="1.3em";
        this.contentBlock = document.createElement('div');
        this.parentDiv = parent;
        let ii:number = 0;
        // .toISOString().split('T')[0]
        for (let [key, value] of Object.entries(note)) {
            if(key=="date_from"){
                value=value.toISOString().split('T')[0];
            }
            if(key=="date_to"){
                if(value == "undefined"){
                    value = "Չի նշված";
                }
                else{
                    value = value.toISOString();
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