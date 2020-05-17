import {JourneyInit, Journey, Member, Camera} from "../../api/Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle} from "../components/Inputs";
import {JMember} from "./Member";

export class newJourneyForm{
    parent_container: HTMLDivElement;
    // subtitles
    subtitleNewJourn: subTitle;
    subtitleNewMember: subTitle;
    form:HTMLFormElement;
    journey_init: JourneyInit; //?
    journey: Journey; 
    countrySelectNew: selectNewBlock;
    memberSelectNew: selectNewBlock;
    formHead: string;
    formHeadContainer: HTMLDivElement;
    // date 
    dateInputBlock: inputBlock;
    dateBeginInput: HTMLInputElement; 
    // journey
    jNameInputBlock:inputBlock;
    journeyNameInput: HTMLInputElement; 
    // Leader
    leaderInputBlock: inputBlock;
    // country
    newCountryInput: HTMLInputElement; 
    selectCountryInput: HTMLSelectElement; 
    countryNames:string[];      // from database: SELECT DISTINCT country from tbl_jorney
    countryName_id:string[];    // from database: is the same as countryNames
    countrySelectNewBlock:selectNewBlock;

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
    // cameras
    photoCamSelObj: selectBlock;
    videoCamSelObj: selectBlock;
    photoCameraSelect: HTMLSelectElement;
    videoCameraSelect: HTMLSelectElement;
    PhotoCamera:Camera;
    VideoCamera:Camera;
    // photo cameras from database
    photoCameras:string[];    // Select name, camera_d from tbl_camera where photo = true
    photoCameraIds:string[];
    photoCameraModels:string[];
    phCamObj:Camera[]=[];
    // video cameras from database
    videoCameras:string[];    // Select name, camera_d from tbl_camera where video = true
    videoCameraIds:string[];
    videoCameraModels:string[];
    vCamObj:Camera[]=[];
    //
    // member preview block
    memberViewBlock:HTMLDivElement;
    memberViewTitleBlock:HTMLDivElement;
    addMemberBtn: HTMLButtonElement;
    //
    descriptionInput: HTMLTextAreaElement;
    //
    saveJourneyBtn: HTMLButtonElement;
    //
    onAddMember: (member_id:string) => void;
    //
    constructor(parent_container: HTMLDivElement) {
        //this.makeSubTitle = this.makeSubTitle.bind(this);
        this.addMember = this.addMember.bind(this);
        this.makeTextArea = this.makeTextArea.bind(this);
        this.getCameraByName = this.getCameraByName.bind(this);
        this.isCameraAvailable = this.isCameraAvailable.bind(this);
        this.getMemberByName = this.getMemberByName.bind(this);
        
        this.parent_container = parent_container as HTMLDivElement;
        this.form = document.createElement("form");
        this.form.setAttribute("class", "w3-container w3-light-grey w3-margin-top w3-margin-bottom");
        this.parent_container.appendChild(this.form);
 /*
        this.subtitleNewJourn = new subTitle(this.form,
            "ՆՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ",
            "w3-text-green w3-border-bottom w3-border-green submenu_active",
             "subtitleNewJourn_id"
            )
            */
        //
        this.dateInputBlock = new inputBlock(
            this.form,
            "date_from",
            "w3-input w3-border",
            "date_from",
            "Սկսվելու ամսաթիվը (տարի-ամիս-օր)",
            "YYYY-MM-DD"
        )
        this.jNameInputBlock = new inputBlock(
            this.form,
            "journey_name",
            "w3-input w3-border",
            "journey_name",
            "Ճամփորդության անվանումը"
        );
        this.leaderInputBlock = new inputBlock(
            this.form,
            "journey_head",
            "w3-input w3-border",
            "journey_head",
            "Խմբի ղեկավարը"
        )
       //
        this.countryNames = ["ՀՀ", "Թուրքիա", "Վրաստան", "Իրան"];  // as example
        this.countryName_id = this.countryNames; // ["3", "6", "9", "11"];                 // as example
        this.countrySelectNewBlock = new selectNewBlock(this.form, 
                            this.countryName_id, 
                            this.countryNames,
                            ["Ընտրեք Երկիրը", "Նոր երկիր"], 
                            ["w3-select", "w3-input w3-border"],
                            "Երկիրը"
                            );
       
        //members
        this.membersBlock = document.createElement("div") as HTMLDivElement;    // containers for members input block
        this.membersBlock.setAttribute("class", "w3-border-bottom");
        this.form.appendChild(this.membersBlock);

        this.subtitleNewMember = new subTitle(this.membersBlock,
            "ՃԱՄՓՈՐԴՈՒԹՅԱՆ ԱՆԴԱՄՆԵՐ (ՆԿԱՐԱՀԱՆՈՂՆԵՐ)",
            "w3-text-green w3-border-bottom w3-border-green submenu_active",
             "subtitleNewMember_id"
            )
        // table with 3 columns for members input form
        let tebleMember:HTMLTableElement = document.createElement("table");
        let teblerMenmerRow:HTMLTableRowElement = document.createElement("tr");
        teblerMenmerRow.style.verticalAlign = "top";
        let tableCellElMembers:HTMLTableCellElement = document.createElement("td");
        let tableCellPhotoCamera:HTMLTableCellElement = document.createElement("td");
        let tableCellVideoCamera:HTMLTableCellElement = document.createElement("td");
        // here code to get all member names from database tbl_members.member
        this.memberNames=["Սասուն", "Րաֆֆի", "Աշոտ", "Անուշ", "Էմմա", "Lala"];  // example (from database)
        this.memberName_id = ["1", "5", "10", "11", "21", "2"];                 // example (from database)
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
        
        this.memberSelectNew = new selectNewBlock(tableCellElMembers, 
                                                this.memberName_id, 
                                                this.memberNames,
                                                ["Ընտրեք մասնակցին", "Նոր մասնակից"], 
                                                ["w3-select", "w3-input w3-border"],
                                                "Ճամփորդության մասնակիցներ"
                                                );
        //simulated data from database
        this.photoCameras=["Nikon D700 Sasun", "Nikon D750 Raffi", "Nikon D700 SAMVEL", "Cannon", "Telephone"];    
        this.photoCameraIds=["4", "5", "7", "9", "11"];
        this.photoCameraModels=["Nikon D700", "Nikon D750", "Nikon D700", "Cannon MM 600", "Redmi"];
        for(let i:number=0; i<this.photoCameras.length; i++){
            this.phCamObj.push({name:this.photoCameras[i],
                                photo:true,
                                video:false,
                                model:this.photoCameraModels[i]});
        }

        this.photoCamSelObj = new selectBlock(tableCellPhotoCamera,
                            this.photoCameraIds,
                            this.photoCameras,
                            "- - - - - - - - - - - - - - - - - -",
                            "w3-select w3-border w3-padding",
                            "Ֆոտոխցիկներ (1 և ավելի)",
                            6, 
                            true
                        );

        //simulated data from database
        this.videoCameras=["Nikon D750", "Nikon coolPix", "Cannon", "Telephone"];    
        this.videoCameraIds=["14", "25", "97", "111"];
        this.videoCameraModels=["Nikon D750", "Nikon coolPix 600", "Cannon mm 600", "Redmi"];
        for(let i:number=0; i<this.videoCameras.length; i++){
            this.vCamObj.push({name:this.videoCameras[i],
                                photo:false,
                                video:true,
                                model:this.videoCameraModels[i]});
        }

        this.videoCamSelObj = new selectBlock(tableCellVideoCamera,
            this.videoCameraIds,
            this.videoCameras,
            "- - - - - - - - - - - - - - - - - -",
            "w3-select w3-border w3-padding",
            "Տեսախցիկներ (1 և ավելի)",
            6, 
            true
        );

        this.addMemberBtn = document.createElement("button") as HTMLButtonElement;
        this.addMemberBtn.setAttribute("class", "w3-btn w3-border w3-text-green");
        this.addMemberBtn.textContent="ԱՎԵԼԱՑՆԵԼ ՆՇՎԱԾ ՄԱՍՆԱԿՑԻՆ";
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
        //
        this.selectMemberInput.addEventListener("change", ()=>{
            console.info("this.selectMemberInput.value")
        })
        // onAddMember: (member_id:string) => void;
        this.addMemberBtn.addEventListener('click', (e) => {
            let aaaa:string[] = this.memberSelectNew.getResultValueIndex();
            let memberNames:string[] = [];
            let membersIsEmpty:boolean=true;
            let onePhotoCameraSelected:boolean = false;
            let morePhotoCamerasSelected:boolean = false;
            let oneVideoCameraSelected:boolean = false;
            let moreVideoCameraSelected:boolean = false;
            // creating array of names of selected memembers
            if(this.selectedMembers.length>0){
                for(let i:number=0; i<this.selectedMembers.length; i++){
                    memberNames.push(this.selectedMembers[i].member);
                    membersIsEmpty = false;
                }
            }
            else{
                membersIsEmpty=true;
            }
            console.info(membersIsEmpty) //ok
            // getting selected photocameras
            const aphotocam:string|string[] = this.photoCamSelObj.getSelectedValue();
            const aphotocam_name:string|string[] = this.photoCamSelObj.getSelectedText();
            console.info(aphotocam);
            console.info(aphotocam_name);

            if(aphotocam != undefined){
                if(typeof aphotocam == "string" && aphotocam != "0"){
                    onePhotoCameraSelected=true;
                }
                else if(Array.isArray(aphotocam) && aphotocam.length>1){
                    morePhotoCamerasSelected=true;
                }
            }
            const avideocam:string|string[] = this.videoCamSelObj.getSelectedValue();
            if(avideocam != undefined){
                if(typeof avideocam == "string" && avideocam != "0"){
                    oneVideoCameraSelected=true;
                }
                else if(Array.isArray(avideocam) && avideocam.length>1){
                    moreVideoCameraSelected=true;
                }
            }
            //finding members from registered list
            if((aaaa[1]==undefined || aaaa[1]=="0") && (aaaa[0]==undefined || aaaa[0]=="0")){
                alert("Please select or insert Member!!!!!!!!!!!!");
                throw new Error("Please select or insert Member!");
            }
            else
            {
                for(let i:number=0; i<this.members.length; i++){
                    if(this.members[i].id==aaaa[1] && this.members[i].member==aaaa[0]){
                        //console.info(this.members[i]);
                        if(membersIsEmpty==true && !memberNames.includes(this.members[i].member)  ){
                            // checking for selected cameras // at least one
                            if(onePhotoCameraSelected || morePhotoCamerasSelected || oneVideoCameraSelected ||moreVideoCameraSelected){
                                console.info(this.members[i]);
                                if(onePhotoCameraSelected){
                                    let pCam:Camera={
                                                name:<string>aphotocam_name, 
                                                photo:true, 
                                                video:false, 
                                                model:<string>aphotocam_name
                                                }
                                    // this.members[i].photocamera=[{name:aphotocam.name,}] ??????????????????????????????????????????
                                    this.members[i].photocamera=[pCam];
                                    console.info(this.members[i]);
                                }
                                this.selectedMembers.push(this.members[i]);
                                console.info(this.selectedMembers);

                            }

                            // if name was not included in selected Memnbers array
                        }
                    }
                }
            }
 
            this.addMember(aaaa);
            e.preventDefault(); //ok
        });
    
    }
    // 
    /*
export interface Member{
    id?: string,
    member: string, // unique
    photocamera?: Array<Camera>,
    videocamera?: Array<Camera>
}
// VideoCamera
export interface Camera{
    name:string,
    photo:boolean,
    video:boolean,
    model:string,
    owner?: string,
    date_creation_tag?: string,
    tags_photo?: string[];
    tags_video?: string[];
}
    this.members[i] = {id:this.memberName_id[i], member:this.memberNames[i]};

    getSelectedValue():string|string[]{
        return this.selected_id;
    }
    getSelectedText():string|string[]{
        return this.selected_value;
    }
    photoCamSelObj: selectBlock;
    videoCamSelObj: selectBlock;
    photoCameraSelect: HTMLSelectElement;
    videoCameraSelect: HTMLSelectElement;
    PhotoCamera:Camera;
    VideoCamera:Camera;
            */
    
    addMember(memberName:string[]):void{
        console.info(this.phCamObj);
        console.info(this.vCamObj);
        if((memberName[1]==undefined || memberName[1]=="0") && (memberName[0]==undefined || memberName[0]=="0")){
            alert("Please select or insert Member")
        }

        console.info(memberName);
    }
    //
    /*
    makeSubTitle(container:HTMLElement,
                subtitle:string,
                color:string){
        let hElement:HTMLHeadElement = document.createElement("h5");
        hElement.setAttribute("class", "w3-text-"+color+" w3-border-bottom w3-border-"+color+" submenu_active");
        subtitle = "<b>"+subtitle+"</b>";
        hElement.innerHTML = subtitle;
        container.appendChild(hElement);
    }   */
    //
    isCameraAvailable(camName:string):boolean{
        if(this.phCamObj != undefined && Array.isArray(this.phCamObj)){
            for(let i:number=0; i<this.phCamObj.length; i++){
                if(camName === this.phCamObj[i].name){
                    return true;
                }
            }
        }
        if(this.vCamObj != undefined && Array.isArray(this.vCamObj)){
            for(let i:number=0; i<this.vCamObj.length; i++){
                if(camName === this.vCamObj[i].name){
                    return true;
                }
            }
        }
        return false;
    }
    //
    getMemberByName(mNmae:string): Member|undefined {
        for(let i:number=0; i<this.members.length; i++){
            if(this.members[i].member == mNmae){
                this.members[i];
            }
        }
        return;
    }
    //
    getCameraByName(camName:string, isPhoto:boolean=true):Camera|undefined {
        if(isPhoto==true){
            if(this.phCamObj != undefined && Array.isArray(this.phCamObj)){
                for(let i:number=0; i<this.phCamObj.length; i++){
                    if(camName === this.phCamObj[i].name){
                        return this.phCamObj[i];
                    }
                }
            } 
        }
        else{
            if(this.vCamObj != undefined && Array.isArray(this.vCamObj)){
                for(let i:number=0; i<this.vCamObj.length; i++){
                    if(camName === this.vCamObj[i].name){
                        return this.vCamObj[i];
                    }
                }
            }
        }
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
   

}
