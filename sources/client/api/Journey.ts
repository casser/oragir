import {JourneyInit, Journey, Member} from "./Api";

export class newJourneyForm{
    parent_container: HTMLDivElement;
    //mode: string;   // new, edit, display
    form:HTMLFormElement;
    journey_init: JourneyInit; //?
    journey: Journey; 
    countrySelectNew: selectNewBlock;
    memberSelectNew: selectNewBlock
    formHead: string;
    formHeadContainer: HTMLDivElement;
    dateBeginInput: HTMLInputElement; 
    journeyNameInput: HTMLInputElement; 
    newCountryInput: HTMLInputElement; 
    selectCountryInput: HTMLSelectElement; 
    journeyLeaderInput: HTMLInputElement; 
    selectJourneyLeader: HTMLSelectElement; 
    notesInput: HTMLTextAreaElement; 
    // members
    members: Member[]=[]; 
    selectedMembers: Member[]=[]; 
    memberName_id:string[];
    memberNames:string[];
    membersBlock: HTMLDivElement;
    selectMemberInput: HTMLSelectElement;
    newMemberInput: HTMLInputElement;
    photoCameraSelect: HTMLSelectElement;
    videoCameraSelect: HTMLSelectElement;
    addMemberBtn: HTMLButtonElement;
    // member preview blick
    memberViewBlock:HTMLDivElement;
    memberViewTitleBlock:HTMLDivElement;
    
    //
    descriptionInput: HTMLTextAreaElement;
    //
    saveJourneyBtn: HTMLButtonElement;
    //
    onAddMember: (member_id:string) => void;
    //
    constructor(parent_container: HTMLDivElement) {
        this.makeInput = this.makeInput.bind(this);
        this.makeSelectNew = this.makeSelectNew.bind(this);
        this.makeSubTitle = this.makeSubTitle.bind(this);
        this.makeSelect = this.makeSelect.bind(this);
        this.addMember = this.addMember.bind(this);
        this.makeTextArea = this.makeTextArea.bind(this);
        this.parent_container = parent_container as HTMLDivElement;
        this.form = document.createElement("form");
        this.form.setAttribute("class", "w3-container w3-card-2 w3-border w3-light-grey");
        this.parent_container.appendChild(this.form);
 
        this.makeSubTitle(this.form, "ՆՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ", "green");
        //
        this.makeInput(this.form, 
                        "date_from", 
                        "w3-input w3-border", 
                        "date_from", 
                        "Սկսվելու ամսաթիվը (տարի-ամիս-օր)",
                        this.dateBeginInput);
        this.makeInput(this.form, 
                        "journey_name", 
                        "w3-input w3-border", 
                        "journey_name", 
                        "Ճամփորդության անվանումը",
                        this.journeyNameInput);    
        this.makeInput(this.form, 
                        "journey_head", 
                        "w3-input w3-border", 
                        "journey_head", 
                        "Խմբի ղեկավարը", 
                        this.journeyLeaderInput);    
        this.makeSelectNew(this.form,
                            ["sel_country", "new_country"],
                            ["w3-select", "w3-input w3-border"],
                            "Երկիրը", 
                            ["sel_country", "new_country"], 
                            ["Ընտրեք Երկիրը", "Նոր երկիր"],
                            this.selectCountryInput, this.newCountryInput,
                            ["ՀՀ", "Թուրքիա", "Վրաստան", "Իրան"]  );
        //members
        this.membersBlock = document.createElement("div") as HTMLDivElement;    // containers for members input block
        this.membersBlock.setAttribute("class", "w3-border-bottom");
        this.form.appendChild(this.membersBlock);
        this.makeSubTitle(this.membersBlock, "ՃԱՄՓՈՐԴՈՒԹՅԱՆ ԱՆԴԱՄՆԵՐ (ԼՈՒՍԱՆԿԱՐԻՉՆԵՐ, ՏԵՍԱՆԿԱՐԱՀԱՆՈՂՆԵՐ)", "green");
        // table with 3 columns for members input form
        let tebleMember:HTMLTableElement = document.createElement("table");
        let teblerMenmerRow:HTMLTableRowElement = document.createElement("tr");
        teblerMenmerRow.style.verticalAlign = "top";
        let tableCellElMembers:HTMLTableCellElement = document.createElement("td");
        let tableCellPhotoCamera:HTMLTableCellElement = document.createElement("td");
        let tableCellVideoCamera:HTMLTableCellElement = document.createElement("td");
        // here code to get all member names from database tbl_members.member
        this.memberNames=["Սասուն", "Րաֆֆի", "Աշոտ", "Անուշ", "Էմմա", "Lala"];  // as example
        this.memberName_id = ["1", "5", "10", "11", "21", "2"];                 // as example
        // creating array of member objects
        for(let i:number=0; i<this.memberNames.length; i++) {
            this.members[i] = {id:this.memberName_id[i], member:this.memberNames[i]};
        }
        console.info(this.members); // test OK
        //
        tebleMember.appendChild(teblerMenmerRow);
        teblerMenmerRow.appendChild(tableCellElMembers);
        teblerMenmerRow.appendChild(tableCellPhotoCamera);
        teblerMenmerRow.appendChild(tableCellVideoCamera);
        this.membersBlock.appendChild(tebleMember);
        this.selectMemberInput = document.createElement("select") as HTMLSelectElement;
        /*
container:HTMLElement, 
options:string[],   // from database
values:string[],    // from database
titleSelectInput:string[],
cssclass:string[],
                label:string,
                size:number=1,
                multiple:boolean=false,
        */
        this.memberSelectNew =new selectNewBlock(tableCellElMembers, 
                                                this.memberName_id, 
                                                this.memberNames,
                                                ["Ընտրեք մասնակցին", "Նոր մասնակից"], 
                                                ["w3-select", "w3-input w3-border"],
                                                "Ճամփորդության մասնակիցներ"
                                                );
/*
        this.makeSelectNew(tableCellElMembers,
                            ["sel_member", "new_mamber"], 
                            ["w3-select", "w3-input w3-border"],
                            "Ճամփորդության մասնակիցներ", 
                            ["sel_member", "new_mamber"], 
                            ["Ընտրեք մասնակցին", "Նոր մասնակից"],
                            this.selectMemberInput, 
                            this.newMemberInput,
                            this.memberNames,    // getting from database
                            this.memberName_id    //  getting from database
        );
*/
        this.makeSelect(tableCellPhotoCamera,
                "sel_photo_camera",
                "w3-select",
                "Ֆոտոխցիկներ (1 և ավելի)", 
                "- - -",
                this.photoCameraSelect,
                ["Nikon D700", "Nikon D750", "Nikon D700 SAMVEL", "Cannon", "Telephone"],    // from database
                ["4", "5", "7", "9", "11" ],                                                 // from database
                6,
                true
        );

        this.makeSelect(tableCellVideoCamera,
                "sel_video_camera",
                "w3-select",
                "Տեսախցիկներ (1 և ավելի)", 
                "- - -",
                this.photoCameraSelect,
                ["Nikon D750", "Nikon coolPix", "Cannon", "Telephone", ],    // from database
                ["14", "25", "97", "111" ],                                  // from database
                6,
                true
        );
        this.addMemberBtn = document.createElement("button") as HTMLButtonElement;
        this.addMemberBtn.setAttribute("class", "w3-btn w3-border w3-text-green");
        this.addMemberBtn.textContent="ԱՎԵԼԱՑՆԵԼ ՆՇՎԱԾ ՄԱՍՆԱԿՑԻՆ"
        tableCellElMembers.appendChild(this.addMemberBtn);
        this.memberViewBlock = document.createElement("div") as HTMLDivElement; 
        this.membersBlock.appendChild(this.memberViewBlock);
        this.memberViewTitleBlock=document.createElement("div") as HTMLDivElement; 
        this.memberViewBlock.appendChild( this.memberViewTitleBlock);
        this.memberViewTitleBlock.setAttribute("class", "w3-text-green");
        this.memberViewTitleBlock.innerText="Ընտրված մասնակիցները"

        //
        this.makeTextArea(this.form, 
            "description", 
            "w3-input w3-border", 
            "description", 
            "Նշումներ ճամփորդության մասին", 
            this.descriptionInput
        ); 
        //
        this.saveJourneyBtn = document.createElement("button") as HTMLButtonElement;
        this.saveJourneyBtn.setAttribute("class", "w3-btn w3-border w3-green");
        this.saveJourneyBtn.textContent="ԳՐԱՆՑԵԼ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆԸ"
        this.form.appendChild(this.saveJourneyBtn);
        this.selectMemberInput.addEventListener("change", ()=>{
            console.info("this.selectMemberInput.value")
        })
        // onAddMember: (member_id:string) => void;
        this.addMemberBtn.addEventListener('click', () => {
            this.addMember(this.selectMemberInput.value);
        });
    
    }
    // 
    
    addMember(memberName:string){
        console.info(memberName);
    }
    //
    makeSubTitle(container:HTMLElement,
                subtitle:string,
                color:string){
        let hElement:HTMLHeadElement = document.createElement("h5");
        hElement.setAttribute("class", "w3-text-"+color+" w3-border-bottom w3-border-"+color+" submenu_active");
        subtitle = "<b>"+subtitle+"</b>";
        hElement.innerHTML = subtitle;
        container.appendChild(hElement);
    }   
    //
    makeTextArea(container:HTMLFormElement, 
                name:string, 
                cssclass:string, 
                id:string, 
                label:string,
                element:HTMLTextAreaElement){
        let pElement:HTMLParagraphElement = document.createElement("p");
        container.appendChild(pElement);
        let lebelElement:HTMLLabelElement = document.createElement("label");
        lebelElement.innerText = label;
        pElement.appendChild(lebelElement);
        let inputElement:HTMLTextAreaElement = document.createElement("textarea");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("class", cssclass);
        inputElement.setAttribute("name", name);
        inputElement.setAttribute("id", id);
        pElement.appendChild(inputElement);
        element = inputElement
    } 
    //
    makeInput(container:HTMLFormElement, 
                name:string, 
                cssclass:string, 
                id:string, 
                label:string,
                element:HTMLInputElement){
        let pElement:HTMLParagraphElement = document.createElement("p");
        container.appendChild(pElement);
        let lebelElement:HTMLLabelElement = document.createElement("label");
        lebelElement.innerText = label;
        pElement.appendChild(lebelElement);
        let inputElement:HTMLInputElement = document.createElement("input");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("class", cssclass);
        inputElement.setAttribute("name", name);
        inputElement.setAttribute("id", id);
        pElement.appendChild(inputElement);
        element = inputElement
    }
    //
    makeSelect(container:HTMLElement, 
                name:string, 
                cssclass:string, 
                label:string,
                selectTitle:string,
                slectElm:HTMLSelectElement,
                options:string[]=["aa", "bb", "cc"],    // from database
                values:string[]=["1","15","69"],        // from database
                size:number=1,
                multiple:boolean=false){
        let pElement:HTMLParagraphElement = document.createElement("p");
        let lebelElement:HTMLLabelElement = document.createElement("label");
        lebelElement.innerText = label;
        pElement.appendChild(lebelElement);
        container.appendChild(pElement);
        // select
        let optionElements:HTMLOptionElement[]=[];
        let optionElement:HTMLOptionElement = document.createElement("option");
        optionElement.value = "0";
        let optTextNode:any = document.createTextNode(selectTitle);
        optionElement.appendChild(optTextNode);

        let selectElement:HTMLSelectElement = document.createElement("select");
        selectElement.setAttribute("class", cssclass);
        selectElement.setAttribute("name", name);
        if(size>1){
            selectElement.setAttribute("size", size.toString());
        }
        if(multiple){
            selectElement.multiple=true;
        }
        selectElement.appendChild(optionElement);
        for(let i:number = 0; i<options.length;i++){
            optionElements[i]=document.createElement("option");
            optionElements[i].value=values[i];
            optionElements[i].innerText=options[i];
            selectElement.appendChild(optionElements[i]);
        }
        pElement.appendChild(selectElement);
        slectElm = selectElement;
    }
    //
    makeSelectNew(container:HTMLElement,
        name:string[], // 0-for select, 1-for input
        cssclass:string[], 
        label:string,
        id:string[], 
        selectTitle:string[],
        slectElm:HTMLSelectElement,
        inputElm:HTMLInputElement,
        options:string[]=["aa", "bb", "cc"],     // from database
        values:string[]=["1", "2", "3"],        // from database
        size:number=1,
        multiple:boolean=false
        ){
        if(name.length==2 && cssclass.length==2 && id.length==2) {
            let pElement:HTMLParagraphElement = document.createElement("p");
            container.appendChild(pElement);
            let lebelElement:HTMLLabelElement = document.createElement("label");
            lebelElement.innerText = label;
            pElement.appendChild(lebelElement);
            // table
            let tebleElement:HTMLTableElement = document.createElement("table");
            let teblerowElement:HTMLTableRowElement = document.createElement("tr");
            let tableCellElementSelect:HTMLTableCellElement = document.createElement("td");
            let tableCellElementInput:HTMLTableCellElement = document.createElement("td");
            tebleElement.appendChild(teblerowElement);
            teblerowElement.appendChild(tableCellElementSelect);
            teblerowElement.appendChild(tableCellElementInput);
            pElement.appendChild(tebleElement);
            // select
            let optionElements:HTMLOptionElement[]=[];
            let optionElement:HTMLOptionElement = document.createElement("option");
            optionElement.value = "0";
            let optTextNode:any = document.createTextNode(selectTitle[0]);
            optionElement.appendChild(optTextNode);

            let selectElement:HTMLSelectElement = document.createElement("select");
            selectElement.setAttribute("class", cssclass[0]);
            selectElement.setAttribute("name", name[0]);
            selectElement.setAttribute("id", id[0]);
            if(size>1){
                selectElement.setAttribute("size", size.toString());
            }
            if(multiple){
                selectElement.multiple=true;
            }
            selectElement.appendChild(optionElement);
            for(let i:number = 0; i<options.length;i++){
                optionElements[i]=document.createElement("option");
                optionElements[i].value = values[i];
                optionElements[i].innerText=options[i];
                selectElement.appendChild(optionElements[i]);
            }
            tableCellElementSelect.appendChild(selectElement);
            // input
            let inputElement:HTMLInputElement = document.createElement("input");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("class", cssclass[1]);
            inputElement.setAttribute("name", name[1]);
            inputElement.setAttribute("id", id[1]);
            inputElement.placeholder=selectTitle[1];
            tableCellElementInput.appendChild(inputElement);
            //
            slectElm = selectElement
            inputElm = inputElement
        } 
        else{
            throw new Error('makeSelectNew() parameter Arrays must have length == 2');
        }
    }   // end of makeSelectNew(...)


}
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
    selected_id:string | number;
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
        this.container = container;
        this.selectedindex=0;
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
}