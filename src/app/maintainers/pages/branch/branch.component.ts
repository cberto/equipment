import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Branchs, Communes, Regions } from '../../interface/maintainers';
import { MaintainersService } from '../../services/maintainers.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer;
  colsBranch!: any[]; // array que contendrá la configuración del header de la tabla de Regiones

  colsCommunes!: any[];
  editMode: boolean = false;
  branchPanel: boolean = false;
  communePanel: boolean = false;
  branchCode = new FormControl();  // para enviar y recibir data de los inputs
  branchName = new FormControl();  // para enviar y recibir data de los inputs
  branchDirection = new FormControl();  // para enviar y recibir data de los inputs
  communeCode = new FormControl(); // para enviar y recibir data de los inputs
  communeName = new FormControl(); // para enviar y recibir data de los inputs
  code = new FormControl();
  disabled: boolean = true;

  branchDataSource: Branchs[] = [];
  regionDataSource: Regions[] = [];

  branchSelected: any = [];
  regionSelected: any = [];

  communesDataSource: any = [];
  searchCommunes: boolean = false;
  dataRowHasData: boolean = true;

  communeDataSource: Communes[] = [];
  communeSelected: object[] = [];

  selectCommunes: Communes[] = [];
  selectBranch: Branchs[] = [];

  selected: any;
  selectedTableTwo: any;

  selectedRow: any;
  selectedRowTableTwo: any;



  selectWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'regionId',
    textField: 'regionName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectCommuneWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'communeId',
    textField: 'communeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };



  constructor(
    public _maintainersService: MaintainersService
  ) { }

  ngOnInit() {
    this.code = new FormControl({ value: '', disabled: this.disabled })
    // a traves del servicio, setea la data inicial que llenará la tabla de Regiones
    this.branchDataSource = this._maintainersService.getBranchs();
    this.communeDataSource = this._maintainersService.getCommunes();
    this.regionDataSource = this._maintainersService.getRegions();
    // setea un registro vacío para mostrar inicialmente en la tabla de comunas
    this.communesDataSource = ['']

    // setea el header de las columnas en la tabla HTML de Comunas
    this.colsCommunes = [
      { field: 'communeId', header: 'Código', sort: true, align: 'align-center fit-column' }, // align: mismo nombre que clases de css
      { field: 'communeName', header: 'Nombre', sort: true, align: 'align-default' }, // en caso del align-default será a la izquierda
      { field: 'branchName', header: 'Región', sort: false, align: 'align-default' }, // si quiero a la derecha pongo align-end
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' }
    ];

    // setea el header de las columnas en la tabla HTML de Sucurdales
    this.colsBranch = [
      { field: 'branchId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'branchName', header: 'Nombre', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'branchDirection', header: 'Dirección', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];


  }

  // setea el panel lateral para la creación / edición de regiones
  setBranch(editMode?: boolean, dataRow?: Branchs): void {

    if (dataRow) {
      this.getCommunes(dataRow);
    }

    this.selectedRow = dataRow;
    // para modo creación
    if (!editMode) {
      this.branchCode.reset(); // limpia los inputs por si estaban cargados
      this.branchName.reset(); // limpia los inputs por si estaban cargados
      this.branchDirection.reset();
    }
    // para modo edición
    else {
      this.editMode = true;
      this.branchCode.setValue(dataRow?.branchId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.branchName.setValue(dataRow?.branchName); // carga los inputs con la data enviada desde la ROW de la tabla
      this.branchDirection.setValue(dataRow?.branchDirection);
    }
    this.communePanel = false; // habilita OCULTAR el contenido asociado a la comuna
    if (!this.branchPanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.branchPanel = true; // habilita mostrar el contenido asociado a la región
  }


  getCommunes(branch: Branchs) {
    this.selectedRow = branch;
    this.branchSelected = `(${branch.branchId} - ${branch.branchName.substring(0, 8)}...)`; // setea la región seleccionada para que el input tipo select pueda leerlo y se pueda crear una nueva comuna
    this.searchCommunes = true; // setea la búsqueda en true para que la tabla muestre la data o mensajes al usuario

    // hace la búsqueda en el servicio y la guarda en una variable
    let match = this._maintainersService.getCommunesByBranch(branch.branchName);

    // si NO hay coindicencias
    if (match === null) {
      this.communesDataSource = ['']; // asocia un registro vacío para que lo capte la tabla del HTML
      this.dataRowHasData = false;  // esta variable en FALSE mostrará el mensaje "NO hay coincidencias"
    }

    // si HAY coincidencias
    else {
      this.communesDataSource = match; // asocia coincidencias en la variable de búsqueda asociada a la tabla del HTML
      this.dataRowHasData = true;    // esta variable en TRUE eliminará el mensaje "NO hay coincidencias"
    }
  }


  setCommune(editMode?: boolean, dataRow?: Communes): void {
    // para modo creación
    if (!editMode) {
      this.communeCode.reset(); // limpia los inputs por si estaban cargados
      this.communeName.reset(); // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      this.editMode = true;
      this.communeCode.setValue(dataRow?.communeId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.communeName.setValue(dataRow?.communeName); // carga los inputs con la data enviada desde la ROW de la tabla
    }
    this.branchPanel = false; // habilita mostrar el contenido asociado a la comuna
    this.communePanel = true; // habilita OCULTAR el contenido asociado a la región
    this.drawer.toggle(); // ABRE el panel lateral
  }



  addBranch() {
    // llama al servicio, pide la función addRegion y le envía un objeto con los datos de la nueva región
    this._maintainersService.addBranch(
      {
        branchId: this.branchCode.value, // valor captado del input mediante el formControl
        branchName: this.branchName.value, // valor captado del input mediante el formControl
        branchDirection: this.branchDirection.value,
      }
    );
    this.branchCode.reset();
    this.branchName.reset();
    this.branchDirection.reset();
    this.closeDrawer(); // cierra el panel lateral
  }


  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel
    this.branchPanel = false; // oculta el contenido del panel asociado a la región
    this.communePanel = false; // oculta el contenido del panel asociado a la comuna
    this.editMode = false; // setea la edición en false por si a continuación es necesario mostrar en el panel la creación de una entidad
  }



  addCommune() {
    // llama al servicio, pide la función addCommune y le envía un objeto con los datos de la nueva comuna
    this._maintainersService.addCommuneBranch(
      {
        communeId: this.communeCode.value, // valor captado del input mediante el formControl
        communeName: this.communeName.value, // valor captado del input mediante el formControl
        branchName: this.branchSelected // valor captado previamente por la función getCommune
      }
    );
    // tras agregar el nuevo registro, llama a la función getCommunes
    this.getCommunes(this.branchSelected[0]); // para que vuelva a renderizar la info de las comunas en la tabla HTML
    this.communeCode.reset(); // vacía el input para la próxima búsqueda
    this.communeName.reset(); // vacía el input para la próxima búsqueda
    this.closeDrawer(); // cierra el panel lateral
  }

  deleteExample(dataRow?: Communes) {
    this.selectedRowTableTwo = dataRow;
    console.log('Eliminar fila')
  }

}
