import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { FormControl } from '@angular/forms';
import { Communes, Contract, Crossroad } from '../../interface/maintainers';
import { MaintainersService } from '../../services/maintainers.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer; // para manejar el cierre del panel lateral

  editMode: boolean = false; // en TRUE habilitará mostrar el contenido del panel asociado a la EDICIÓN, en FALSE a la CREACIÓN

  contractPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de contratos

  colsContracts!: any[]; // array que contendrá la configuración del header de la tabla de Contratos

  contractsDataSource: Contract[] = [];  // array que contendrá la data a mostrar en la tabla de Contratos
  contactSelected: any = [];


  contractCode = new FormControl();  // para enviar y recibir data de los inputs
  contractName = new FormControl();  // para enviar y recibir data de los inputs
  contractStart = new FormControl();  // para enviar y recibir data de los inputs
  contractEnd = new FormControl();  // para enviar y recibir data de los inputs
  expandContract: boolean = true;
  expandCrossroadList: boolean = true;

  selected: any;
  selectedRow: any;
  selectedTableTwo: any;
  selectedRowTableTwo: any;

  colsCrossroads!: any[];
  colsCrossroadSearch!: any[];

  colsCrossroad!: any[];
  crossroadsDataSource: any = [];

  searchCrossroad: boolean = false;



  dataRowHasData: boolean = true;


  contactIdSelected: number = 0;
  contractSelected: any = [];

  crossroadDataSource: any = [];
  crossroadSearchDataSource: Crossroad[] = [];

  selectedCrossroad: Crossroad[] = [];

  crossroadCommune = new FormControl();
  crossroadRegion = new FormControl();

  crossroadCode = new FormControl();  // para enviar y recibir data de los inputs
  crossroadStreetOne = new FormControl();  // para enviar y recibir data de los inputs
  crossroadStreetTwo = new FormControl();  // para enviar y recibir data de los inputs
  crossroadPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de Cruces
  associatedCrossesPanel: boolean = false;

  // Trae todas las comunas para el multiselect de comuna
  communeDataSource: Communes[] = [];

  // Guarda la comuna seleccionada en el colapse de filtros
  communeSelected: object[] = [];

  contractDataSource: any = [];
  searchCrossroads: boolean = false;
  code = new FormControl();
  disabled: boolean = true;

  // configuraciones del select simple sin filtros
  selectWithoutFilter: IDropdownSettings = {
    singleSelection: false,
    idField: 'communeId',
    textField: 'communeName',
    itemsShowLimit: 2,
    allowSearchFilter: true,
    selectAllText: 'Todas',
    unSelectAllText: 'Deseleccionar',
    searchPlaceholderText: 'Buscar...',
  };

  constructor(
    // se hace uso del servicio
    public _maintainersService: MaintainersService
  ) { }

  ngOnInit(): void {
    this.code = new FormControl({ value: '', disabled: this.disabled })
    // a traves del servicio, setea la data inicial que llenará la tabla de Regiones
    this.contractsDataSource = this._maintainersService.getContracts();

    // setea un registro vacío para mostrar inicialmente en la tabla de comunas
    this.crossroadDataSource = ['']
    this.crossroadSearchDataSource = this._maintainersService.getCrossroads();

    // para cargar todas las comunas en el select
    this.communeDataSource = this._maintainersService.getCommunes();

    // setea el header de las columnas en la tabla HTML de Contratos
    this.colsContracts = [
      { field: 'contractId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'contractName', header: 'Nombre', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'contractStart', header: 'Inicio', sort: true, align: 'align-center' },          // columnas más angostas
      { field: 'contractEnd', header: 'Fin', sort: true, align: 'align-center' },          // columnas más angostas
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];

    this.colsCrossroads = [
      { field: 'crossroadId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'streetOne', header: 'Calle 1', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'streetTwo', header: 'Calle 2', sort: true, align: 'align-default' },
      { field: 'commune', header: 'Comuna', sort: true, align: 'align-center' },
      { field: 'region', header: 'Región', sort: true, align: 'align-center' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];

    this.colsCrossroadSearch = [
      { field: 'streetOne', header: 'Calle 1', sort: false, align: 'align-default' },          // columnas más angostas
      { field: 'streetTwo', header: 'Calle 2', sort: false, align: 'align-default' },
      { field: 'commune', header: 'Comuna', sort: false, align: 'align-center' },
    ];

    this.crossroadsDataSource = this.getCrossroads()
    // a traves del servicio, setea la data inicial que llenará la tabla de Contratos
    this.setContractsDataSource()
  }

  handleContract() {
    this.expandContract = !this.expandContract;
  }

  handleCrossroad() {
    this.expandCrossroadList = !this.expandCrossroadList;
  }

  getCrossroads() {
    // a traves del servicio, setea la data inicial que llenará la tabla de Cruces
    return this._maintainersService.getCrossroads();
  }


  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel
    this.contractPanel = false; // oculta el contenido del panel asociado al contrato
    this.editMode = false; // setea la edición en false por si a continuación es necesario mostrar en el panel la creación de una entidad
  }

  setContractsDataSource() {
    this.contractsDataSource = this._maintainersService.getContracts();
  }

  // setea el panel lateral para la creación / edición de contratos
  setContract(editMode?: boolean, dataRow?: Contract): void {

    if (dataRow) {
      this.getCrossroadsByIds(dataRow)
    }
    this.selectedRow = dataRow;
    // para modo creación
    if (!editMode) {
      this.contractCode.reset(); // limpia los inputs por si estaban cargados
      this.contractName.reset(); // limpia los inputs por si estaban cargados
      this.contractStart.reset(); // limpia los inputs por si estaban cargados
      this.contractEnd.reset(); // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      this.editMode = true;
      this.contractCode.setValue(dataRow?.contractId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.contractName.setValue(dataRow?.contractName); // carga los inputs con la data enviada desde la ROW de la tabla
      this.contractStart.setValue(dataRow?.contractStart); // carga los inputs con la data enviada desde la ROW de la tabla
      this.contractEnd.setValue(dataRow?.contractEnd); // carga los inputs con la data enviada desde la ROW de la tabla
    }
    this.associatedCrossesPanel = false;
    if (!this.contractPanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.contractPanel = true; // habilita mostrar el contenido asociado al contrato
  }

  // Agregar un contrato
  addContract() {
    // llama al servicio, pide la función addContract y le envía un objeto con los datos del nuevo contrato
    this._maintainersService.addContract(
      {
        contractId: this.contractCode.value, // valor captado del input mediante el formControl
        contractName: this.contractName.value, // valor captado del input mediante el formControl
        contractStart: this.contractStart.value, // valor captado del input mediante el formControl
        contractEnd: this.contractEnd.value, // valor captado del input mediante el formControl
        relatedCrossroadId: [1, 5] //this.crossroadSelected[0].crossroadId
      }
    );
    this.contractCode.reset(); // vacía el input para la próxima búsqueda
    this.contractName.reset(); // vacía el input para la próxima búsqueda
    this.contractStart.reset(); // vacía el input para la próxima búsqueda
    this.contractEnd.reset(); // vacía el input para la próxima búsqueda
    this.setContractsDataSource() // llama al servicio y actualiza el contenido de la tabla
    this.closeDrawer(); // cierra el panel lateral
  }

  setCrossroad(editMode?: boolean, dataRow?: Crossroad): void {
    // para modo creación
    if (!editMode) {
      this.crossroadCode.reset(); // limpia los inputs por si estaban cargados
      this.crossroadStreetOne.reset(); // limpia los inputs por si estaban cargados
      this.crossroadStreetTwo.reset(); // limpia los inputs por si estaban cargados
      this.crossroadCommune.reset();
      this.crossroadRegion.reset();
    }
    // para modo edición
    else {

      this.editMode = true;
      this.crossroadCode.setValue(dataRow?.crossroadId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.crossroadStreetOne.setValue(dataRow?.streetOne); // carga los inputs con la data enviada desde la ROW de la tabla
      this.crossroadStreetTwo.setValue(dataRow?.streetTwo); // carga los inputs con la data enviada desde la ROW de la tabla
      this.crossroadCommune.setValue(dataRow?.commune);
      this.crossroadRegion.setValue(dataRow?.region);

    }
    this.crossroadPanel = true; // habilita mostrar el contenido asociado al Cruce

    this.drawer.toggle(); // ABRE el panel lateral
  }


  getCrossroadsByIds(contract: Contract) {

    this.selectedRow = contract;

    this.contractSelected = `(${contract?.contractId} - ${contract?.contractName.substring(0, 10)}..)`;
    this.searchCrossroads = true;

    let match = this._maintainersService.getCrossroadsById(contract.relatedCrossroadId);

    if (match === null || match.length === 0) {
      this.crossroadDataSource = [''];
      this.dataRowHasData = false;
    }

    else {
      this.crossroadDataSource = match;
      this.dataRowHasData = true;
    }
  }

  setAssociatedCrosses() {
    this.associatedCrossesPanel = true;
    this.contractPanel = false;
    this.drawer.toggle();
  }

  deleteExample(dataRow?: Crossroad) {
    this.selectedRowTableTwo = dataRow
    console.log('Eliminar fila')
  }


}
