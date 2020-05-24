export class inputDateTimeBlock{
    container:HTMLElement; 
    name:string; 
    cssclass:string;
    inputElmDayFrom:HTMLInputElement;
    inputElmDayTo:HTMLInputElement;
    inputElmHHMMFrom:HTMLInputElement;
    inputElmHHMMTo:HTMLInputElement;
    placeholder_date:string;
    placeholder_hour:string;
    new_day_from : string;
    new_day_to : string;
    new_hour_from : string;
    new_hour_to : string;
    date_from: Date;
    date_to: Date;
    private pElement:HTMLParagraphElement;
    //
    // for internal use
    private tableElement:HTMLTableElement;
    // rows
    private tablerowElmTitles:HTMLTableRowElement;
    private tablerowElmFrom:HTMLTableRowElement;
    private tablerowElmTo:HTMLTableRowElement;
    // cells
    private tableCellElmTitleEmpty:HTMLTableCellElement;
    private tableCellElmTitleFrom:HTMLTableCellElement;
    private tableCellElmTitleTo:HTMLTableCellElement;
    private tableCellElmTitleYYMMDD:HTMLTableCellElement;
    private tableCellElmYYMMDD_from:HTMLTableCellElement;
    private tableCellElmYYMMDD_to:HTMLTableCellElement;
    private tableCellElmTitleHHMMSS:HTMLTableCellElement;
    private tableCellElmHHMMSS_from:HTMLTableCellElement;
    private tableCellElmHHMMSS_to:HTMLTableCellElement;
    //
    constructor(container:HTMLElement,
                name:string,
                cssclass:string,
                ){
        this.getDate = this.getDate.bind(this);
        this.container = container;
        this.name = name;
        this.cssclass = cssclass;
        this.placeholder_date="YYY-MM-DD";
        this.placeholder_hour="HH:MM"
        //
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        //
        // table
        this.tableElement = document.createElement("table") as HTMLTableElement;
        // rows
        this.tablerowElmTitles = document.createElement("tr") as HTMLTableRowElement;           // row 1
        this.tablerowElmFrom = document.createElement("tr") as HTMLTableRowElement;             // row 2
        this.tablerowElmTo = document.createElement("tr") as HTMLTableRowElement;               // row 3 
        // cells
        this.tableCellElmTitleEmpty = document.createElement("td") as HTMLTableCellElement;     // row1, col 1
        this.tableCellElmTitleFrom = document.createElement("td") as HTMLTableCellElement;      // row2, col 1
        this.tableCellElmTitleTo = document.createElement("td") as HTMLTableCellElement;        // row3, col 1

        this.tableCellElmTitleYYMMDD = document.createElement("td") as HTMLTableCellElement;    // row1, col 2
        this.tableCellElmYYMMDD_from = document.createElement("td") as HTMLTableCellElement;    // row2, col 2
        this.tableCellElmYYMMDD_to = document.createElement("td") as HTMLTableCellElement;      // row3, col 2

        this.tableCellElmTitleHHMMSS = document.createElement("td") as HTMLTableCellElement;    // row1, col 3
        this.tableCellElmHHMMSS_from = document.createElement("td") as HTMLTableCellElement;    // row2, col 3
        this.tableCellElmHHMMSS_to = document.createElement("td") as HTMLTableCellElement;      // row3, col 3
        //appending childs
        this.tableElement.appendChild(this.tablerowElmTitles); // row 1
        this.tableElement.appendChild(this.tablerowElmFrom);   // row 2
        this.tableElement.appendChild(this.tablerowElmTo);     // row 3
        // row 1 cells appending
        this.tablerowElmTitles.appendChild(this.tableCellElmTitleEmpty);    // row 1, col 1
        this.tablerowElmTitles.appendChild(this.tableCellElmTitleYYMMDD);   // row 1, col 2
        this.tableCellElmTitleYYMMDD.innerHTML="Տարի-ամիս-օր";              // row 1, col 2
        this.tablerowElmTitles.appendChild(this.tableCellElmTitleHHMMSS);   // row 1, col 3
        this.tableCellElmTitleHHMMSS.innerHTML="Ժամ։րոպե";                  // row 1, col 3
        // row 2 cells appending
        this.tablerowElmFrom.appendChild(this.tableCellElmTitleFrom);       // row 2, col 1
        this.tableCellElmTitleFrom.innerHTML="Սկիզբ";     
        this.tableCellElmTitleFrom.setAttribute("class", "w100")                  // ռօո 2, col 1
        this.tablerowElmFrom.appendChild(this.tableCellElmYYMMDD_from);     // ռօո 2, col 2
        this.tablerowElmFrom.appendChild(this.tableCellElmHHMMSS_from);     // ռօո 2, col 3
        // row 3 cells appending
        this.tablerowElmTo.appendChild(this.tableCellElmTitleTo);           // row 3, col 1
        this.tableCellElmTitleTo.innerHTML = "Ավարտ";                       // row 3, col 1
        this.tablerowElmTo.appendChild(this.tableCellElmYYMMDD_to);         // row 3, col 2
        this.tablerowElmTo.appendChild(this.tableCellElmHHMMSS_to);         // row 3, col 3
        //
       this.inputElmDayFrom = document.createElement("input") as HTMLInputElement;
       this.inputElmDayFrom.setAttribute("type", "text"); 
       //this.inputElmDayFrom.setAttribute("placeholder", "YYY-MM-DD"); 
       
       this.inputElmDayFrom.setAttribute("class", this.cssclass); 
       this.tableCellElmYYMMDD_from.appendChild(this.inputElmDayFrom);
       this.tableCellElmYYMMDD_from.setAttribute("class", "DMS_cell")
       this.tableCellElmHHMMSS_from.setAttribute("class", "DMS_cell")
       //
       this.inputElmDayTo = document.createElement("input") as HTMLInputElement;
       this.inputElmDayTo.setAttribute("type", "text"); 
       this.inputElmDayTo.setAttribute("class", this.cssclass);
       //
       this.inputElmHHMMFrom = document.createElement("input") as HTMLInputElement;
       this.inputElmHHMMFrom.setAttribute("type", "text"); 
       this.inputElmHHMMFrom.setAttribute("class", this.cssclass);
       this.tableCellElmHHMMSS_from.appendChild(this.inputElmHHMMFrom);

       //
       this.inputElmHHMMTo = document.createElement("input") as HTMLInputElement;
       this.inputElmHHMMTo.setAttribute("type", "text"); 
       this.inputElmHHMMTo.setAttribute("class", this.cssclass);
       //
       this.tableCellElmYYMMDD_to.appendChild(this.inputElmDayTo);
       this.tableCellElmHHMMSS_to.appendChild(this.inputElmHHMMTo);

        /*
    placeholder_date
    placeholder_hour
        */
        if(this.placeholder_date !== ""){
            this.inputElmDayFrom.placeholder = this.placeholder_date;
            this.inputElmDayTo.placeholder  = this.placeholder_date;
        }
        if(this.placeholder_hour !== ""){
            this.inputElmHHMMFrom.placeholder = this.placeholder_hour;
            this.inputElmHHMMTo.placeholder  = this.placeholder_hour;
        }
        this.pElement.appendChild(this.tableElement);
        //
        this.inputElmDayFrom.addEventListener("change", ()=>{
            this.new_day_from=this.inputElmDayFrom.value;
            console.log(this.new_day_from);
        });
        this.inputElmDayTo.addEventListener("change", ()=>{
            this.new_day_to=this.inputElmDayTo.value;
            console.log(this.new_day_to);
        });
        this.inputElmHHMMFrom.addEventListener("change", ()=>{
            this.new_hour_from=this.inputElmHHMMFrom.value;
            console.log(this.new_hour_from);
        });
        this.inputElmHHMMTo.addEventListener("change", ()=>{
            this.new_hour_to=this.inputElmHHMMTo.value;
            console.log(this.new_hour_to);
        })
    }
  
    getDate(yymmdd:string, hhmmss:string):Date|boolean{
        // checking day
        let isvalid:boolean = true;
        let currentDate:Date = new Date();
        let outputDate = new Date();

        let hh:number=0;
        let mm:number =0;
        let day:string[] = yymmdd.split("-");
        let hourMinute:string[] = hhmmss.split(":");
        //
        if(hourMinute.length >= 2){
           hh = Number(hourMinute[0]) ;
           if(hh < 0 || hh > 23){
            console.info("Invalid Hour value");
            return false;
           }
           mm = Number(hourMinute[1]) ;
           if(mm < 0 || mm > 59){
            console.info("Invalid Minute value");
            return false;
           }
        }
        else{
            console.info("Invalid time");
            return false;
        }
        //
        if(day.length==3){
            if(Number(day[0]) <= Number(currentDate.getFullYear()) && 
                Number(day[1]) > 0 &&  Number(day[1])<13 && 
                Number(day[2]) > 0 &&  Number(day[2])<32 ){
                    outputDate.setFullYear(Number(day[0]));
                    outputDate.setMonth(Number(day[1]));
                    outputDate.setDate(Number(day[2]));
                    outputDate.setHours(hh);
                    outputDate.setMinutes(mm);
                    outputDate.setSeconds(0);
            }
            else{
                alert("Your entered date cannot be greater than currenent date");
                return false;
            }
        }
        else{
            alert("You must enter the date in YYYY-MM-DD (2019-08-26) format");
            return false;
        }
        return outputDate;
    }
    //
}
//
export class selectNewBlock{
    container:HTMLElement;
    //name:string[];          // 0-for select, 1-for input
    cssclass:string[];       // 0-for select, 1-for input
    id:string[]=[];             // 0-for select, 1-for input
    titleSelectInput:string[];   // 0-for select, 1-for input
    label:string;
    slectElm:HTMLSelectElement;
    inputElm:HTMLInputElement;
    options:string[]=["aa", "bb", "cc"];     // from database
    values:string[]=["1", "2", "3"];        // from database
    size:number=1;
    multiple:boolean=false;
    //
    selected_id:string;
    selected_value:string;
    new_value : string;
    // for internal use
    private pElement:HTMLParagraphElement;
    private lebelElement:HTMLLabelElement;
    private tebleElement:HTMLTableElement;
    private teblerowElement:HTMLTableRowElement;
    private tableCellElementSelect:HTMLTableCellElement;
    private tableCellElementInput:HTMLTableCellElement;
    // select
    private optionElements:HTMLOptionElement[]=[];
    private optionElement:HTMLOptionElement;
    private optTextNode:any;
    private selectElement:HTMLSelectElement;
    private selectedindex:number;
    // input
    private inputElement:HTMLInputElement;
    // result
    private resultArray:string[]=[];
    //
    constructor(container:HTMLElement, 
                options:string[],   // from database
                values:string[],    // from database
                titleSelectInput:string[],
                cssclass:string[],
                label:string,
                size:number=1,
                multiple:boolean=false,
                ){
        this.getSelectedIndex=this.getSelectedIndex.bind(this);
        this.getSelectedValue = this.getSelectedValue.bind(this);
        this.getNewValue = this.getNewValue.bind(this);
        this.getResultValueIndex = this.getResultValueIndex.bind(this);
        this.container = container;
        this.selectedindex = 0;
        //this.name = name;
        this.cssclass = cssclass;
        this.label = label;
        this.options =  options;
        this.values = values;
        this.titleSelectInput = titleSelectInput;
        this.size = size;
        this.multiple = multiple;
        // creating table with two columns
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        this.lebelElement = document.createElement("label") as HTMLLabelElement;
        this.lebelElement.innerText = this.label;
        this.pElement.appendChild(this.lebelElement);
        // table
        this.tebleElement = document.createElement("table") as HTMLTableElement;
        this.teblerowElement = document.createElement("tr") as HTMLTableRowElement;
        this.tableCellElementSelect = document.createElement("td") as HTMLTableCellElement;
        this.tableCellElementInput = document.createElement("td") as HTMLTableCellElement;
        this.tebleElement.appendChild(this.teblerowElement);
        this.teblerowElement.appendChild(this.tableCellElementSelect);
        this.teblerowElement.appendChild(this.tableCellElementInput);
        this.pElement.appendChild(this.tebleElement);
        // select
        this.optionElements=[] as HTMLOptionElement[];
        this.optionElement = document.createElement("option") as HTMLOptionElement;
        this.optionElement.value = "0";
        this.optTextNode = document.createTextNode(this.titleSelectInput[0]) as any;
        this.optionElement.appendChild(this.optTextNode);

        this.selectElement = document.createElement("select") as HTMLSelectElement;
        this.selectElement.setAttribute("class", this.cssclass[0]);
       // this.selectElement.setAttribute("name", this.name[0]);
        this.selectElement.setAttribute("id", this.id[0]);
        if(this.size>1){
            this.selectElement.setAttribute("size", size.toString());
        }
        if(this.multiple){
            this.selectElement.multiple=true;
        }
        this.selectElement.appendChild(this.optionElement);
        for(let i:number = 0; i<options.length;i++){
            this.optionElements[i]=document.createElement("option");
            this.optionElements[i].value = this.options[i];
            this.optionElements[i].innerText = this.values[i];
            this.selectElement.appendChild(this.optionElements[i]);
        }
        this.tableCellElementSelect.appendChild(this.selectElement);
        // Input
        // input
        this.inputElement = document.createElement("input") as HTMLInputElement;
        this.inputElement.setAttribute("type", "text");
        this.inputElement.setAttribute("class", this.cssclass[1]);
       // this.inputElement.setAttribute("name", this.name[1]);
        this.inputElement.setAttribute("id", this.id[1]);
        this.inputElement.placeholder=this.titleSelectInput[1];
        this.tableCellElementInput.appendChild(this.inputElement);
        // 
        //
        this.selectElement.addEventListener("change", ()=>{
            this.selectedindex = this.selectElement.selectedIndex;
            this.selected_id  =this.selectElement.options[this.selectedindex].value;
            this.selected_value= this.selectElement.options[this.selectedindex].text;
            console.log(this.selectedindex);
            console.log( this.selected_id);
            console.log( this.selected_value);
        })
        //
        this.inputElement.addEventListener("change", ()=>{
            this.new_value=this.inputElement.value;
            console.log(this.new_value);
        })
    }
    //
    getSelectedIndex():number{
        return this.selectedindex;
    }
    getNewValue():string{
        return this.new_value;
    }
    getSelectedValue():string{
        return this.selected_id;
    }
    getSelectedText():string{
        return this.selected_value;
    }
    getResultValueIndex():string[]{
        if(this.getNewValue() != undefined && this.getNewValue().trim() != ""){
            this.resultArray[0]=this.getNewValue(); // value
            this.resultArray[1]="0"; // index
        }
        else if(this.getSelectedValue() != "0"){
            this.resultArray[0]=this.getSelectedText(); // value
            this.resultArray[1]=this.getSelectedValue(); // index
        }
        else{
            this.resultArray[0]="0"; // value
            this.resultArray[1]="0";
        }
        return this.resultArray;
    }
}
// ****************************************************
export class selectBlock{
    container:HTMLElement;
    //name:string[];            // 0-for select
    cssclass:string;            // 0-for select
    id:string;                  // 0-for select
    titleSelect:string;    // 0-for select
    label:string;
    slectElm:HTMLSelectElement;
    //inputElm:HTMLInputElement;
    options:string[]=["aa", "bb", "cc"];     // from database
    values:string[]=["1", "2", "3"];        // from database
    size:number=1;
    multiple:boolean=false;
    //
    selected_id:string|string[];
    selected_value:string|string[];
    private selectedindex:number|number[];
    // select
    private optionElements:HTMLOptionElement[]=[];
    private optionElement:HTMLOptionElement;
    private optTextNode:any;
    private selectElement:HTMLSelectElement;
    
    // for internal use
    private pElement:HTMLParagraphElement;
    private lebelElement:HTMLLabelElement;
    private tebleElement:HTMLTableElement;
    private teblerowElement:HTMLTableRowElement;
    private tableCellElementSelect:HTMLTableCellElement;
    private tableCellElementInput:HTMLTableCellElement;
    
    //
    constructor(container:HTMLElement, 
                options:string[],   // from database
                values:string[],    // from database
                titleSelect:string,
                cssclass:string,
                label:string,
                size:number=1,
                multiple:boolean=false,
                ){
        this.getSelectedIndex=this.getSelectedIndex.bind(this);
        this.getSelectedValue = this.getSelectedValue.bind(this);
        this.getSelectElement = this.getSelectElement.bind(this);
        this.container = container;
        this.selectedindex=0;
        //this.name = name;
        this.cssclass = cssclass;
        this.label = label;
        this.options =  options;
        this.values = values;
        this.titleSelect = titleSelect;
        this.size = size;
        this.multiple = multiple;
        // creating table with two columns
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        this.lebelElement = document.createElement("label") as HTMLLabelElement;
        this.lebelElement.innerText = this.label;
        this.pElement.appendChild(this.lebelElement);
        // table
        this.tebleElement = document.createElement("table") as HTMLTableElement;
        this.teblerowElement = document.createElement("tr") as HTMLTableRowElement;
        this.tableCellElementSelect = document.createElement("td") as HTMLTableCellElement;
        this.tableCellElementInput = document.createElement("td") as HTMLTableCellElement;
        this.tebleElement.appendChild(this.teblerowElement);
        this.teblerowElement.appendChild(this.tableCellElementSelect);
        this.teblerowElement.appendChild(this.tableCellElementInput);
        this.pElement.appendChild(this.tebleElement);
        // select
        this.optionElements=[] as HTMLOptionElement[];
        this.optionElement = document.createElement("option") as HTMLOptionElement;
        this.optionElement.value = "0";
        this.optTextNode = document.createTextNode(this.titleSelect) as any;
        this.optionElement.appendChild(this.optTextNode);

        this.selectElement = document.createElement("select") as HTMLSelectElement;
        this.selectElement.setAttribute("class", this.cssclass);
       // this.selectElement.setAttribute("name", this.name[0]);
        this.selectElement.setAttribute("id", this.id);
        if(this.size>1){
            this.selectElement.setAttribute("size", size.toString());
        }
        if(this.multiple){
            this.selectElement.multiple=true;
        }
        this.selectElement.appendChild(this.optionElement);
        for(let i:number = 0; i<options.length;i++){
            this.optionElements[i]=document.createElement("option");
            this.optionElements[i].value = this.options[i];
            this.optionElements[i].innerText = this.values[i];
            this.selectElement.appendChild(this.optionElements[i]);
        }
        this.tableCellElementSelect.appendChild(this.selectElement);
        //
        if(this.multiple == false){
            this.selected_id= "" as string;
            this.selected_value = "" as string;
            this.selectedindex = 0 as number;
        }
        else{
            this.selected_id= [] as string[];
            this.selected_value = [] as string[];
            this.selectedindex = [] as number[];
        }
        if(this.multiple == false){
            this.selectElement.addEventListener("change", ()=>{
                this.selectedindex = this.selectElement.selectedIndex;
                this.selected_id  =this.selectElement.options[this.selectedindex].value;
                this.selected_value= this.selectElement.options[this.selectedindex].text;
                console.log(this.selectedindex);
                console.log( this.selected_id);
                console.log( this.selected_value);                
            })
        }
        else{
            this.selectElement.addEventListener("click", ()=>{
                this.selectedindex = [];
                this.selected_id = [];
                this.selected_value = [];
                for (let option of this.selectElement.options) {
                  if (option.selected) {
                    this.selectedindex.push(option.index)
                    this.selected_id.push(option.value);
                    this.selected_value.push(option.text);
                  }
                }
                console.info(this.selectedindex);
                console.info(this.selected_id);
                console.info(this.selected_value);          
            })
        }
        //
    }
    //
    getSelectedIndex():number|number[]{
        return this.selectedindex;
    }
    getSelectedValue():string|string[]{
        return this.selected_id;
    }
    getSelectedText():string|string[]{
        return this.selected_value;
    }
    getSelectElement():HTMLSelectElement{
        return this.selectElement
    }
}
//
export class inputBlock{
    container:HTMLElement; 
    name:string; 
    cssclass:string;
    id:string;
    label:string;
    inputElement:HTMLInputElement;
    placeholder:string;
    new_value : string;
    private pElement:HTMLParagraphElement;
    private lebelElement:HTMLLabelElement;
    constructor(container:HTMLElement,
                name:string,
                cssclass:string,
                id:string,
                label:string,
                placeholder:string=""
                ){
        this.getValue = this.getValue.bind(this);
        this.container = container;
        this.name = name;
        this.cssclass = cssclass;
        this.id = id;
        this.label = label;
        this.placeholder = placeholder;
        //
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        this.lebelElement = document.createElement("label") as HTMLLabelElement;
        this.lebelElement.innerText = this.label;
        this.pElement.appendChild(this.lebelElement);
        //
        this.inputElement = document.createElement("input") as HTMLInputElement;
        this.inputElement.setAttribute("type", "text");
        this.inputElement.setAttribute("class", this.cssclass);
        this.inputElement.setAttribute("id", this.id);
        if(this.placeholder!==""){
            this.inputElement.placeholder = this.placeholder;
        }
        this.pElement.appendChild(this.inputElement);
        this.inputElement.addEventListener("change", ()=>{
            this.new_value=this.inputElement.value;
            console.log(this.new_value);
        })

    }
  
    getValue():string{
        return this.new_value;
    }
}
//
export class inputDateTimeLocalBlock{
    container:HTMLElement; 
    name:string; 
    cssclass:string;
    id:string;
    label:string;
    inputElement:HTMLInputElement;
    placeholder:string;
    new_value : string;
    private pElement:HTMLParagraphElement;
    private lebelElement:HTMLLabelElement;
    constructor(container:HTMLElement,
                name:string,
                cssclass:string,
                id:string,
                label:string,
                placeholder:string=""
                ){
        this.getValue = this.getValue.bind(this);
        this.container = container;
        this.name = name;
        this.cssclass = cssclass;
        this.id = id;
        this.label = label;
        this.placeholder = placeholder;
        //
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        this.lebelElement = document.createElement("label") as HTMLLabelElement;
        this.lebelElement.innerText = this.label;
        this.pElement.appendChild(this.lebelElement);
        //
        this.inputElement = document.createElement("input") as HTMLInputElement;
        this.inputElement.setAttribute("type", "datetime-local");
        this.inputElement.setAttribute("class", this.cssclass);
        this.inputElement.setAttribute("id", this.id);
        if(this.placeholder!==""){
            this.inputElement.placeholder = this.placeholder;
        }
        this.pElement.appendChild(this.inputElement);
        this.inputElement.addEventListener("change", ()=>{
            this.new_value=this.inputElement.value;
            console.log(this.new_value);
        })

    }
  
    getValue():string{
        return this.new_value;
    }
}
//
export class inputAreaBlock{
    container:HTMLElement; 
    name:string; 
    cssclass:string;
    id:string;
    label:string;
    inputElement:HTMLTextAreaElement;
    rows:string;
    new_value : string;
    private pElement:HTMLParagraphElement;
    private lebelElement:HTMLLabelElement;
    constructor(container:HTMLElement,
                name:string,
                cssclass:string,
                id:string,
                label:string,
                rows:string="3"
                ){
        this.getValue = this.getValue.bind(this);
        this.container = container;
        this.name = name;
        this.cssclass = cssclass;
        this.id = id;
        this.label = label;
        //
        this.pElement = document.createElement("p") as HTMLParagraphElement;
        this.container.appendChild(this.pElement);
        this.lebelElement = document.createElement("label") as HTMLLabelElement;
        this.lebelElement.innerText = this.label;
        this.pElement.appendChild(this.lebelElement);
        //
        this.inputElement = document.createElement("textarea") as HTMLTextAreaElement;
        this.inputElement.setAttribute("type", "text");
        this.inputElement.setAttribute("class", this.cssclass);
        this.inputElement.setAttribute("rows", this.rows);
        this.inputElement.setAttribute("id", this.id);
        this.pElement.appendChild(this.inputElement);
        this.inputElement.addEventListener("change", ()=>{
            this.new_value=this.inputElement.value;
            console.log(this.new_value);
        })

    }
  //
    getValue():string{
        return this.new_value;
    }
}
/*
this.addMemberBtn = document.createElement("button") as HTMLButtonElement;
this.addMemberBtn.setAttribute("class", "w3-btn w3-border w3-text-green");
this.addMemberBtn.textContent="ԱՎԵԼԱՑՆԵԼ ՆՇՎԱԾ ՄԱՍՆԱԿՑԻՆ";
tableCellElMembers.appendChild(this.addMemberBtn);
*/
export class subTitle{
    container:any;//HTMLElement; 
    subtitle:string;
    cssClass:string;
    id:string;
    color:string;
    hElement:HTMLHeadElement;
    constructor(
        container:any, 
        subtitle:string,
        cssClass:string,
        id:string
        ){
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.container = container;
    this.subtitle = subtitle
    this.id = id;
    this.cssClass = cssClass;
//
    this.hElement= document.createElement("h5");
    this.hElement.setAttribute("class", this.cssClass);
    this.subtitle = "<b>"+this.subtitle+"</b>";
    this.hElement.innerHTML = this.subtitle;
    this.container.appendChild(this.hElement);
    }
    show(){this.hElement.style.display="none"}
    hide(){this.hElement.style.display="block"}
}