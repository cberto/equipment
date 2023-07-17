import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  Applicant,
  Behaviour,
  Communes,
  Crossroad,
  EquipmentContract,
  EquipmentType,
  Responsable,
  TasksInExecution,
  Technical,
} from '../../interface/maintainers';
import { MaintainersService } from '../../services/maintainers.service';
import { AssociatedAttentions, ListCrossroadEquipment } from '../../interface/maintainers';

@Component({
  selector: 'app-tasks-and-attention',
  templateUrl: './tasks-and-attention.component.html',
  styleUrls: ['./tasks-and-attention.component.css'],
})
export class TasksAndAttentionComponent implements OnInit {
  @ViewChild('drawer')
  public drawer!: MatDrawer;

  communeDataSource: Communes[] = [];
  communeSelected: object[] = [];

  crossroadCode = new FormControl();
  crossroadStreetOne = new FormControl();
  crossroadStreetTwo = new FormControl();

  observations = new FormControl();
  tasksInExecutionStart = new FormControl();
  tasksInExecutionEnd = new FormControl();
  property = new FormControl();
  model = new FormControl();
  serieNumber = new FormControl();
  codeScat = new FormControl();
  numberChass = new FormControl();


  responsibleCompany = new FormControl();


  company = new FormControl(false);

  colsCrossroads!: any[];
  colsTasksInExecution!: any[];
  colsAssociatedAttentions!: any[];
  crossroadsDataSource: Crossroad[] = [];
  communeSelectedCrossroad: Communes[] = [];

  openedFiltersMenu: boolean = false;
  expandTasksInExecution: boolean = false;
  searchTasksInExecution: boolean = false;
  searchAssociatedAttentions: boolean = false;
  expandAssociatedAttentions: boolean = false;

  seeProperties: boolean = false;
  dataRowHasData: boolean = true;
  expandCrossroadList: boolean = true;

  tasksInExecutionDataSource: any = [];

  taskSelected: string = '';

  associatedAttentionsDataSource: any = [''];
  crossroadSelected: string = '';
  crossroadIdSelected: number = 0;

  editMode: boolean = false;

  isCheckedTasksInExecution = true;

  equipmentTypesDataSource: EquipmentType[] = [];
  equipmentTypeSelected: any = [];
  selectEquipmentType: any = [];


  equipmentContractDataSource: EquipmentContract[] = [];
  equipmentContractSelected: any = [];

  behaviourDataSource: Behaviour[] = [];
  behaviourSelected: any = [];

  applicantDataSource: Applicant[] = [];
  applicantSelected: any = [];

  responsableDataSource: Responsable[] = [];
  responsableSelected: any = [];

  technicalDataSource: Technical[] = [];
  technicalSelected: any = [];

  attentionsAssociatedPanel: boolean = false;
  setTasksInExecutionPanel: boolean = false;
  executionTasksPanel: boolean = false;
  associatedAttentionsPanel: boolean = false;

  associatedAttentionsCode = new FormControl();
  associatedAttentionsName = new FormControl();
  associatedAttentionsTypeName = new FormControl();
  associatedAttentionsState = new FormControl();
  associatedAttentionsGroup = new FormControl();
  equipmentStart = new FormControl();
  equipmentEnd = new FormControl();


  functionArrivalDataSource: any = [];
  functionArrivalSelected: any = [];
  functionFinishedDataSource: any = [];
  functionFinishedSelected: any = [];
  tasksInExecutionSelected: any = [];
  setTasksInExecutionSelected: any = [];

  code = new FormControl();
  disabled: boolean = true;

  businessDataSource: object[] = [];


  selected: any;
  selectedTableTwo: any;

  selectedRow: any;
  selectedRowTableTwo: any;

  selectedRowTwo: any;
  selectedRowTableThree: any;

  selectWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'communeId',
    textField: 'communeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectEquipmentTypes: IDropdownSettings = {
    singleSelection: true,
    idField: 'equipmentTypeId',
    textField: 'equipmentTypeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectEquipmentContract: IDropdownSettings = {
    singleSelection: true,
    idField: 'contractId',
    textField: 'contractName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectBehaviour: IDropdownSettings = {
    singleSelection: true,
    idField: 'behaviourId',
    textField: 'behaviourName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectApplicant: IDropdownSettings = {
    singleSelection: true,
    idField: 'applicantId',
    textField: 'applicantName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };
  selectResponsable: IDropdownSettings = {
    singleSelection: true,
    idField: 'responsableId',
    textField: 'responsableName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectTechnical: IDropdownSettings = {
    singleSelection: true,
    idField: 'technicalId',
    textField: 'technicalName',
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
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };



  functionArrivalSelect: IDropdownSettings = {
    singleSelection: true,
    idField: 'functionArrivalId',
    textField: 'functionArrivalName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };
  functionFinishedSelect: IDropdownSettings = {
    singleSelection: true,
    idField: 'functionFinishedId',
    textField: 'functionFinishedName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectWithFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'businessId',
    textField: 'businessName',
    searchPlaceholderText: 'Filtrar',
    selectAllText: 'Todas',
    unSelectAllText: 'Deseleccionar',
    itemsShowLimit: 2,
    allowSearchFilter: true,
  };

  selectListCrossroadEquipment: ListCrossroadEquipment[] = [];
  colCrossroadEquipment!: any[];

  listCrossroadEquipmentDataSource: ListCrossroadEquipment[] = [];

  selectTasksInExecution!: any[];
  selectedCrossroadEquipment: EquipmentContract[] = [];

  selectedAssociatedAttentions!: any[];
  constructor(public _maintainersService: MaintainersService) { }

  ngOnInit(): void {
    this.code = new FormControl({ value: '', disabled: this.disabled })
    this.communeDataSource = this._maintainersService.getCommunes();
    this.equipmentTypesDataSource =
      this._maintainersService.getEquipmentTypes();
    this.equipmentContractDataSource =
      this._maintainersService.getEquipmentContracts();
    this.behaviourDataSource = this._maintainersService.getBehaviour();
    this.applicantDataSource = this._maintainersService.getApplicant();
    this.responsableDataSource = this._maintainersService.getResponsable();
    this.technicalDataSource = this._maintainersService.getTechnical();
    this.functionArrivalDataSource = this._maintainersService.getFunctionArrival();
    this.functionFinishedDataSource = this._maintainersService.getFunctionFinished();
    this.colsCrossroads = [
      {
        field: 'crossroadId',
        header: 'Código',
        sort: true,
        align: 'align-center fit-column',
      }, // clase fit column es para las
      {
        field: 'streetOne',
        header: 'Calle 1',
        sort: true,
        align: 'align-default',
      }, // columnas más angostas
      {
        field: 'streetTwo',
        header: 'Calle 2',
        sort: true,
        align: 'align-default',
      },
      { field: 'commune', header: 'Comuna', sort: true, align: 'align-center' },
      { field: 'region', header: 'Región', sort: true, align: 'align-center' },
      {
        field: 'actions',
        header: 'Acciones',
        sort: false,
        align: 'align-center fit-column',
      }, // por ejemplo código y acciones
    ];

    this.colsTasksInExecution = [
      {
        field: 'tasksInExecutionId',
        header: 'Código',
        sort: true,
        align: 'align-center fit-column',
      },
      {
        field: 'tasksInExecutionStart',
        header: 'Inicio',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'tasksInExecutionEnd',
        header: 'Fin',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'tasksInExecutionName',
        header: 'Equipo',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'tasksInExecutionTypeName',
        header: 'Funcionamiento',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'actions',
        header: 'Acciones',
        sort: false,
        align: 'align-center fit-column',
      },
    ];

    this.colsAssociatedAttentions = [
      {
        field: 'associatedAttentionsId',
        header: 'Código',
        sort: true,
        align: 'align-center fit-column',
      },
      {
        field: 'associatedAttentionsName',
        header: 'Equipo',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'associatedAttentionsTypeName',
        header: 'Funcionamiento',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'associatedAttentionsState',
        header: 'Estado',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'associatedAttentionsGroup',
        header: 'Grupo',
        sort: true,
        align: 'align-center',
      },
      {
        field: 'actions',
        header: 'Acciones',
        sort: false,
        align: 'align-center fit-column',
      },
    ];

    this.businessDataSource = [
      { businessId: '1', businessName: 'Auter' },
      { businessId: '2', businessName: 'Empresa 1' },
      { businessId: '3', businessName: 'Empresa 2' },
      { businessId: '4', businessName: 'Empresa 3' },
      { businessId: '5', businessName: 'Empresa 4' },

    ];

    this.colCrossroadEquipment = [
      { field: 'equipmentTypeName', header: 'Equipo instalado', sort: true, align: 'align-default' },
      { field: 'serialNumber', header: 'N° Serie', sort: true, align: 'align-default' },
    ];

    this.crossroadsDataSource = this.getCrossroads();

    this.tasksInExecutionDataSource = [''];
    this.listCrossroadEquipmentDataSource = this.getListCrossroadEquipment();
  }

  getCrossroads() {
    // a traves del servicio, setea la data inicial que llenará la tabla de Cruces
    return this._maintainersService.getCrossroads();
  }

  getListCrossroadEquipment() {
    return this._maintainersService.getListCrossroadEquipment();
  }

  handleFiltersMenu() {
    this.openedFiltersMenu = !this.openedFiltersMenu;
  }
  handleCrossroadList() {
    this.expandCrossroadList = !this.expandCrossroadList;
  }

  getTasksInExecution(rowData: Crossroad) {

    this.selectedRow = rowData;
    this.associatedAttentionsDataSource = [''];
    this.searchAssociatedAttentions = false;

    this.crossroadSelected = `(${rowData?.crossroadId} - ${rowData?.streetOne.substring(0, 9)}.. / ${rowData?.streetTwo.substring(0, 9)}..)`;

    this.crossroadIdSelected = rowData.crossroadId;

    this.tasksInExecutionSelected = rowData.relTasksInExecution;

    this.searchTasksInExecution = true;

    let match =
      this._maintainersService.getTasksInExecution(this.tasksInExecutionSelected);

    // si NO hay coindicencias
    if (match === null) {
      this.tasksInExecutionDataSource = ['']; // asocia un registro vacío para que lo capte la tabla del HTML
      this.dataRowHasData = false; // esta variable en FALSE mostrará el mensaje "NO hay coincidencias"
    }

    // si HAY coincidencias
    else {
      this.tasksInExecutionDataSource = match; // asocia coincidencias en la variable de búsqueda asociada a la tabla del HTML
      this.dataRowHasData = true; // esta variable en TRUE eliminará el mensaje "NO hay coincidencias"
    }

    this.expandTasksInExecution = true;
  }

  handleTasksInExecution() {
    this.expandTasksInExecution = !this.expandTasksInExecution;
  }

  executionTasks(rowData: Crossroad) {

    if (rowData) {
      this.getTasksInExecution(rowData);
    }

    this.selectedRow = rowData;
    this.setTasksInExecutionPanel = false;
    this.attentionsAssociatedPanel = false;
    this.associatedAttentionsPanel = false;
    if (!this.executionTasksPanel) {
      this.drawer.toggle();
    }
    this.executionTasksPanel = true;
  }

  setTasksInExecution() {
    this.setTasksInExecutionPanel = true;
    this.executionTasksPanel = false;
    this.attentionsAssociatedPanel = false;
    this.associatedAttentionsPanel = false;

    this.drawer.toggle();
  }

  setAssociatedAttentions(editMode?: boolean, dataRow?: AssociatedAttentions) {
    this.selectedRowTableThree = dataRow;
    if (!editMode) {
      this.crossroadCode.reset();
      this.crossroadStreetOne.reset();
      this.crossroadStreetTwo.reset();
      this.equipmentTypeSelected = []
      this.behaviourSelected = []
      this.equipmentContractSelected = []
    } else {
      let getAssociatedAttentions =
        this._maintainersService.getAssociatedAttention(
          dataRow?.associatedAttentionsId
        ); // guardamos data de la comuna
      this.editMode = true;
      this.associatedAttentionsCode.setValue(dataRow?.associatedAttentionsId);
      this.associatedAttentionsName.setValue(dataRow?.associatedAttentionsName);
      this.associatedAttentionsTypeName.setValue(
        dataRow?.associatedAttentionsTypeName
      );
      this.associatedAttentionsState.setValue(
        dataRow?.associatedAttentionsState
      );
      this.associatedAttentionsGroup.setValue(
        dataRow?.associatedAttentionsGroup
      );
      this.equipmentTypeSelected = getAssociatedAttentions;
      this.behaviourSelected = getAssociatedAttentions;
      this.equipmentContractSelected = getAssociatedAttentions;

      // this.communeSelectedCrossroad = getCommunes;
    }

    this.setTasksInExecutionPanel = false;
    this.executionTasksPanel = false;
    this.associatedAttentionsPanel = false;
    if (!this.attentionsAssociatedPanel) {
      this.drawer.toggle();
    }
    this.attentionsAssociatedPanel = true;
  }

  handleAssociatedAttentions() {
    this.expandAssociatedAttentions = !this.expandAssociatedAttentions;
  }

  getAssociatedAttentions(rowData: TasksInExecution) {

    this.selectedRowTableTwo = rowData;
    this.taskSelected = `(${rowData?.tasksInExecutionId} - ${rowData.tasksInExecutionName.substring(0, 8)}..)`;

    this.searchAssociatedAttentions = !this.searchAssociatedAttentions;

    this.associatedAttentionsDataSource = [
      {
        associatedAttentionsId: 1,
        associatedAttentionsName: 'Instalación',
        associatedAttentionsTypeName: 'D-CON DERRIBO',
        associatedAttentionsState: true,
        associatedAttentionsGroup: 'Básico 1',
      },
      {
        associatedAttentionsId: 2,
        associatedAttentionsName: 'UPS',
        associatedAttentionsTypeName: 'TRABAJA CON DERRIBO',
        associatedAttentionsState: false,
        associatedAttentionsGroup: 'Básico 2',
      },
    ];
    this.expandCrossroadList = false;
    this.expandAssociatedAttentions = true;
  }

  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel

    this.editMode = false;
  }

  associatedAttentions(rowData: Crossroad) {
    this.selectedRowTableThree = rowData;
    this.attentionsAssociatedPanel = false;
    this.setTasksInExecutionPanel = false;
    this.executionTasksPanel = false;
    if (!this.associatedAttentionsPanel) {
      this.drawer.toggle();
    }
    this.associatedAttentionsPanel = true;
  }


  addAttentionsAssociated() {

  }


  addSetTasksInExecution() {


  }

  setProperties() {
    if (this.selectEquipmentType.length === 1) {
      this.serieNumber.setValue(15896);
      this.model.setValue('AB7-954/B');
      this.seeProperties = true;
      this.disabled = false;




    } else {
      this.seeProperties = false;
      this.disabled = true;




    }
  }

}
