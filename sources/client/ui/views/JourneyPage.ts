
import {Menu}  from "./Menu";
import {JourneyList, JourneyListTitle} from "./JourneyList";  // class
import {Journey} from "./JourneyList";  // interface
import {convertJsonToJourney} from "./JourneyList";  //  function
import {jListArr} from "./JourneyList";  // Json Array
//
//
export class JourneyPage{
    parentContainer:HTMLElement;
    mainContainer:HTMLElement;
    headerContainer:HTMLDivElement;
    tileContainer:HTMLDivElement;
    listTitle:JourneyListTitle;
    contentContainer:HTMLDivElement;
    footerContainer:HTMLDivElement;
    menu:Menu;
    journeyList:JourneyList;

    constructor(parent:HTMLElement){
        this.parentContainer = parent;
        this.mainContainer = document.createElement('div');
        this.headerContainer = document.createElement('div');
        this.tileContainer = document.createElement('div');
        this.tileContainer.setAttribute("class", "w3-container  menublock");
        //
        this.listTitle=new JourneyListTitle(this.tileContainer);
        //this.tileContainer.innerHTML="title";
        this.parentContainer.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.headerContainer)
        this.menu = new Menu(this.headerContainer,0) as Menu;
        this.contentContainer = document.createElement('div');
        this.contentContainer.setAttribute("class", "w3-container w3-light-gray w3-card-2 menublock");
        
        //this.contentContainer.innerHTML="Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>Content Container<br>";
        this.footerContainer = document.createElement('div');
        this.footerContainer.setAttribute("class", "w3-bar w3-light-gray w3-card-2 menublock");
        this.footerContainer.innerHTML="Footer RAA";

        this.mainContainer.appendChild(this.tileContainer);
        this.mainContainer.appendChild(this.contentContainer);
        this.mainContainer.appendChild(this.footerContainer);



        console.info("JourneyPage class Called!");
        console.info(jListArr);
        let aa:Journey[] = convertJsonToJourney(jListArr);
        console.info(aa);
        this.journeyList=new JourneyList(this.contentContainer, aa);




    }
}