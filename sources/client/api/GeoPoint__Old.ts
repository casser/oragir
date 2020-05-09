import {Geopoint} from "./Api";
import {selectNewBlock, selectBlock, inputBlock, subTitle} from "./Inputs";

interface GeoAttributes {
    inputOption:number, // 1 
    rowHeadClass:string,
    row_class:string,
    cell_class:string,
    cell_1_class:string,
    cell_2_class:string;
    cell_3_class:string;
    tbl_class:string;
}
// ****************************
class geoPointForm {
    container:HTMLElement;
    attributes:GeoAttributes;
    inputOption:number;
    rowHeadClass:string;
    rowClass:string;
    cellClass:string;
    cell_1_class:string;
    cell_2_class:string;
    cell_3_class:string;
    tblClass:string;

    row_head:HTMLElement;
    aCell_1_head:HTMLElement;
    aCell_2_head:HTMLElement;
    aCell_3_head:HTMLElement;
    convertBTN:HTMLElement;
    aCell_1:HTMLElement;
    aCell_2:HTMLElement;
    aCell_3:HTMLElement;
    sel:HTMLElement;
    formatOptions:HTMLOptionElement[]=[];


    inputOptions:string[] = [];
    aNS:string[];
    aEW:string[];
    NS:string;
    EW:string;
    latNS:string;
    longEW:string;
    geoPoint:Geopoint;

    tbl:HTMLElement;
    row:HTMLElement;

    aDegreeInputDiv:HTMLDivElement[];
    degrInputRowLat:HTMLDivElement;
    degrInputRowLong:HTMLDivElement;
    degreeInputValueLat:number;
    minuteInputValueLat:number;
    secondInputValueLat:number;
    latDecimal:number;
    degreeInputValueLong:number;
    minuteInputValueLong:number;
    secondInputValueLong:number;
    longDecimal:number;

    constructor(Container:HTMLElement, Attributes:GeoAttributes) {
      this.container = Container;
      this.attributes = Attributes;
      this.inputOptions = ["Degrees", "Degrees Minutes", "Degrees Minutes Seconds"];
      this.aNS = ["N", "S"];
      this.aEW = ["E", "W"];
      this.latNS = "N";
      this.longEW = "E";
      this.geoPoint = {
        lat: 0.00,
        lon: 0.00
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
      this.longDecimal = 0;     // Longitude converted to decimal degrees
  
      this.changeFormat = this.changeFormat.bind(this);
      this.getCoord = this.getCoord.bind(this);
      this.convertToDecimalDegrees = this.convertToDecimalDegrees.bind(this);
      this.convertToDecimal = this.convertToDecimal.bind(this);
      this.getAllValues = this.getAllValues.bind(this)
  
      while (this.container.hasChildNodes()) {
        this.container.removeChild(this.container.lastChild);
      }
      if (this.container.hasAttribute("class")) {
        this.container.removeAttribute("class");
      }
      // NORTH SOUTH
      // default: = N
      this.NS = "N";
  
      // EAST/WEST
      // default = E
      this.EW = "E";
  
      // input option
        this.inputOption = this.attributes.inputOption || 1;
      // classes
      // Header Row Class
        this.rowHeadClass = this.attributes.rowHeadClass || "div_row_head";
      // Row class
        this.rowClass = this.attributes.row_class || "div_row";
      // cell class
        this.cellClass = this.attributes.cell_class || "div_cell"
      //
        this.cell_1_class = this.attributes.cell_1_class || "div_w_300"
      //
        this.cell_2_class = this.attributes.cell_2_class || "div_w_400";
      //
        this.cell_3_class = this.attributes.cell_3_class || "div_w_300";
      //
        this.tblClass = this.attributes.tbl_class || "div_table";
      //
      this.tbl = document.createElement("div");
      this.tbl.setAttribute("class", this.tblClass);
      // making data row
      this.row_head = document.createElement("div");
      this.row_head.setAttribute("class", this.rowHeadClass);
      //
      this.row = document.createElement("div");
      this.row.setAttribute("class", this.rowClass);
      // Column 1 Head
      this.aCell_1_head = document.createElement("div");
      this.aCell_1_head.setAttribute("class", `${this.cellClass} ${this.cell_1_class}`);
      this.aCell_1_head.innerHTML = "Location";
      // Column 2 head
      this.aCell_2_head = document.createElement("div");
      this.aCell_2_head.setAttribute("class", `${this.cellClass} ${this.cell_2_class}`);
      this.aCell_2_head.innerHTML = "Selected Lat/Long input format";
      // Column 3 head
      this.aCell_3_head = document.createElement("div");
      this.aCell_3_head.setAttribute("class", `${this.cellClass} ${this.cell_3_class}`);
  
      this.convertBTN = document.createElement("INPUT");
      this.convertBTN.setAttribute("type", "BUTTON");
      this.convertBTN.setAttribute("value", "Convert to Degrees (decimal)");
      this.aCell_3_head.appendChild(this.convertBTN);
  
      this.convertBTN.onclick = () => {
        console.info("convert clicked");
        this.convertToDecimal();
      }
      //
      // Column 1
      this.aCell_1 = document.createElement("div");
      this.aCell_1.setAttribute("class", `${this.cellClass}`);
  
      // Column 2
      this.aCell_2 = document.createElement("div");
      this.aCell_2.setAttribute("class", `${this.cellClass}`);
  
      // Column 3
      this.aCell_3 = document.createElement("div");
      this.aCell_3.setAttribute("class", `${this.cellClass}`);
      //
      this.row_head.appendChild(this.aCell_1_head);
      this.row_head.appendChild(this.aCell_2_head);
      this.row_head.appendChild(this.aCell_3_head);
      //
      this.row.appendChild(this.aCell_1);
      this.row.appendChild(this.aCell_2);
      this.row.appendChild(this.aCell_3);
      // 
      this.tbl.appendChild(this.row_head);
      this.tbl.appendChild(this.row);
  
      // making dropdown
      this.sel = document.createElement("SELECT");
      this.formatOptions = [];
      for (let i = 0; i < this.inputOptions.length; i++) {
        this.formatOptions[i] = document.createElement("option");
        this.formatOptions[i].value = i.toString();
        this.formatOptions[i].text = this.inputOptions[i];
        if (i === this.inputOption) {
          this.formatOptions[i].setAttribute("selected", true)
        }
        this.sel.appendChild(this.formatOptions[i]);
      }
      this.aCell_1.appendChild(this.sel);
      this.sel.onchange = () => {
        this.inputOption = this.sel.value;
        console.info(`inside onchange input option = ${this.inputOption}`);
        this.changeFormat();
      }
      // making number format blocks: 2-nd Column
      // decomal number input block
      this.aDegreeInputDiv = [];
      // 1.
      // degree
      this.aDegreeInputDiv[0] = document.createElement("div");
      this.aDegreeInputDiv[0].setAttribute("class", "div_table_geo_lat_long");
      this.degrInputRowLat = document.createElement("div");
      this.degrInputRowLat.setAttribute("class", "div_row");
      this.degrInputRowLong = document.createElement("div");
      this.degrInputRowLong.setAttribute("class", "div_row");
      // cells for input forms : Lat/Long input form labels for column 1
      this.latCell_1 = document.createElement("div");
      this.latCell_1.setAttribute("class", "div_cell_geo_lat_long  divCell_Lat");
      this.latCell_1.setAttribute("id", "latCell_1");
      //this.latCell_1.innerHTML = `<select> id = "D_LAT"><option value="N">N</option><option value="S">S</option></select> Lat.`;
      this.longCell_1 = document.createElement("div");
      this.longCell_1.setAttribute("class", "div_cell_geo_lat_long   divCell_Long");
      this.longCell_1.setAttribute("id", "longCell_1");
      // SELECT  NS - D
      this.sel_NS_D = document.createElement("SELECT");
      this.aNSOptions_D = [];
      for (let i = 0; i < this.aNS.length; i++) {
        this.aNSOptions_D[i] = document.createElement("option");
        this.aNSOptions_D[i].value = this.aNS[i];
        this.aNSOptions_D[i].text = this.aNS[i];
        this.sel_NS_D.appendChild(this.aNSOptions_D[i]);
      }
      this.latCell_1.appendChild(this.sel_NS_D);
      // NS - D
      this.sel_NS_D.onchange = () => {
        this.NS = this.sel_NS_D.value;
      }
      //
      // SELECT  EW - D
      this.sel_EW_D = document.createElement("select");
      this.aEWOptions_D = [];
      for (let i = 0; i < this.aNS.length; i++) {
        this.aEWOptions_D[i] = document.createElement("option");
        this.aEWOptions_D[i].value = this.aEW[i];
        this.aEWOptions_D[i].text = this.aEW[i];
        this.sel_EW_D.appendChild(this.aEWOptions_D[i]);
      }
      this.longCell_1.appendChild(this.sel_EW_D);
      // EW - D
      this.sel_EW_D.onchange = () => {
        this.EW = this.sel_EW_D.value;
      }
      // Latitude Input Degrees
      this.latCell_3 = document.createElement("div");
      this.latCell_3.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.latInputDegr = document.createElement("INPUT");
      this.latInputDegr.setAttribute("type", "number");
      this.latInputDegr.setAttribute("size", "35");
  
      this.latCell_3.appendChild(this.latInputDegr);
      // Longitude Input degrees
      this.longCell_3 = document.createElement("div");
      this.longCell_3.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.longInputDegr = document.createElement("INPUT");
      this.longInputDegr.setAttribute("type", "number");
      this.longInputDegr.setAttribute("size", "35");
  
      this.longCell_3.appendChild(this.longInputDegr);
      //
      this.aDegreeInputDiv[0].appendChild(this.degrInputRowLat);
      this.aDegreeInputDiv[0].appendChild(this.degrInputRowLong);
  
      this.degrInputRowLat.appendChild(this.latCell_1);
      this.degrInputRowLat.appendChild(this.latCell_3);
  
      this.degrInputRowLong.appendChild(this.longCell_1);
      this.degrInputRowLong.appendChild(this.longCell_3);
  
      // 2.
      // degree, min : DM
      this.aDegreeInputDiv[1] = document.createElement("div");
      this.aDegreeInputDiv[1].setAttribute("class", "div_table_geo_lat_long");
      this.aDegreeInputDiv[1].setAttribute("id", "aDegreeInputDiv_1");   // test
      // rows
      this.degrMinInputRowLat = document.createElement("div");
      this.degrMinInputRowLat.setAttribute("class", "div_row");
      this.degrMinInputRowLong = document.createElement("div");
      this.degrMinInputRowLong.setAttribute("class", "div_row");
      // cells for input forms : Lat/Long input form labels for column 1
      // North South - Latitude Cell
      this.latCell_2_DM = document.createElement("div");
      this.latCell_2_DM.setAttribute("class", "div_cell_geo_lat_long divCell_Lat");
      this.latCell_2_DM.setAttribute("id", "latCell_2_DM"); // test   // OK
      // SELECT  NS - DM
      this.sel_NS_DM = document.createElement("SELECT");
      this.sel_NS_DM.setAttribute("id", "sel_NS_DM");
      this.aNSOptionsDM = [];
      for (let i = 0; i < this.aNS.length; i++) {
        this.aNSOptionsDM[i] = document.createElement("option");
        this.aNSOptionsDM[i].value = this.aNS[i];
        this.aNSOptionsDM[i].text = this.aNS[i];
        this.sel_NS_DM.appendChild(this.aNSOptionsDM[i]);
      }
      this.latCell_2_DM.appendChild(this.sel_NS_DM);  // OK
      // EW - DM
      this.sel_NS_DM.onchange = () => {
        this.NS = this.sel_NS_DM.value;
      }
      // East West - Longitude cell
      this.longCell_2_DM = document.createElement("div");
      this.longCell_2_DM.setAttribute("class", "div_cell_geo_lat_long divCell_Long");
      this.longCell_2_DM.setAttribute("id", "longCell_2_DM"); // test   // 
      // SELECT  EW - DM
      this.sel_EW_DM = document.createElement("SELECT");
      this.sel_EW_DM.setAttribute("id", "sel_EW_DM");
      this.aEWOptionsDM = [];
      for (let i = 0; i < this.aEW.length; i++) {
        this.aEWOptionsDM[i] = document.createElement("option");
        this.aEWOptionsDM[i].value = this.aEW[i];
        this.aEWOptionsDM[i].text = this.aEW[i];
        this.sel_EW_DM.appendChild(this.aEWOptionsDM[i]);
      }
      this.longCell_2_DM.appendChild(this.sel_EW_DM);  // 
      // EW - DM
      this.sel_EW_DM.onchange = () => {
        this.EW = this.sel_EW_DM.value;
      }
      // cells
      // Latitude Input Degrees: DM_d
      this.latCell_DM_d = document.createElement("div");
      this.latCell_DM_d.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.latInput_DM_d = document.createElement("INPUT");
      this.latInput_DM_d.setAttribute("type", "number");
      this.latInput_DM_d.setAttribute("min", "0");
      this.latInput_DM_d.setAttribute("max", "90");
      this.latInput_DM_d.setAttribute("size", "4");
  
      this.latCell_DM_d.appendChild(this.latInput_DM_d);
      // Longitude Input Degrees: DM_d
      this.longCell_DM_d = document.createElement("div");
      this.longCell_DM_d.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.longInput_DM_d = document.createElement("INPUT");
      this.longInput_DM_d.setAttribute("type", "number");
      this.longInput_DM_d.setAttribute("min", "0");
      this.longInput_DM_d.setAttribute("max", "180");
      this.longInput_DM_d.setAttribute("size", "4");
  
      this.longCell_DM_d.appendChild(this.longInput_DM_d);
      // Latitude Input Minutes: DM_m
      this.latCell_DM_m = document.createElement("div");
      this.latCell_DM_m.setAttribute("class", "div_cell_geo_lat_long minSymbol");
      this.latInput_DM_m = document.createElement("INPUT");
      this.latInput_DM_m.setAttribute("type", "number");
      this.latInput_DM_m.setAttribute("min", "0");
      this.latInput_DM_m.setAttribute("max", "60");
      this.latInput_DM_m.setAttribute("class", "div_w_100");
      this.latInput_DM_m.onchange = () => {
        this.minuteInputValueLat = this.latInput_DM_m.value
        console.info(this.minuteInputValueLat);
      }
      this.latCell_DM_m.appendChild(this.latInput_DM_m);
      // Longitude Input Minutes: DM_m
      this.longCell_DM_m = document.createElement("div");
      this.longCell_DM_m.setAttribute("class", "div_cell_geo_lat_long minSymbol");
      this.longInput_DM_m = document.createElement("INPUT");
      this.longInput_DM_m.setAttribute("type", "number");
      this.longInput_DM_m.setAttribute("min", "0");
      this.longInput_DM_m.setAttribute("max", "60");
      this.longInput_DM_m.setAttribute("class", "div_w_100");
      this.longInput_DM_m.onchange = () => {
        this.minuteInputValueLong = this.longInput_DM_m.value;
        console.info(this.minuteInputValueLong);
      }
      this.longCell_DM_m.appendChild(this.longInput_DM_m);
      // addind cells to rows
      //this.degrMinSecInputRowLat.appendChild(this.latCell_2);
      this.degrMinInputRowLat.appendChild(this.latCell_2_DM);
      this.degrMinInputRowLat.appendChild(this.latCell_DM_d);
      this.degrMinInputRowLat.appendChild(this.latCell_DM_m);
  
      this.degrMinInputRowLong.appendChild(this.longCell_2_DM);
      this.degrMinInputRowLong.appendChild(this.longCell_DM_d);
      this.degrMinInputRowLong.appendChild(this.longCell_DM_m);
  
      this.aDegreeInputDiv[1].appendChild(this.degrMinInputRowLat);
      this.aDegreeInputDiv[1].appendChild(this.degrMinInputRowLong);
  
      // 3.
      // degree, min, sec
      this.aDegreeInputDiv[2] = document.createElement("div");
      this.aDegreeInputDiv[2].setAttribute("class", "div_table_geo_lat_long");
      // rows
      this.degrMinSecInputRowLat = document.createElement("div");
      this.degrMinSecInputRowLat.setAttribute("class", "div_row");
      this.degrMinSecInputRowLong = document.createElement("div");
      this.degrMinSecInputRowLong.setAttribute("class", "div_row");
      // cells for input forms : Lat/Long input form labels for column 1
      this.latCell_2_DMS = document.createElement("div");
      this.latCell_2_DMS.setAttribute("class", "div_cell_geo_lat_long  divCell_Lat");
      // SELECT  NS - DMS
      this.sel_NS_DMS = document.createElement("SELECT");
      this.sel_NS_DMS.setAttribute("id", "sel_NS_DMS");
      this.aNSOptionsDMS = [];
      for (let i = 0; i < this.aNS.length; i++) {
        this.aNSOptionsDMS[i] = document.createElement("option");
        this.aNSOptionsDMS[i].value = this.aNS[i];
        this.aNSOptionsDMS[i].text = this.aNS[i];
        this.sel_NS_DMS.appendChild(this.aNSOptionsDMS[i]);
      }
      this.latCell_2_DMS.appendChild(this.sel_NS_DMS);
      // NS - DMS
      this.sel_NS_DMS.onchange = () => {
        this.NS = this.sel_NS_DMS.value;
      }
  
  
      this.longCell_2_DMS = document.createElement("div");
      this.longCell_2_DMS.setAttribute("class", "div_cell_geo_lat_long  divCell_Long");
      // SELECT EW - DMS
      this.sel_EW_DMS = document.createElement("SELECT");
      this.sel_EW_DMS.setAttribute("id", "sel_EW_DMS");
      this.aEWOptionsDMS = [];
      for (let i = 0; i < this.aEW.length; i++) {
        this.aEWOptionsDMS[i] = document.createElement("option");
        this.aEWOptionsDMS[i].value = this.aEW[i];
        this.aEWOptionsDMS[i].text = this.aEW[i];
        this.sel_EW_DMS.appendChild(this.aEWOptionsDMS[i]);
      }
      this.longCell_2_DMS.appendChild(this.sel_EW_DMS);
      // EW - DMS
      this.sel_EW_DMS.onchange = () => {
        this.EW = this.sel_EW_DMS.value;
      }
  
      // cells
      // Latitude Input Degrees: DMS_d
      this.latCell_DMS_d = document.createElement("div");
      this.latCell_DMS_d.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.latInput_DMS_d = document.createElement("INPUT");
      this.latInput_DMS_d.setAttribute("type", "number");
      this.latInput_DMS_d.setAttribute("min", "0");
      this.latInput_DMS_d.setAttribute("max", "90");
      this.latInput_DMS_d.setAttribute("size", "6");
  
      this.latCell_DMS_d.appendChild(this.latInput_DMS_d);
      // Longitude Input Degrees: DMS_d
      this.longCell_DMS_d = document.createElement("div");
      this.longCell_DMS_d.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.longInput_DMS_d = document.createElement("INPUT");
      this.longInput_DMS_d.setAttribute("type", "number");
      this.longInput_DMS_d.setAttribute("min", "0");
      this.longInput_DMS_d.setAttribute("max", "180");
      this.longInput_DMS_d.setAttribute("size", "6");
  
      this.longCell_DMS_d.appendChild(this.longInput_DMS_d);
      // Latitude Input Minutes: DMS_m
      this.latCell_DMS_m = document.createElement("div");
      this.latCell_DMS_m.setAttribute("class", "div_cell_geo_lat_long minSymbol");
      this.latInput_DMS_m = document.createElement("INPUT");
      this.latInput_DMS_m.setAttribute("type", "number");
      this.latInput_DMS_m.setAttribute("min", "0");
      this.latInput_DMS_m.setAttribute("max", "90");
      this.latInput_DMS_m.setAttribute("size", "6");
      this.latInput_DMS_m.onchange = () => {
        this.minuteInputValueLat = this.latInput_DMS_m.value;
        console.info(this.minuteInputValueLat);
      }
      this.latCell_DMS_m.appendChild(this.latInput_DMS_m);
      // Longitude Input Minutes: DMS_m
      this.longCell_DMS_m = document.createElement("div");
      this.longCell_DMS_m.setAttribute("class", "div_cell_geo_lat_long minSymbol");
      this.longInput_DMS_m = document.createElement("INPUT");
      this.longInput_DMS_m.setAttribute("type", "number");
      this.longInput_DMS_m.setAttribute("min", "0");
      this.longInput_DMS_m.setAttribute("max", "60");
      this.longInput_DMS_m.setAttribute("size", "6");
      this.longInput_DMS_m.onchange = () => {
        this.minuteInputValueLong = this.longInput_DMS_m.value;
        console.info(this.minuteInputValueLong);
      }
      this.longCell_DMS_m.appendChild(this.longInput_DMS_m);
      // Latitude Input Seconds: DMS_s
      this.latCell_DMS_s = document.createElement("div");
      this.latCell_DMS_s.setAttribute("class", "div_cell_geo_lat_long secSymbol");
      this.latInput_DMS_s = document.createElement("INPUT");
      this.latInput_DMS_s.setAttribute("type", "number");
      this.latInput_DMS_s.setAttribute("min", "0");
      this.latInput_DMS_s.setAttribute("max", "60");
      this.latInput_DMS_s.setAttribute("size", "6");
      this.latInput_DMS_s.onchange = () => {
        this.secondInputValueLat = this.latInput_DMS_s.value;
        console.info(this.secondInputValueLat);
      }
      this.latCell_DMS_s.appendChild(this.latInput_DMS_s);
      // Longitude Input Seconds: DMS_s
      this.longCell_DMS_s = document.createElement("div");
      this.longCell_DMS_s.setAttribute("class", "div_cell_geo_lat_long secSymbol");
      this.longInput_DMS_s = document.createElement("INPUT");
      this.longInput_DMS_s.setAttribute("type", "number");
      this.longInput_DMS_s.setAttribute("min", "0");
      this.longInput_DMS_s.setAttribute("max", "60");
      this.longInput_DMS_s.setAttribute("size", "6");
      this.longInput_DMS_s.onchange = () => {
        this.secondInputValueLong = this.longInput_DMS_s.value;
        console.info(this.secondInputValueLong);
      }
      this.longCell_DMS_s.appendChild(this.longInput_DMS_s);
      // adding cells to rows
      this.degrMinSecInputRowLat.appendChild(this.latCell_2_DMS);
      this.degrMinSecInputRowLat.appendChild(this.latCell_DMS_d);
      this.degrMinSecInputRowLat.appendChild(this.latCell_DMS_m);
      this.degrMinSecInputRowLat.appendChild(this.latCell_DMS_s);
  
      this.degrMinSecInputRowLong.appendChild(this.longCell_2_DMS);
      this.degrMinSecInputRowLong.appendChild(this.longCell_DMS_d);
      this.degrMinSecInputRowLong.appendChild(this.longCell_DMS_m);
      this.degrMinSecInputRowLong.appendChild(this.longCell_DMS_s);
  
      this.aDegreeInputDiv[2].appendChild(this.degrMinSecInputRowLat);
      this.aDegreeInputDiv[2].appendChild(this.degrMinSecInputRowLong);
      /*
        css classes:  .div_table_geo_lat_long     .div_cell_geo_lat_long    .div_row
      */
  
      // 3-d Column -- control text fields : Read only Lat. & Long. degrees: 3-d Column
      this.aDegreeControltDiv = document.createElement("div");
      this.aDegreeControltDiv.setAttribute("class", "div_table_geo_lat_long");
      this.ControlRowLat = document.createElement("div");
      this.ControlRowLat.setAttribute("class", "div_row");
      this.ControlRowLong = document.createElement("div");
      this.ControlRowLong.setAttribute("class", "div_row");
      // Latitude Input Degrees
      this.latCell_Control = document.createElement("div");
      this.latCell_Control.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.latControlDegr = document.createElement("INPUT");
      this.latControlDegr.setAttribute("type", "number");
      this.latControlDegr.readOnly = true;
      this.latControlDegr.setAttribute("size", "30");
      this.latCell_Control.appendChild(this.latControlDegr);
      // Longitude Input degrees
      this.longCell_Control = document.createElement("div");
      this.longCell_Control.setAttribute("class", "div_cell_geo_lat_long threshold");
      this.longControlDegr = document.createElement("INPUT");
      this.longControlDegr.setAttribute("type", "number");
      this.longControlDegr.readOnly = true;
  
      this.longControlDegr.setAttribute("size", "30");
      this.longCell_Control.appendChild(this.longControlDegr);
      //
      this.aDegreeControltDiv.appendChild(this.ControlRowLat);
      this.aDegreeControltDiv.appendChild(this.ControlRowLong);
  
      this.ControlRowLat.appendChild(this.latCell_Control);
      this.ControlRowLong.appendChild(this.longCell_Control);
      // Adding Control content to third column second row
      this.aCell_3.appendChild(this.aDegreeControltDiv);
      // End of  3-d Column
  
      // Adding default content to second column second row
      this.aCell_2.appendChild(this.aDegreeInputDiv[this.inputOption]);
  
      this.container.appendChild(this.tbl);
      //this.container.appendChild(this.aDegreeInputDiv[0]);
  
  
    } // End of constuctor
  
    changeFormat() {
      while (this.aCell_2.hasChildNodes()) {
        this.aCell_2.removeChild(this.aCell_2.lastChild);
      }
      //this.inputOption = this.sel.value;
      console.log(`inside function changeFormat - this.inputOption = ${this.inputOption}`);
      this.aCell_2.appendChild(this.aDegreeInputDiv[this.inputOption]);
      this.latControlDegr.value = null;
      this.longControlDegr.value = null;
    }
    //
    getCoord() {
  
    }
    //
    convertToDecimal() {
      console.log(`input option == ${this.inputOption}`);
      if (this.inputOption == 0) { // Degrees
        console.log("inputOpt = 1");
        this.degreeInputValueLat = this.latInputDegr.value;
        this.degreeInputValueLong = this.longInputDegr.value;
        this.latDecimal = Number(this.degreeInputValueLat);
        this.longDecimal = Number(this.degreeInputValueLong);
      }
      else if (this.inputOption == 1) {  // Degrees, Minutes
        console.log("inputOpt = 1");
        // DD = degrs + (mins/60)
        this.degreeInputValueLat = this.latInput_DM_d.value;
        this.degreeInputValueLong = this.longInput_DM_d.value;
        this.minuteInputValueLat = this.latInput_DM_m.value;
        this.minuteInputValueLong = this.longInput_DM_m.value;
        this.latDecimal = Number(this.degreeInputValueLat) + Number(this.minuteInputValueLat) / 60;
        this.longDecimal = Number(this.degreeInputValueLong) + Number(this.minuteInputValueLong) / 60;
      }
      else if (this.inputOption == 2) {  // Degrees, Minutes, Seconds
        console.log("inputOpt = 2");
        // DD = degrs + (mins/60) + (secs/3600);
        this.degreeInputValueLat = this.latInput_DMS_d.value;
        this.degreeInputValueLong = this.longInput_DMS_d.value;
        this.minuteInputValueLat = this.latInput_DMS_m.value;
        this.minuteInputValueLong = this.longInput_DMS_m.value;
        this.secondInputValueLat = this.latInput_DMS_s.value;
        this.secondInputValueLong = this.longInput_DMS_s.value;
  
        this.latDecimal = Number(this.degreeInputValueLat) + Number(this.minuteInputValueLat) / 60 + Number(this.secondInputValueLat) / 3600;
        this.longDecimal = Number(this.degreeInputValueLong) + Number(this.minuteInputValueLong) / 60 + Number(this.secondInputValueLong) / 3600;
      }
      console.log(this.degreeInputValueLat);
      console.log(this.degreeInputValueLong);
      console.log(this.latDecimal);
      console.log(this.longDecimal);
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
  
      this.latControlDegr.value = this.latDecimal;
      this.longControlDegr.value = this.longDecimal;
      this.geoPoint = {
        lat: this.latDecimal,
        lon: this.longDecimal
      }
    }
    //
    getGeoPoint() {
      this.convertToDecimal();
      if (this.geoPoint["lat"] == 0 && this.geoPoint["lon"] == 0) {
        alert(" You must first convert to degrees: (Press the Button 'Convert to degrees (decimal)')");
      }
      return this.geoPoint;
    }
    //
    convertToDecimalDegrees(LatLong, degrs, mins = 0, secs = 0) {
      /*
  Decimal Degrees = degrees + (minutes/60) + (seconds/3600)
  DD = d + (min/60) + (sec/3600)
      */
      let DD = 0;
      if (LatLong == "N" || LatLong == "S") {
  
        if (Math.abs(degrs) < 90) {
          DD = degrs + (mins / 60) + (secs / 3600);
        }
        else {
          alert("Wrong Latitude degree value!");
        }
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
  }
  // END of ******** Class geoPointForm **************************************