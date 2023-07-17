import { Component, OnInit, ViewChild } from '@angular/core';
import { TestComponent } from '../../crossroads/modal/test/test.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { MaintainersService } from '../../services/maintainers.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Communes, Crossroad, CrossroadEquipment, EquipmentType } from '../../interface/maintainers';

@Component({
  selector: 'app-crossroads',
  templateUrl: './crossroads.component.html',
  styleUrls: ['./crossroads.component.css']
})
export class CrossroadsComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer; // para manejar el cierre del panel lateral
  isCheckedEquipments = true; // maneja el switch de vigente de Equipos
  isCheckedContracts = true; // maneja el switch de vigente de Contrato
  openedFiltersMenu: boolean = false; // para manejar la apertura del collapse de filtros
  expandCrossroadList: boolean = true; // para manejar el expand del listado de cruces
  expandCrossroadEquipments: boolean = true; // para manejar el expand de equipos del cruce
  expandEquipmentContracts: boolean = false; // para manejar el expand de contratos del equipo

  selected: any;
  selectedTableTwo: any;

  selectedRow: any;
  selectedRowTableTwo: any;

  colsCrossroads!: any[]; // array que contendrá la configuración del header de la tabla de Cruces

  crossroadsDataSource: Crossroad[] = [];  // array que contendrá la data a mostrar en la tabla de Cruces

  crossroadPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de Cruces

  crossroadEquipmentPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de Cruces

  equipmentContractsPanel: boolean = false;

  createCrossroadEquipmentsPanel: boolean = false;

  editMode: boolean = false; // en TRUE habilitará mostrar el contenido del panel asociado a la EDICIÓN, en FALSE a la CREACIÓN

  searchCrossroadEquipments: boolean = false;

  searchEquipmentContracts: boolean = false;

  crossroadIdSelected: number = 0;

  crossroadNameSelected: string = '';

  crossroadEquipmentsSelected: any = []; // contendrá un cruce para crear un nuevo equipo del cruce asociado

  contractEquipmentSelected: any = []; //


  colsCrossroadEquipments!: any[];  // array que contendrá la configuración del header de la tabla de Equipos del Cruce

  colsContracts!: any[];

  crossroadEquipmentsDataSource: any = [];  // array que contendrá la data a mostrar en la tabla de Equipos del Cruce

  contractEquipmentDataSource: any = [];


  dataRowHasData: boolean = true; // en TRUE muestra la data en la grilla de funcionamientos, en FALSE muestra mensajes al usuario

  crossroadCode = new FormControl();  // para enviar y recibir data de los inputs
  crossroadStreetOne = new FormControl();  // para enviar y recibir data de los inputs
  crossroadStreetTwo = new FormControl();  // para enviar y recibir data de los inputs

  equipmentCode = new FormControl();
  equipmentStart = new FormControl();
  equipmentEnd = new FormControl();


  contractEquipmentStart = new FormControl();
  contractEquipmentEnd = new FormControl();

  // Trae todas las comunas para el multiselect de comuna
  communeDataSource: Communes[] = [];

  // Guarda la comuna seleccionada en el colapse de filtros
  communeSelected: object[] = [];

  // Trae todas las comunas para el multiselect de comuna
  equipmentTypesDataSource: EquipmentType[] = [];

  // Trae todas las comunas para el multiselect de comuna
  companyDataSource: object[] = [];

  // Trae los contratos
  // TODO
  contractsDataSource: any = [''];

  // Guarda la comuna seleccionada en el colapse de filtros
  equipmentTypeSelected: any = [];

  // Guarda la comuna seleccionada en el colapse de filtros
  responsibleCompany: any = [];

  // Trae todas las comunas para el multiselect de comuna
  directDataSource: number[] = [1, 2, 3, 4, 14];

  // Guarda la comuna seleccionada en el colapse de filtros
  directSelected: any = [];

  // Guarda la comuna seleccionada en el panel de nuevo/editar cruce
  communeSelectedCrossroad: Communes[] = [];



  equimentNameSelected: string = '';

  selectedCrossroad: Crossroad[] = [];
  selectedContractEquipment: EquipmentType[] = [];



  property = new FormControl();
  model = new FormControl();
  serieNumber = new FormControl();
  codeScat = new FormControl();
  numberChass = new FormControl();
  observations = new FormControl();

  code = new FormControl();
  disabled: boolean = true;

  // configuraciones del select simple sin filtros
  selectWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'communeId',
    textField: 'communeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  // configuraciones del select simple sin filtros
  selectEquipmentTypes: IDropdownSettings = {
    singleSelection: true,
    idField: 'equipmentTypeId',
    textField: 'equipmentTypeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };



  // configuraciones del select simple sin filtros
  selectDirect: IDropdownSettings = {
    singleSelection: true,
    idField: 'directId',
    textField: 'directValue',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  contractEquipmentSelect: IDropdownSettings = {
    singleSelection: true,
    idField: 'contractId',
    textField: 'contractName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };



  multiselectWithFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'equipmentTypeId',
    textField: 'equipmentTypeName',
    searchPlaceholderText: 'Filtrar',
    selectAllText: 'Todas',
    unSelectAllText: 'Deseleccionar',
    itemsShowLimit: 2,
    allowSearchFilter: true,
  };

  selectWithFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'companyId',
    textField: 'companyName',
    searchPlaceholderText: 'Filtrar',
    selectAllText: 'Todas',
    unSelectAllText: 'Deseleccionar',
    itemsShowLimit: 2,
    allowSearchFilter: true,
  };

  constructor(
    public _maintainersService: MaintainersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.code = new FormControl({ value: '', disabled: this.disabled })
    // para cargar todas las comunas en el select
    this.communeDataSource = this._maintainersService.getCommunes();

    this.equipmentTypesDataSource = this._maintainersService.getEquipmentTypes();

    this.companyDataSource = [
      { companyId: '1', companyName: 'Empresa 1' },
      { companyId: '2', companyName: 'Empresa 2' },
      { companyId: '3', companyName: 'Empresa 3' },
      { companyId: '4', companyName: 'Empresa 4' },
      { companyId: '5', companyName: 'Empresa 5' },

    ]

    // setea el header de las columnas en la tabla HTML de Cruces
    this.colsCrossroads = [
      { field: 'crossroadId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'streetOne', header: 'Calle 1', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'streetTwo', header: 'Calle 2', sort: true, align: 'align-default' },
      { field: 'commune', header: 'Comuna', sort: true, align: 'align-center' },
      { field: 'region', header: 'Región', sort: true, align: 'align-center' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];

    this.colsCrossroadEquipments = [
      { field: 'equipmentCode', header: 'Código', sort: true, align: 'align-center fit-column' },
      { field: 'equipmentTypeName', header: 'Equipo', sort: true, align: 'align-center' },
      { field: 'equipmentStart', header: 'Inicio', sort: true, align: 'align-center' },
      { field: 'equipmentEnd', header: 'Fin', sort: true, align: 'align-center' },
      { field: 'equipmentDirect', header: 'Directo', sort: true, align: 'align-center' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' },
    ]

    this.colsContracts = [
      { field: 'contractName', header: 'Contrato', sort: true, align: 'align-default' },
      { field: 'contractStart', header: 'Inicio', sort: true, align: 'align-center' },
      { field: 'contractEnd', header: 'Fin', sort: true, align: 'align-center' }
    ]

    // a traves del servicio, setea la data inicial que llenará la tabla de Cruces
    this.crossroadsDataSource = this.getCrossroads()

    // setea un registro vacío para mostrar inicialmente en la tabla de equipos del cruce
    this.crossroadEquipmentsDataSource = [''];

  }

  // Manejar apertura de los filtros
  handleFiltersMenu() {
    this.openedFiltersMenu = !this.openedFiltersMenu;
  }

  // Manejar apertura del expand del listado de Cruces
  handleCrossroadList() {
    this.expandCrossroadList = !this.expandCrossroadList;
  }

  // Manejar apertura del expand de Equipos del Cruce
  handleCrossroadEquipments() {
    this.expandCrossroadEquipments = !this.expandCrossroadEquipments;
  }

  // Manejar apertura del expand de Equipos del Cruce
  handleEquipmentContracts() {
    this.expandEquipmentContracts = !this.expandEquipmentContracts;
  }

  getCrossroads() {
    // a traves del servicio, setea la data inicial que llenará la tabla de Cruces
    return this._maintainersService.getCrossroads();
  }

  // setea el panel lateral para la creación / edición de Cruces
  setCrossroad(editMode?: boolean, dataRow?: Crossroad): void {

    this.selectedRow = dataRow;
    // para modo creación
    if (!editMode) {
      this.crossroadCode.reset(); // limpia los inputs por si estaban cargados
      this.crossroadStreetOne.reset(); // limpia los inputs por si estaban cargados
      this.crossroadStreetTwo.reset(); // limpia los inputs por si estaban cargados
      this.communeSelectedCrossroad = [] // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      let getCommunes = this._maintainersService.getCommunesById(dataRow?.relCommuneId); // guardamos data de la comuna
      this.editMode = true;
      this.crossroadCode.setValue(dataRow?.crossroadId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.crossroadStreetOne.setValue(dataRow?.streetOne); // carga los inputs con la data enviada desde la ROW de la tabla
      this.crossroadStreetTwo.setValue(dataRow?.streetTwo); // carga los inputs con la data enviada desde la ROW de la tabla
      this.communeSelectedCrossroad = getCommunes; // seteamos la opcion seleccionada en el multiselect
    }
    this.crossroadEquipmentPanel = false; // habilita OCULTAR el contenido asociado al funcionamiento
    this.equipmentContractsPanel = false;
    this.createCrossroadEquipmentsPanel = false;
    if (!this.crossroadPanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.crossroadPanel = true; // habilita mostrar el contenido asociado al Cruce
  }

  // Agregar un Cruce
  addCrossroad() {

    let communeInfo = this._maintainersService.getCommunesById(this.communeSelectedCrossroad[0].communeId);
    // llama al servicio, pide la función addCrossroad y le envía un objeto con los datos del nuevo Cruce
    this._maintainersService.addCrossroad(
      {
        crossroadId: this.crossroadCode.value, // valor captado del input mediante el formControl
        streetOne: this.crossroadStreetOne.value, // valor captado del input mediante el formControl
        streetTwo: this.crossroadStreetTwo.value, // valor captado del input mediante el formControl
        commune: communeInfo[0].communeName, // valor captado del multiselect a traves de communeInfo
        relCommuneId: communeInfo[0].communeId, // valor captado del multiselect a traves de communeInfo
        region: communeInfo[0].regionName[0].regionName // valor captado del multiselect a traves de communeInfo
      }
    );
    this.crossroadCode.reset(); // vacía el input para la próxima búsqueda
    this.crossroadStreetOne.reset(); // vacía el input para la próxima búsqueda
    this.crossroadStreetTwo.reset(); // vacía el input para la próxima búsqueda
    this.communeSelectedCrossroad = [] // borra la opción seleccionada del multiselect
    // a traves del servicio, actualiza la tabla de Cruces
    this.crossroadsDataSource = []; // primero borra el contenido de la tabla
    this.crossroadsDataSource = this.getCrossroads(); // luego lo vuelve a renderizar (si no lo borro antes no renderiza, dont know why)
    this.closeDrawer(); // cierra el panel lateral
  }

  // busca los funcionamientos asociadas a un Tipo de Equipo y setea la grilla de funcionamientos
  getCrossroadEquipments(crossroadIdSelected: number, relCrossroadEquipments: number[], rowData?: Crossroad) {

    this.selectedRow = rowData;

    this.crossroadIdSelected = crossroadIdSelected;

    this.crossroadEquipmentsSelected = [relCrossroadEquipments]; // setea el Cruce seleccionado para que se pueda crear un nuevo Equipo del cruce asociado

    this.crossroadNameSelected = `(${rowData?.crossroadId} - ${rowData?.streetOne.substring(0, 10)}.. / ${rowData?.streetTwo.substring(0, 10)}..)`;

    this.searchCrossroadEquipments = true; // setea la búsqueda en true para que la tabla muestre la data o mensajes al usuario

    // hace la búsqueda en el servicio y la guarda en una variable
    let match = this._maintainersService.getCrossroadEquipments(relCrossroadEquipments);

    // si NO hay coindicencias
    if (match === null) {
      this.crossroadEquipmentsDataSource = ['']; // asocia un registro vacío para que lo capte la tabla del HTML
      this.dataRowHasData = false;  // esta variable en FALSE mostrará el mensaje "NO hay coincidencias"
    }

    // si HAY coincidencias
    else {
      this.crossroadEquipmentsDataSource = match; // asocia coincidencias en la variable de búsqueda asociada a la tabla del HTML
      this.dataRowHasData = true;    // esta variable en TRUE eliminará el mensaje "NO hay coincidencias"
    }
  }

  //setea el panel lateral para la creación / edición de Tipos de Equipo
  setCrossroadEquipment(): void {

    this.equipmentCode.reset(); // limpia los inputs por si estaban cargados
    this.equipmentStart.reset(); // limpia los inputs por si estaban cargados
    this.equipmentEnd.reset(); // limpia los inputs por si estaban cargados
    this.equipmentTypeSelected = [];
    this.directSelected = [];

    this.createCrossroadEquipmentsPanel = false;

    this.crossroadPanel = false; // habilita mostrar el contenido asociado al funcionamiento
    this.equipmentContractsPanel = false;
    this.crossroadEquipmentPanel = true; // habilita OCULTAR el contenido asociado al funcionamiento
    this.drawer.toggle(); // ABRE el panel lateral
    //this.getEquipmentTypes();
  }

  //Agregar un Equipo del Cruce
  addCrossroadEquipment() {

    let regLength = this.crossroadEquipmentsSelected[0].length + 1; // para simular ID

    let newRelEquipmentCross = [];

    // llama al servicio, pide la función addBehaviour y le envía un objeto con los datos del nuevo funcionamiento
    this._maintainersService.addCrossroadEquipment(
      {
        crossroadEquipmentId: regLength,
        relEquipmentTypeId: this.equipmentTypeSelected[0].equipmentTypeId,
        equipmentTypeName: this.equipmentTypeSelected[0].equipmentTypeName,
        equipmentCode: this.equipmentCode.value,
        equipmentStart: this.equipmentStart.value,
        equipmentEnd: this.equipmentEnd.value,
        equipmentDirect: this.directSelected[0],
        equipmentContracts: []
      }
    );
    // tras agregar el nuevo registro, llama a la función getBehaviours
    newRelEquipmentCross = this._maintainersService.addRelCrossroadEquipments(this.crossroadIdSelected, regLength);
    this.getCrossroadEquipments(this.crossroadIdSelected, newRelEquipmentCross); // para que vuelva a renderizar la info de los equipos del cruce en la tabla HTML
    this.closeDrawer(); // cierra el panel lateral


  }

  getEquipmentContracts(rowData?: CrossroadEquipment) {
    this.selectedRowTableTwo = rowData;
    this.equimentNameSelected = `(${rowData?.equipmentCode} - ${rowData?.equipmentTypeName.substring(0, 10)}.. )`;
    this.searchEquipmentContracts = !this.searchEquipmentContracts;
    this.contractsDataSource = [
      { contractName: 'Providencia', contractStart: '1998-06-30', contractEnd: '2500-01-01' },
      { contractName: 'Las Condes', contractStart: '2021-06-24', contractEnd: '2050-08-24' }
    ]
    this.expandCrossroadList = false;
    this.expandEquipmentContracts = true;
  }




  setEquipmentContract() {
    this.contractEquipmentDataSource = this._maintainersService.getContracts();
    this.crossroadPanel = false;
    this.crossroadEquipmentPanel = false;
    this.equipmentContractsPanel = true;
    this.createCrossroadEquipmentsPanel = false;

    this.drawer.toggle();


  }


  toCreateCrossroadEquipments() {
    this.createCrossroadEquipmentsPanel = true;

    this.crossroadPanel = false;
    this.crossroadEquipmentPanel = false;
    this.equipmentContractsPanel = false;
    this.drawer.toggle();


  }


  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel
    this.crossroadPanel = false; // oculta el contenido del panel asociado al Cruce
    this.crossroadEquipmentPanel = false; // oculta el contenido del panel asociado a los funcionamientos
    this.editMode = false; // setea la edición en false por si a continuación es necesario mostrar en el panel la creación de una entidad
  }

  // Abrir los modales
  modal() {
    const dialogRef = this.dialog.open(TestComponent, {
      width: '48vw',
      minHeight: '33vh',
      hasBackdrop: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog: ${result}`);
    });
  }

  deleteExample(dataRow?: Crossroad) {
    this.selectedRow = dataRow
    console.log('Eliminar fila')
  }
}
