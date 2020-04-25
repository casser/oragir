import { Api, Credentials} from "../api/Api";
import {newJourneyForm} from "../api/Journey";

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
    info_line_block: HTMLDivElement;
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
    // forms
    jform:newJourneyForm;
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
        this.info_line_block = document.createElement("div") as HTMLDivElement;
        this.info_line_block.setAttribute("class", "w3-panel w3-pale-green");
        this.info_line_block.innerText="AAA";
        this.parent_container.appendChild(this.menu_block);
        this.active_index = active_index;
        //this.menu_title_blocks = [document.createElement("div")];
        this.activeClass = "w3-bar-item w3-button w3-green";
        this.passiveClass = "w3-bar-item w3-button";
        this.contentClass = "w3-container";
        this.menuBlockClass = "w3-bar w3-border w3-light-grey w3-card-2 menublock";
        this.menu_block.setAttribute("class", this.menuBlockClass);
        //
        
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
            if(this.menu_titles[i]=="ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ"){
                this.jform=new newJourneyForm(this.menu_containers[i]);
            }
            else{
                this.menu_containers[i].innerHTML=`<h1>${this.menu_titles[i]}</h1>`
            }
            
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