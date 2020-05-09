import { Api, Credentials} from "../api/Api";
import {Menu} from "../api/Menu";

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
        this.menu = new Menu(this.element, 0);
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