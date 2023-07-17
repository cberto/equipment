import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Behaviour, EquipmentType } from '../../interface/maintainers';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { MaintainersService } from '../../services/maintainers.service';

@Component({
  selector: 'app-equipment-types',
  templateUrl: './equipment-types.component.html',
  styleUrls: ['./equipment-types.component.css']
})
export class EquipmentTypesComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer; // para manejar el cierre del panel lateral

  equipmentTypeSelected: any = []; // contendrá un Tipo de Equipo para crear un nuevo funcionamiento asociado

  searchBehaviours: boolean = false; // según su estado muestra distinto contenido en tabla de funcionamientos (data o mensajes al usuario)

  editMode: boolean = false; // en TRUE habilitará mostrar el contenido del panel asociado a la EDICIÓN, en FALSE a la CREACIÓN

  readOnlyMode: boolean = false; // modo lectura del panel de funcionamientos

  equipmentTypePanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de Tipo de Equipo
  behaviourPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de funcionamientos

  equipmentTypesDataSource: EquipmentType[] = [];  // array que contendrá la data a mostrar en la tabla de Tipos de Equipo

  behavioursDataSource: any = []; // array que contendrá la data a mostrar en la tabla de funcionamientos

  dataRowHasData: boolean = true; // en TRUE muestra la data en la grilla de funcionamientos, en FALSE muestra mensajes al usuario

  colsEquipmentTypes!: any[]; // array que contendrá la configuración del header de la tabla de Tipos de Equipo

  colsBehaviours!: any[]; // array que contendrá la configuración del header de la tabla de funcionamientos


  equipmentTypeCode = new FormControl();  // para enviar y recibir data de los inputs
  equipmentTypeName = new FormControl();  // para enviar y recibir data de los inputs
  equipmentTypeDescription = new FormControl();  // para enviar y recibir data de los inputs

  behaviourCode = new FormControl(); // para enviar y recibir data de los inputs
  behaviourName = new FormControl(); // para enviar y recibir data de los inputs
  behaviourNormalState = new FormControl(); // para enviar y recibir data de los inputs


  code = new FormControl();
  disabled: boolean = true;


  selectedProduct: EquipmentType[] = [];
  selectedBehaviours: Behaviour[] = [];

  equimentTypesNameSelected: string = '';



  selected: any;
  selectedTableTwo: any;

  selectedRow: any;
  selectedRowTableTwo: any;

  constructor(
    // se hace uso del servicio
    public _maintainersService: MaintainersService
  ) { }


  ngOnInit() {
    this.code = new FormControl({ value: '', disabled: this.disabled })
    // setea el header de las columnas en la tabla HTML de Tipos de Equipo
    this.colsEquipmentTypes = [
      { field: 'equipmentTypeId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'equipmentTypeName', header: 'Nombre', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'equipmentTypeDescription', header: 'Descripción', sort: false, align: 'align-default' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];

    // setea el header de las columnas en la tabla HTML de funcionamientos
    this.colsBehaviours = [
      { field: 'behaviourId', header: 'Código', sort: true, align: 'align-center fit-column' }, // align: mismo nombre que clases de css
      { field: 'behaviourName', header: 'Funcionamiento', sort: true, align: 'align-default' }, // en caso del align-default será a la izquierda
      { field: 'behaviourNormalState', header: 'Estado Normal', sort: true, align: 'align-center' }, // si quiero a la derecha pongo align-end
      { field: 'equipmentTypeName', header: 'Nombre Tipo de Equipo', sort: false, align: 'align-center' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' }
    ];

    // a traves del servicio, setea la data inicial que llenará la tabla de Tipos de Equipo
    this.equipmentTypesDataSource = this.getEquipmentTypes()

    // setea un registro vacío para mostrar inicialmente en la tabla de funcionamientos
    this.behavioursDataSource = ['']

  }

  getEquipmentTypes() {
    // a traves del servicio, setea la data inicial que llenará la tabla de Tipos de Equipo
    return this._maintainersService.getEquipmentTypes();
  }

  // setea el panel lateral para la creación / edición de Tipos de Equipo
  setEquipmentTypes(editMode?: boolean, dataRow?: EquipmentType): void {
    this.selectedRow = dataRow;
    if (dataRow) {
      this.getBehaviours(dataRow, dataRow)
    }
    // para modo creación
    if (!editMode) {
      this.equipmentTypeCode.reset(); // limpia los inputs por si estaban cargados
      this.equipmentTypeName.reset(); // limpia los inputs por si estaban cargados
      this.equipmentTypeDescription.reset(); // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      this.editMode = true;
      this.equipmentTypeCode.setValue(dataRow?.equipmentTypeId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.equipmentTypeName.setValue(dataRow?.equipmentTypeName); // carga los inputs con la data enviada desde la ROW de la tabla
      this.equipmentTypeDescription.setValue(dataRow?.equipmentTypeDescription); // carga los inputs con la data enviada desde la ROW de la tabla
    }
    this.behaviourPanel = false; // habilita OCULTAR el contenido asociado al funcionamiento
    if (!this.equipmentTypePanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.equipmentTypePanel = true; // habilita mostrar el contenido asociado al Tipo de Equipo
  }

  //setea el panel lateral para la creación / edición de funcionamientos
  setBehaviour(editMode?: boolean, dataRow?: Behaviour): void {
    this.selectedRowTableTwo = dataRow;
    // para modo creación
    if (!editMode) {
      this.behaviourCode.reset(); // limpia los inputs por si estaban cargados
      this.behaviourName.reset(); // limpia los inputs por si estaban cargados
      this.behaviourNormalState.reset(); // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      this.editMode = true;
      this.behaviourCode.setValue(dataRow?.behaviourId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.behaviourName.setValue(dataRow?.behaviourName); // carga los inputs con la data enviada desde la ROW de la tabla
      this.behaviourNormalState.setValue(dataRow?.behaviourNormalState);
    }
    this.equipmentTypePanel = false; // habilita mostrar el contenido asociado al funcionamiento
    if (!this.behaviourPanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.behaviourPanel = true; // habilita OCULTAR el contenido asociado al funcionamiento

  }

  // busca los funcionamientos asociadas a un Tipo de Equipo y setea la grilla de funcionamientos
  getBehaviours(equipmentType: EquipmentType, rowData?: EquipmentType) {
    this.selectedRow = rowData;
    this.equimentTypesNameSelected = `(${rowData?.equipmentTypeId} - ${rowData?.equipmentTypeName.substring(0, 10)}..)`;
    this.equipmentTypeSelected = [equipmentType]; // setea el Tipo de Equipo seleccionado para que se pueda crear un nuevo funcionamiento
    this.searchBehaviours = true; // setea la búsqueda en true para que la tabla muestre la data o mensajes al usuario

    // hace la búsqueda en el servicio y la guarda en una variable
    let match = this._maintainersService.getBehaviours(equipmentType.equipmentTypeId);

    // si NO hay coindicencias
    if (match === null) {
      this.behavioursDataSource = ['']; // asocia un registro vacío para que lo capte la tabla del HTML
      this.dataRowHasData = false;  // esta variable en FALSE mostrará el mensaje "NO hay coincidencias"
    }

    // si HAY coincidencias
    else {
      this.behavioursDataSource = match; // asocia coincidencias en la variable de búsqueda asociada a la tabla del HTML
      this.dataRowHasData = true;    // esta variable en TRUE eliminará el mensaje "NO hay coincidencias"
    }
  }

  // Agregar un Tipo de Equipo
  addEquipmentType() {
    // llama al servicio, pide la función addEquipmentType y le envía un objeto con los datos del nuevo Tipo de Equipo
    this._maintainersService.addEquipmentType(
      {
        equipmentTypeId: this.equipmentTypeCode.value, // valor captado del input mediante el formControl
        equipmentTypeName: this.equipmentTypeName.value, // valor captado del input mediante el formControl
        equipmentTypeDescription: this.equipmentTypeDescription.value // valor captado del input mediante el formControl
      }
    );
    this.equipmentTypeCode.reset(); // vacía el input para la próxima búsqueda
    this.equipmentTypeName.reset(); // vacía el input para la próxima búsqueda
    this.equipmentTypeDescription.reset(); // vacía el input para la próxima búsqueda
    // a traves del servicio, actualiza la tabla de Tipos de Equipo
    this.equipmentTypesDataSource = [];
    this.equipmentTypesDataSource = this.getEquipmentTypes();
    this.closeDrawer(); // cierra el panel lateral
  }

  //Agregar un funcionamiento
  addBehaviour() {
    // llama al servicio, pide la función addBehaviour y le envía un objeto con los datos del nuevo funcionamiento
    this._maintainersService.addBehaviour(
      {
        behaviourId: this.behaviourCode.value, // valor captado del input mediante el formControl
        behaviourName: this.behaviourName.value, // valor captado del input mediante el formControl
        behaviourNormalState: this.behaviourNormalState.value === true ? true : false, //
        relatedEquipmentTypeId: this.equipmentTypeSelected[0].equipmentTypeId,
        equipmentTypeName: this.equipmentTypeSelected[0].equipmentTypeName // valor captado previamente por la función getBehaviour
      }
    );
    // tras agregar el nuevo registro, llama a la función getBehaviours
    this.getBehaviours(this.equipmentTypeSelected[0]); // para que vuelva a renderizar la info de los funcionamientos en la tabla HTML
    this.behaviourCode.reset(); // vacía el input para la próxima búsqueda
    this.behaviourName.reset(); // vacía el input para la próxima búsqueda
    this.behaviourNormalState.reset(); // vacía el input para la próxima búsqueda
    this.closeDrawer(); // cierra el panel lateral
  }

  // setear modo lectura en panel de funcionamientos
  setReadOnlyMode(editMode?: boolean, dataRow?: Behaviour): void {
    this.selectedRowTableTwo = dataRow;
    this.readOnlyMode = !this.readOnlyMode;
    this.setBehaviour(editMode, dataRow);
  }

  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel
    this.equipmentTypePanel = false; // oculta el contenido del panel asociado al Tipo de Equipo
    this.behaviourPanel = false; // oculta el contenido del panel asociado a los funcionamientos
    this.editMode = false; // setea la edición en false por si a continuación es necesario mostrar en el panel la creación de una entidad
    this.readOnlyMode = false; // setea el modo lectura en falso
  }
  deleteExample(dataRow?: EquipmentType) {
    this.selectedRow = dataRow
    this.selectedRowTableTwo = dataRow;
    console.log('Eliminar fila')
  }
}
