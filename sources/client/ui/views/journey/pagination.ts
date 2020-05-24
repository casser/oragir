
export class Pagination {
    parentContainer:HTMLElement;
    barContainer:HTMLDivElement;
    prevContainer:HTMLDivElement;
    currentContainer:HTMLDivElement;
    nextContainer:HTMLDivElement;
    btnPrev:HTMLButtonElement;
    btnNext:HTMLButtonElement;
    currentPageNum:number;
    firstItemNum:number;
    lastItemNum:number;
    itemsPerPage:number;
    currentBtnClass:string;
    aData:any[]=[];
    constructor(parent:HTMLElement, correntPage:number, itemsCount:number=10){

        this.goPrev = this.goPrev.bind(this);
        this.goNext = this.goNext.bind(this);
        this.parentContainer = parent;
        this.currentPageNum = correntPage;
        this.itemsPerPage = itemsCount;
        this.barContainer = document.createElement('div');
        this.barContainer.setAttribute("class", "w3-bar");

        this.prevContainer = document.createElement('div');
        this.prevContainer.textContent="«";
        this.prevContainer.setAttribute("class", "w3-button w3-border");

        this.currentContainer = document.createElement('div');
        this.currentContainer.textContent=`${this.currentPageNum.toString()} - ${(this.currentPageNum+this.itemsPerPage).toString()}`;
        this.currentContainer.setAttribute("class", "w3-button  w3-border" );

        this.nextContainer = document.createElement('div');
        this.nextContainer.textContent="»";
        this.nextContainer.setAttribute("class", "w3-button  w3-border");

        this.barContainer.appendChild(this.prevContainer);
        this.barContainer.appendChild(this.currentContainer);
        this.barContainer.appendChild(this.nextContainer);

        this.parentContainer.appendChild(this.barContainer);
        this.prevContainer.onclick=()=>{
            this.goPrev();
        }
        this.nextContainer.onclick=()=>{
            this.goNext();
        }
    }
    goPrev(){
        this.firstItemNum=0;
        this.currentPageNum--;
    }
    goNext(){
        this.firstItemNum=0;
        this.currentPageNum++;
    }
    
}