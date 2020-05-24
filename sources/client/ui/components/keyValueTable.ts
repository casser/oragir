export class KeyValueTable{
    parent:HTMLElement;
    key:string;
    val:string;
    keyWidth:number;
    valWidth:number;
    isPixel:boolean; // if==true: "px" // else: "%";
    table:HTMLTableElement;            // Table
    row: HTMLTableRowElement;           // Row
    keyCell: HTMLTableCellElement;      // Cell
    valCell: HTMLTableCellElement;      // Cell
    cssTable:string;    // css class
    cssRow:string;    // css class
    cssCellKey:string;    // css class
    cssCellVal:string;    // css class
    constructor(parentDiv:HTMLElement,
                key:string,
                val:string,
                wKey:number=150,
                wVal:number=400, 
                isMeasurementPx:boolean = true){
        this.parent = parentDiv;
        this.key = key;
        this.val = val;
        this.keyWidth = wKey;
        this.valWidth = wVal;
        this.isPixel=isMeasurementPx;
        this.cssTable="w3-table w3-margin-left w3-margin-right";
        this.cssRow="w3-border-bottom";
        this.cssCellKey="w3-right-align";
        this.cssCellVal="b";
        // making table with two rows
        this.table = document.createElement("table") as HTMLTableElement;
        this.row = document.createElement("tr") as HTMLTableRowElement;
        this.keyCell = document.createElement("td") as HTMLTableCellElement;
        this.valCell = document.createElement("td") as HTMLTableCellElement;
        this.table.setAttribute("class", this.cssTable);
        this.table.appendChild(this.row);
        this.row.setAttribute("class", this.cssRow);
        this.row.appendChild(this.keyCell);
        this.row.appendChild(this.valCell);
        this.keyCell.setAttribute("class", this.cssCellKey);
        this.valCell.setAttribute("class", this.cssCellVal);
        //this.keyCell.style.width=this.keyWidth.toString();
        //this.valCell.style.width=this.valWidth.toString();
        this.keyCell.setAttribute("width", this.keyWidth.toString());
        this.valCell.setAttribute("width", this.valWidth.toString());
        this.keyCell.innerHTML=this.key;
        this.valCell.innerHTML=this.val;
        this.parent.appendChild(this.table);
        //
    }
}