import {NoteNew} from "./Notes";

export class SubMenu{
    parent_container: HTMLElement;
    active_index: number;
    submenu_block: HTMLDivElement;
    info_line_block: HTMLDivElement;
   //
    submenu_titles: Array<string>=[];
    subMenu_title_buttons: Array<HTMLButtonElement>;
    subMenu_containers: Array<HTMLDivElement>=[];
    i:number;
    //journey_init: JourneyInit;
    //
    activeClass:string;
    passiveClass:string;
    subMenuBlockClass:string;
    contentClass:string;
    // forms
    submenu_content: Array<any>=[];
    //
    constructor(parent_container: HTMLElement, 
                submenu_titles:Array<string>,
                active_index: number=0,
                submenu_content: Array<any>
               ) {
                    //
        this.change = this.change.bind(this);
        this.makeSubMenuArray = this.makeSubMenuArray.bind(this);
        this.loadObject = this.loadObject.bind(this);
        //
        this.submenu_titles = submenu_titles;
        
        this.parent_container = parent_container;
        this.submenu_block = document.createElement("div") as HTMLDivElement;
        this.info_line_block = document.createElement("div") as HTMLDivElement;
        this.info_line_block.setAttribute("class", "w3-panel w3-pale-green");
        this.info_line_block.innerText="AAA";
        this.parent_container.appendChild(this.submenu_block);
        this.active_index = active_index;
        this.submenu_content = submenu_content;
        //this.subMenu_title_buttons = [document.createElement("div")];
        this.activeClass = "w3-btn w3-white w3-border w3-border-green w3-round-large submenu_button";
        this.passiveClass = "w3-btn w3-white w3-border w3-text-yellow submenu_button";
        this.contentClass = "w3-container";
        this.subMenuBlockClass = "w3-text-green w3-border-bottom w3-border-green submenu_active";
        this.submenu_block.setAttribute("class", this.subMenuBlockClass);
        //
        //this.ancorelement = document.createElement("a");
        this.subMenu_title_buttons=this.makeSubMenuArray(this.submenu_block, this.submenu_titles);
//
        for(let i:number =0; i<this.submenu_titles.length; i++){
            console.info(i);
            //this.subMenu_title_buttons[i].innerText=this.menu_titles[i];    /////
            this.parent_container.appendChild(this.submenu_block);
            this.submenu_block.appendChild(this.subMenu_title_buttons[i])
            this.subMenu_containers[i] = document.createElement("div");
            this.subMenu_containers[i].setAttribute("class",this.contentClass); // Content
            //this.subMenu_containers[i].innerHTML=`<h5 class= "w3-text-green">${this.submenu_titles[i]}</h5>`
            // here append content object
            if(this.submenu_content[i] instanceof HTMLElement){
                this.subMenu_containers[i].appendChild(this.submenu_content[i])
            }
            else if(typeof this.submenu_content[i] === "string"){
                this.subMenu_containers[i].innerHTML = this.submenu_content[i];
            }
            else if(this.submenu_content[i] instanceof NoteNew) {
                this.loadObject(this.submenu_content[i].getContainer(), i);
                //this.subMenu_containers[i].innerHTML = "Not Supported Type of Content";
            }
            if(this.active_index === i){
                this.subMenu_title_buttons[i].setAttribute("class", this.activeClass);
                this.parent_container.appendChild(this.subMenu_containers[i]);            // content
            }
            else{
                this.subMenu_title_buttons[i].setAttribute("class", this.passiveClass);
            }
            this.subMenu_containers[i].style.display="none";
        }
        this.parent_container.appendChild(this.subMenu_containers[this.active_index]);
        this.subMenu_containers[this.active_index].style.display="block";
        for(let i=0; i<this.subMenu_title_buttons.length; i++){
            //this.menuItemDivs[i].onclick=this.change(i);
            this.subMenu_title_buttons[i].onclick=(e)=>{
                e.preventDefault();
              console.log(i);
              this.change(i);
            }
        }
    }
    //
    makeSubMenuArray(parent:HTMLDivElement, atitles:string[]){
        //let aa: Array<HTMLAnchorElement>;
        let aa: HTMLButtonElement[] = [];
        let item:HTMLButtonElement;
        for(let i=0; i<atitles.length; i++){
            item = document.createElement("button");
            item.value = atitles[i];
            item.innerText = atitles[i];
            aa.push(item);
            item=null;
        }
        return aa;
    }
    //
    change(ind:number){
        for(let i=0; i<this.subMenu_containers.length; i++){
          this.subMenu_containers[i].setAttribute("class",this.contentClass);
          //
          if(this.submenu_content[i] instanceof HTMLElement){
                this.subMenu_containers[i].appendChild( this.submenu_content[i])
            }
            else if(typeof this.submenu_content[i] === "string"){
                this.subMenu_containers[i].innerHTML = this.submenu_content[i];
            }
            else if(this.submenu_content[i] instanceof NoteNew) {
                this.loadObject(this.submenu_content[i].getContainer(), i);
            }
          //
          if(ind === i){
            this.subMenu_title_buttons[i].setAttribute("class", this.activeClass);
            this.subMenu_containers[i].style.display="block";
            this.parent_container.appendChild(this.subMenu_containers[i]);
            //console.log(this.pageContObj[i]);
          }
          else{
            this.subMenu_title_buttons[i].setAttribute("class", this.passiveClass);
            this.subMenu_containers[i].style.display="none";
          }
        }
    }
    //
    loadObject(obj:HTMLDivElement, i:number){
        this.subMenu_containers[i].appendChild(obj);
    }
}