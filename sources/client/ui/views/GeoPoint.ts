import {Geopoint} from "../../api/Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle} from "../components/Inputs";

interface GeoAttributes {
    inputOption:string, // 3: Degrees Minutes Seconds 
    rowHeadClass:string,
    row_class:string,
    cell_class:string,
    cell_1_class:string,
    cell_2_class:string;
    cell_3_class:string;
    tbl_class:string;
}
// ****************************
export class geoPointForm {
    container:HTMLElement;
    attributes:GeoAttributes;

    aNS:string[];
    aEW:string[];
    NS:string;
    EW:string;
    latNS:string;
    longEW:string;
    geoPoint:Geopoint;
    //
    degreeInputValueLat:number;
    minuteInputValueLat:number;
    secondInputValueLat:number;
    latDecimal:number;
    degreeInputValueLong:number;
    minuteInputValueLong:number;
    secondInputValueLong:number;
    longDecimal:number;
    // new
    subtitleGPS:subTitle;

    Table_DMS:HTMLTableElement; 
    Row_Lat:HTMLTableRowElement;
    Row_Long:HTMLTableRowElement;
    // Latitude Cells DMS
    Cell_Lat_Title:HTMLTableCellElement; // for Title: ՀՈՐԻԶՈՆԱԿԱՆ | LATITUDE
    Cell_Lat_NS:HTMLTableCellElement; // for SELECT "N", "S"
    Cell_Lat_D:HTMLTableCellElement; // for  Degrees Input
    Cell_Lat_M:HTMLTableCellElement; // for  Minutes Input
    Cell_Lat_S:HTMLTableDataCellElement; // for  Secunds Input
    Cell_Lat_Converted:HTMLTableCellElement; // for  Converted result: decimal +degree or -degree
    // Longitude Cells DMS
    Cell_Long_Title:HTMLTableCellElement; // for Title: ՄԻՋՕՐԵԱԿԱՆ | LONGITUDE
    Cell_Long_EW:HTMLTableCellElement; // for SELECT "E", "W"
    Cell_Long_D:HTMLTableCellElement; // for  Degrees Input
    Cell_Long_M:HTMLTableCellElement; // for  Minutes Input
    Cell_Long_S:HTMLTableCellElement; // for  Secunds Input
    Cell_Long_Converted:HTMLTableCellElement; // for  Converted result: decimal +degree or -degree
    // inputs
    Input_D_Lat:HTMLInputElement;
    Input_M_Lat:HTMLInputElement;
    Input_S_Lat:HTMLInputElement;
    Input_D_Long:HTMLInputElement;
    Input_M_Long:HTMLInputElement;
    Input_S_Long:HTMLInputElement;
    Input_Converted_Lat:HTMLInputElement;
    Input_Converted_Long:HTMLInputElement;


    cssDclass:string;
    cssSelect_NS:string;  // Small dropdowns E W and N S
    selectElementNS:HTMLSelectElement;
    selectElementEW:HTMLSelectElement;
    optionElementsNS:HTMLOptionElement[]=[];
    optionElementsEW:HTMLOptionElement[]=[];

    Deg:HTMLSpanElement;
    Min:HTMLSpanElement;
    Sec:HTMLSpanElement;

    Deg1:HTMLSpanElement;
    Min1:HTMLSpanElement;
    Sec1:HTMLSpanElement;


    cssDMSinput:string;

    constructor(Container:HTMLElement) {
      this.container = Container;
      this.getValue = this.getValue.bind(this);
      this.convertToDecimal = this.convertToDecimal.bind(this);
      this.getGeoPoint = this.getGeoPoint.bind(this);
      this.convertToDecimalDegrees = this.convertToDecimalDegrees.bind(this);
      this.getAllValues = this.getAllValues.bind(this);
      //this.attributes = Attributes;
      this.aNS = ["N", "S"];
      this.aEW = ["E", "W"];
      this.latNS = "N";
      this.longEW = "E";
      this.geoPoint = {
        lat: 0.00,
        lon: 0.00
      }
      //
      this.Deg = document.createElement("span") as HTMLSpanElement;
      this.Deg.innerHTML="Deg.";
      this.Min = document.createElement("span") as HTMLSpanElement;
      this.Min.innerHTML="Min.";
      this.Sec = document.createElement("span") as HTMLSpanElement;
      this.Sec.innerHTML="Sec.";
      this.Deg1 = document.createElement("span") as HTMLSpanElement;
      this.Deg1.innerHTML="Deg.";
      this.Min1 = document.createElement("span") as HTMLSpanElement;
      this.Min1.innerHTML="Min.";
      this.Sec1 = document.createElement("span") as HTMLSpanElement;
      this.Sec1.innerHTML="Sec.";
      this.cssDMSinput = "w3-input w3-border msInput";
      //
      this.cssSelect_NS="w3-select w3-green";
      this.selectElementNS = document.createElement("select") as HTMLSelectElement; // Latitude
      this.selectElementNS.setAttribute("class", this.cssSelect_NS);
      for(let i:number = 0; i<this.aNS.length;i++){
        this.optionElementsNS[i]=document.createElement("option");
        this.optionElementsNS[i].value = this.aNS[i];
        this.optionElementsNS[i].innerText = this.aNS[i];
        this.selectElementNS.appendChild(this.optionElementsNS[i]);
      }
      //
      this.selectElementEW = document.createElement("select") as HTMLSelectElement; // Latitude
      this.selectElementEW.setAttribute("class", this.cssSelect_NS);
      for(let i:number = 0; i<this.aEW.length;i++){
        this.optionElementsEW[i]=document.createElement("option");
        this.optionElementsEW[i].value = this.aEW[i];
        this.optionElementsEW[i].innerText = this.aEW[i];
        this.selectElementEW.appendChild(this.optionElementsEW[i]);
      }
      // Latitude Inputs
      this.degreeInputValueLat = 0;
      this.minuteInputValueLat = 0;
      this.secondInputValueLat = 0;
      this.latDecimal = 0;   // Latitude converted to decimal degrees
      // Longitude Inputs
      this.degreeInputValueLong = 0;
      this.minuteInputValueLong = 0;
      this.secondInputValueLong = 0;
      this.longDecimal = 0.0;     // Longitude converted to decimal degrees
      // NORTH SOUTH
      // default: = N
      this.NS = "N";
      // EAST/WEST
      // default = E
      this.EW = "E";
      this.subtitleGPS = new subTitle(this.container,
          "ԱՇԽԱՐՀԱԳՐԱԿԱՆ ԿՈՈՐԴԻՆԱՏՆԵՐ (GPS)",
          "w3-text-green w3-border-bottom w3-border-green submenu_active",
           "subtitleGPS_id"
          )
      // table_DMS  // degrees, minutes, seconds
      this.Table_DMS = document.createElement("table") as HTMLTableElement;
      // Latitude Row
      this.Row_Lat =  document.createElement("tr") as HTMLTableRowElement;
      // Latitude Cells DMS
      this.Cell_Lat_Title = document.createElement("td") as HTMLTableCellElement // for title
      this.Cell_Lat_Title.innerHTML = `<h5 class="w3-text-green">Հորիզոնական</h5>`;
      this.Cell_Lat_NS = document.createElement("td") as HTMLTableCellElement; // for SELECT "N", "S"
      this.Cell_Lat_NS.setAttribute("class", "NS_cell");
      this.Cell_Lat_D = document.createElement("td") as HTMLTableCellElement; // for  Degrees Input
      this.Cell_Lat_D.setAttribute("class", "DMS_cell");
      this.Cell_Lat_M = document.createElement("td") as HTMLTableCellElement; // for  Minutes Input
      this.Cell_Lat_M.setAttribute("class", "DMS_cell");
      this.Cell_Lat_S = document.createElement("td") as HTMLTableCellElement; // for  Secunds Input
      this.Cell_Lat_S.setAttribute("class", "DMS_cell");
      this.Cell_Lat_Converted =  document.createElement("td") as HTMLTableCellElement
      this.Row_Lat.appendChild(this.Cell_Lat_Title);
      this.Row_Lat.appendChild(this.Cell_Lat_NS);
      this.Row_Lat.appendChild(this.Cell_Lat_D);
      this.Row_Lat.appendChild(this.Cell_Lat_M);
      this.Row_Lat.appendChild(this.Cell_Lat_S);
      this.Row_Lat.appendChild(this.Cell_Lat_Converted);
      // Latitude Inputs //******************************************************** */
      // degrees
      this.Input_D_Lat = document.createElement("input") as HTMLInputElement;
      this.Input_D_Lat.setAttribute("type", "text");
      this.Input_D_Lat.setAttribute("placeholder", "Աստիճան");
      this.Input_D_Lat.setAttribute("class", this.cssDMSinput);
      // Minutes
      this.Input_M_Lat = document.createElement("input") as HTMLInputElement;
      this.Input_M_Lat.setAttribute("type", "text");
      this.Input_M_Lat.setAttribute("placeholder", "Րոպե");
      this.Input_M_Lat.setAttribute("class", this.cssDMSinput);
      // Seconds
      this.Input_S_Lat = document.createElement("input") as HTMLInputElement;
      this.Input_S_Lat.setAttribute("type", "text");
      this.Input_S_Lat.setAttribute("placeholder", "Վյրկյան");
      this.Input_S_Lat.setAttribute("class", this.cssDMSinput);
      // Converted Latitude
      this.Input_Converted_Lat = document.createElement("input") as HTMLInputElement;
      this.Input_Converted_Lat.setAttribute("type", "text");
      this.Input_Converted_Lat.setAttribute("class", this.cssDMSinput);
      //
      this.Cell_Lat_NS.appendChild(this.selectElementNS);
      this.Cell_Lat_D.appendChild(this.Input_D_Lat);
      this.Cell_Lat_D.appendChild(this.Deg);
      this.Cell_Lat_M.appendChild(this.Input_M_Lat);
      this.Cell_Lat_M.appendChild(this.Min);
      this.Cell_Lat_S.appendChild(this.Input_S_Lat);
      this.Cell_Lat_S.appendChild(this.Sec);

      // Longitude Inputs //********************************************************* */
      this.Row_Long = document.createElement("tr") as HTMLTableRowElement;  // row for Longitude inputs
      // Longitude Cells DMS
      this.Cell_Long_Title = document.createElement("td") as HTMLTableCellElement // for title
      this.Cell_Long_Title.innerHTML = `<h5 class="w3-text-green">Միջօրեական</h5>`;
      this.Cell_Long_EW = document.createElement("td") as HTMLTableCellElement; // for SELECT "E", "W"
      this.Cell_Long_D = document.createElement("td") as HTMLTableCellElement; // for  Degrees Input
      this.Cell_Long_M = document.createElement("td") as HTMLTableCellElement; // for  Minutes Input
      this.Cell_Long_S = document.createElement("td") as HTMLTableCellElement; // for  Secunds Input
      this.Cell_Long_Converted =  document.createElement("td") as HTMLTableCellElement
      this.Row_Long.appendChild(this.Cell_Long_Title);
      this.Row_Long.appendChild(this.Cell_Long_EW);
      this.Row_Long.appendChild(this.Cell_Long_D);
      this.Row_Long.appendChild(this.Cell_Long_M);
      this.Row_Long.appendChild(this.Cell_Long_S);
      this.Row_Long.appendChild(this.Cell_Long_Converted);
      // degrees
      this.Input_D_Long = document.createElement("input") as HTMLInputElement;
      this.Input_D_Long.setAttribute("type", "text");
      this.Input_D_Long.setAttribute("placeholder", "Degree");
      this.Input_D_Long.setAttribute("class", this.cssDMSinput);
      // Minutes
      this.Input_M_Long = document.createElement("input") as HTMLInputElement;
      this.Input_M_Long.setAttribute("type", "text");
      this.Input_M_Long.setAttribute("placeholder", "Min");
      this.Input_M_Long.setAttribute("class", this.cssDMSinput);
      // Seconds
      this.Input_S_Long = document.createElement("input") as HTMLInputElement;
      this.Input_S_Long.setAttribute("type", "text");
      this.Input_S_Long.setAttribute("placeholder", "Sec");
      this.Input_S_Long.setAttribute("class", this.cssDMSinput);
      // Converted Latitude
      this.Input_Converted_Long = document.createElement("input") as HTMLInputElement;
      this.Input_Converted_Long.setAttribute("type", "text");
      this.Input_Converted_Long.setAttribute("class", this.cssDclass);
      //
      this.Cell_Long_EW.appendChild(this.selectElementEW);
      this.Cell_Long_D.appendChild(this.Input_D_Long);
      this.Cell_Long_D.appendChild(this.Deg1);
      this.Cell_Long_M.appendChild(this.Input_M_Long);
      this.Cell_Long_M.appendChild(this.Min1);
      this.Cell_Long_S.appendChild(this.Input_S_Long);
      this.Cell_Long_S.appendChild(this.Sec1);

      this.Table_DMS.appendChild(this.Row_Lat);
      this.Table_DMS.appendChild(this.Row_Long);
      this.container.appendChild(this.Table_DMS);
    } // End of constuctor
  
    //
    convertToDecimal() {
        // DD = degrs + (mins/60) + (secs/3600);
        this.degreeInputValueLat = Number(this.Input_D_Lat.value);
        this.degreeInputValueLong = Number(this.Input_D_Long.value);
        this.minuteInputValueLat = Number(this.Input_M_Lat.value);
        this.minuteInputValueLong = Number(this.Input_M_Long.value);
        this.secondInputValueLat = Number(this.Input_S_Lat.value);
        this.secondInputValueLong = Number(this.Input_S_Long.value);
  
        this.latDecimal = Number(this.degreeInputValueLat) + Number(this.minuteInputValueLat) / 60 + Number(this.secondInputValueLat) / 3600;
        this.longDecimal = Number(this.degreeInputValueLong) + Number(this.minuteInputValueLong) / 60 + Number(this.secondInputValueLong) / 3600;
      
      if (this.degreeInputValueLong >= 180) {
        alert("Attention! Longitude degree must be less than 180 degrees");
        return;
      }
      if (this.degreeInputValueLat >= 90) {
        alert("Attention! Latitude degree must be less than 90 degrees");
        return;
      }
      if (this.minuteInputValueLong >= 60 || this.minuteInputValueLat >= 60) {
        alert("Attention! Any Minute value must be less than 60 degrees");
        return;
      }
      if (this.secondInputValueLat >= 60 || this.secondInputValueLong >= 60) {
        alert("Attention! Any Second value must be less than 60 degrees");
        return;
      }
      console.log(this.NS);
      console.log(this.EW);
      if (this.NS == "S") {
        this.latDecimal = -this.latDecimal;
      }
      if (this.EW == "W") {
        this.longDecimal = -this.longDecimal;
      }
  
      this.Input_Converted_Lat.value = this.latDecimal.toString();
      this.Input_Converted_Lat.value = this.longDecimal.toString();
      this.geoPoint = {
        lat: this.latDecimal,
        lon: this.longDecimal
      }
    }
    //
    getGeoPoint() {
      this.convertToDecimal();
      return this.geoPoint;
    }
    //
    convertToDecimalDegrees(LatLong:string, degrs:number, mins:number = 0, secs:number = 0) {
      /*
  Decimal Degrees = degrees + (minutes/60) + (seconds/3600)
  DD = d + (min/60) + (sec/3600)
      */
      let DD:number = 0;
      if (LatLong == "N" || LatLong == "S") {
  
        if (Math.abs(degrs) < 90) {
          DD = degrs + (mins / 60) + (secs / 3600);
        }
        else {
          alert("Wrong Latitude degree value!");
        }
        //
        if (LatLong == "S") {
          DD = -DD;
        }
      }
      else if (LatLong == "E" || LatLong == "W") {
        if (Math.abs(degrs) < 180) {
          DD = degrs + (mins / 60) + (secs / 3600);
        }
        else {
          alert("Wrong Longitude degree value!");
        }
        if (LatLong == "W") {
          DD = -DD;
        }
      }
      return DD;
    }
    getAllValues() {
      console.log("geopoint get all values called");
      this.convertToDecimal();
      return this.geoPoint;
    }
    getValue(){
      this.getAllValues();
    }
  }
  // END of ******** Class geoPointForm **************************************