export class UserPage{
    parentContainer:HTMLElement;
    mainContainer:HTMLElement;
    tileContainer:HTMLDivElement;
    contentContainer:HTMLDivElement;
    footerContainer:HTMLDivElement;
    titleMenu:String;

    constructor(parent:HTMLElement){
        this.getTitle = this.getTitle.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.titleMenu = "ՕԳՏԱՏԵՐԵՐ";
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        this.tileContainer = document.createElement('div');
        this.tileContainer.setAttribute("class", "w3-container  menublock");
        this.parentContainer.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.tileContainer);
        this.tileContainer.innerHTML = "Օգտատերեր title";
        //this.mainContainer.innerHTML = "Օգտատերեր Body";
    }
    getTitle(){
        return this.titleMenu;
    }
    show(){
        this.mainContainer.style.display="block";
    }
    hide(){
        this.mainContainer.style.display="none";
    }
}