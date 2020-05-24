import { Api, Credentials} from "../api/Api";
import {Menu} from "./views/Menu";
import {JourneyPage} from "./views/journey/JourneyPage";
import {UserPage} from "./views/user/userPage";
import {SettingPage} from "./views/setting/settingPage";
// main content 
export interface MainPageContent{
    journeys:JourneyPage,
    users:UserPage,
    settings:SettingPage,
}

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
    elementHeader:HTMLElement;
    elementBody:HTMLElement;
    userNameDiv:HTMLDivElement;
    userRoleDiv:HTMLDivElement;
    logoutButton:HTMLButtonElement;
    menu:Menu;
    journeys:JourneyPage;
    users:UserPage;
    settings:SettingPage;
    mainContentObj:MainPageContent;
    onLogout: () => void;
    constructor() {
        this.element = document.getElementById('main') as HTMLElement;
        this.elementHeader = document.createElement('div') as HTMLElement;
        this.elementBody = document.createElement('div') as HTMLElement;
        this.element.appendChild(this.elementHeader);
        this.element.appendChild(this.elementBody);
        //this.element.innerHTML="<h1>main View</h1>";
        this.userNameDiv = document.getElementById('userNameDiv') as HTMLDivElement;
        this.userRoleDiv = document.getElementById('userRoleDiv') as HTMLDivElement;
        this.logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;

        this.journeys = new JourneyPage(this.elementBody) as JourneyPage;
        this.users = new UserPage(this.elementBody) as UserPage;
        this.settings = new SettingPage(this.elementBody) as UserPage;
        this.journeys.hide();
        this.users.hide();
        this.settings.hide()
        this.mainContentObj = {
            journeys:this.journeys,
            users:this.users,
            settings:this.settings,
        };
        //
        this.menu = new Menu(this.elementHeader, "ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ", this.mainContentObj);
        this.logoutButton.addEventListener('click', () => {
            this.onLogout();
        });

    }
    //
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