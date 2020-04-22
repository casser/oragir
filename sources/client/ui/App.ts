import { Api, Credentials, JourneyInit, Journey, Member } from "../api/Api";




export class App {
    api: Api;
    loginDialog: LoginDialog;
    mainView: MainView;

    constructor(api: Api) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.api = api;
        this.loginDialog = new LoginDialog();
        this.loginDialog.onLogin = this.login;
        this.mainView = new MainView();
        this.mainView.onLogout = this.logout;
        this.init();
    }
    async init(){
        if (this.api.token) {
            const user = await this.api.me();
            this.mainView.setUser(user);
            this.mainView.show();
            this.loginDialog.hide();
        } else {
            this.mainView.hide();
            this.loginDialog.show();
        }
    }

    async logout() {
        await this.api.logout();
        this.loginDialog.show();
        this.mainView.hide();
    }
    async login(credentals: Credentials) {
        console.info(credentals);
        let user = await this.api.login(credentals);
        console.info(user);
        this.loginDialog.hide();
        this.mainView.setUser(user);
        this.mainView.show();
    }
}

class MainView {
    element: HTMLElement;
    userNameDiv:HTMLDivElement;
    userRoleDiv:HTMLDivElement;
    logoutButton:HTMLButtonElement;
    menu:Menu;

    onLogout: () => void;
    constructor() {
        this.element = document.getElementById('main') as HTMLElement;
        //this.element.innerHTML="<h1>main View</h1>";
        this.userNameDiv = document.getElementById('userNameDiv') as HTMLDivElement;
        this.userRoleDiv = document.getElementById('userRoleDiv') as HTMLDivElement;
        this.logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;
        this.menu = new Menu(this.element, 0 );
        this.logoutButton.addEventListener('click', () => {
            this.onLogout();
        })
    }

    setUser(user) {
        this.userNameDiv.innerText = user.name;
        this.userRoleDiv.innerText = user.roles.join(',');
    }

    hide() {
        this.element.style.display = 'none';
    }
    show() {
        this.element.style.display = "";
    }
}
//
class Menu{
    parent_container: HTMLElement;
    active_index: number;
    menu_block: HTMLDivElement;
    menu_title_blocks: Array<HTMLAnchorElement>;
    ancorelement: HTMLAnchorElement;
   
    menu_titles: Array<string>;
    menu_containers: Array<HTMLDivElement>=[];
    i:number;
    //journey_init: JourneyInit;
    //
    activeClass:string;
    passiveClass:string;
    menuBlockClass:string;
    contentClass:string;
    //
    constructor(parent_container: HTMLElement, 
               active_index: number
               ) {
                    //
        this.change = this.change.bind(this);
        this.makeMenuArray=this.makeMenuArray.bind(this);
        //
        this.menu_titles =["ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ", 
                            "ՆՇՈՒՄՆԵՐ", 
                            "ՆԿԱՐՆԵՐ", 
                            "ՏԵՍԱՆՅՈՒԹԵՐ", 
                            "ՁԱՅՆԱԳՐՈՒԹՅՈՒՆՆԵՐ", 
                            "ԿԱՐԳԱՎՈՐՈՒՄՆԵՐ"];
        this.parent_container = parent_container;
        this.menu_block = document.createElement("div") as HTMLDivElement;
        this.parent_container.appendChild(this.menu_block);
        this.active_index = active_index;
        //this.menu_title_blocks = [document.createElement("div")];
        this.activeClass = "w3-bar-item w3-button w3-green";
        this.passiveClass = "w3-bar-item w3-button";
        this.contentClass = "w3-container";
        this.menuBlockClass = "w3-bar w3-border w3-light-grey ";
        this.menu_block.setAttribute("class", this.menuBlockClass);
        //
      
        //this.ancorelement = document.createElement("a");
        this.menu_title_blocks=this.makeMenuArray(this.menu_block, this.menu_titles);
        for(let i:number =0; i<this.menu_titles.length; i++){
            console.info(i);
            this.menu_title_blocks[i].setAttribute("id", i.toString())
            //this.menu_title_blocks[i].innerText=this.menu_titles[i];    /////
            this.parent_container.appendChild(this.menu_block);
            this.menu_block.appendChild(this.menu_title_blocks[i])
            this.menu_containers[i] = document.createElement("div");
            this.menu_containers[i].setAttribute("class",this.contentClass); // Content
            this.menu_containers[i].innerHTML=`<h1>${this.menu_titles[i]}</h1>`
            if(this.active_index === i){
                this.menu_title_blocks[i].setAttribute("class", this.activeClass);
                this.parent_container.appendChild(this.menu_containers[i]);            // content
            }
            else{
                this.menu_title_blocks[i].setAttribute("class", this.passiveClass);

            }
            this.menu_containers[i].style.display="none";
        }
        this.parent_container.appendChild(this.menu_containers[this.active_index]);
        this.menu_containers[this.active_index].style.display="block";
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
        for(let i=0; i<this.menu_containers.length; i++){
          this.menu_containers[i].setAttribute("class",this.contentClass)
          if(ind === i){
            this.menu_title_blocks[i].setAttribute("class", this.activeClass);
            this.menu_containers[i].style.display="block";
            this.parent_container.appendChild(this.menu_containers[i]);
            //console.log(this.pageContObj[i]);
          }
          else{
            this.menu_title_blocks[i].setAttribute("class", this.passiveClass);
            this.menu_containers[i].style.display="none";
          }
          
        }
      }
}
//
class newJourneyForm{
    parent_container: HTMLDivElement;
    //mode: string;   // new, edit, display
    form:HTMLFormElement;
    journey_init: JourneyInit; //?
    journey: Journey; 
    dateBeginInput: HTMLInputElement; 
    journeyNameInput: HTMLInputElement; 
    newCountryInput: HTMLInputElement; 
    selectCountryInput: HTMLSelectElement; 
    journeyLeaderInput: HTMLInputElement; 
    selectJourneyLeader: HTMLSelectElement; 
    notesInput: HTMLTextAreaElement; 
    members: Member[]; 
    memberSelect: HTMLSelectElement; 
    newMemberInput: HTMLInputElement; 
    photoCameraSelect: HTMLSelectElement;
    //
    constructor(parent_container: HTMLDivElement) {
        this.makeInput = this.makeInput.bind(this);
        this.parent_container = parent_container as HTMLDivElement;
        this.form = document.createElement("form");
        this.form.setAttribute("class", "w3-container w3-card-4 w3-light-grey");
        this.parent_container.appendChild(this.form);
        this.makeInput(this.form, 
                        "date_from", 
                        "w3-input w3-border", 
                        "date_from", 
                        "Սկիզբ․ ամսաթիվ (տարի-ամիս-օր)");
        this.makeInput(this.form, 
                        "journey_name", 
                        "w3-input w3-border", 
                        "journey_name", 
                        "Ճամփորդության անվանումը");    
        this.makeInput(this.form, 
                        "journey_head", 
                        "w3-input w3-border", 
                        "journey_head", 
                        "Ճամփորդության ղեկավարը");    

    }
    //
    makeInput(container:HTMLFormElement, 
                name:string, 
                cssclass:string, 
                id:string, 
                label:string){
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
     }


}
//
class LoginDialog {

    element: HTMLDialogElement;
    usernameInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    loginButton: HTMLButtonElement;
    onLogin: (credentals: Credentials) => void;
    constructor() {
        this.element = document.getElementById('login') as HTMLDialogElement;
        this.usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
        this.passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
        this.loginButton = document.getElementById('loginButton') as HTMLButtonElement;
        this.loginButton.addEventListener('click', () => {
            this.onLogin({
                username: this.usernameInput.value,
                password: this.passwordInput.value
            })
        })
    }

    show() {
        this.element.open = true;
    }
    hide() {
        this.element.open = false;
    }
}