import {MainPageContent} from "../App";
//
export class Menu{
    parent_container: HTMLElement;
    active_title: string;
    menu_block: HTMLDivElement;
    menu_title_blocks: Array<HTMLAnchorElement>;
    ancorelement: HTMLAnchorElement;
   
    menu_titles: Array<string> =[];
    keys: Array<string> =[];
    i:number;
    //
    activeClass:string;
    passiveClass:string;
    menuBlockClass:string;
    contentClass:string;

    mainContent:MainPageContent;
    contentContainer:HTMLElement;
    constructor(parent_container: HTMLElement, 
               active_title: string,
               pages:MainPageContent
               ) {
                    //
        this.change = this.change.bind(this);
        this.makeMenuArray = this.makeMenuArray.bind(this);
        //
        this.mainContent = pages;
        for (let [key, value] of Object.entries(this.mainContent)) {
          console.log(key + ':' + value);
          this.menu_titles.push(value.getTitle());
          this.keys.push(key.toString())
        }
        console.log(this.menu_titles);
        console.log(this.keys);
        for (let i:number = 0; i<this.keys.length; i++){
          console.info(this.mainContent[this.keys[i]])
        }
        
       
        this.parent_container = parent_container;
        this.menu_block = document.createElement("div") as HTMLDivElement;

        this.parent_container.appendChild(this.menu_block);
        this.active_title = active_title;
        this.activeClass = "w3-bar-item w3-button w3-green";
        this.passiveClass = "w3-bar-item w3-button";
        this.contentClass = "w3-container";
        this.menuBlockClass = "w3-bar w3-border w3-light-grey w3-card-2 menublock";
        this.menu_block.setAttribute("class", this.menuBlockClass);

        this.menu_title_blocks=this.makeMenuArray(this.menu_block, this.menu_titles);

        for(let i:number =0; i<this.menu_titles.length; i++){
            console.info(i);
            this.menu_title_blocks[i].setAttribute("id", i.toString())
            this.parent_container.appendChild(this.menu_block);
            this.menu_block.appendChild(this.menu_title_blocks[i])
            
            
            if(this.active_title === this.menu_titles[i]){
                this.menu_title_blocks[i].setAttribute("class", this.activeClass);
                this.mainContent[this.keys[i]].show()
            }
            else{
                this.menu_title_blocks[i].setAttribute("class", this.passiveClass);
                this.mainContent[this.keys[i]].hide()
            }
        }
        
        for(let i=0; i<this.menu_title_blocks.length; i++){
            //this.menuItemDivs[i].onclick=this.change(i);
            this.menu_title_blocks[i].onclick=()=>{
              console.log(i);
              this.change(i);
            }
        }
    }
    //
    makeMenuArray(parent:HTMLDivElement, atitles:string[]){
        //let aa: Array<HTMLAnchorElement>;
        let aa: HTMLAnchorElement[] = [];
        let item:HTMLAnchorElement;
        for(let i=0; i<atitles.length; i++){
            item = document.createElement("a");
            parent.appendChild(item);
            item.innerText = atitles[i];
            aa.push(item);
            item=null;
        }
        return aa;
    }
    //
    change(ind:number){
        for(let i=0; i<this.menu_titles.length; i++){
          //this.menu_containers[i].setAttribute("class",this.contentClass)
          if(ind === i){
            this.menu_title_blocks[i].setAttribute("class", this.activeClass);
            this.mainContent[this.keys[i]].show();
          }
          else{
            this.menu_title_blocks[i].setAttribute("class", this.passiveClass);
            this.mainContent[this.keys[i]].hide();
          }
          
        }
    }
}