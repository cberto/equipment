import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Regions, Communes } from '../../interface/maintainers';

import { MatDrawer } from '@angular/material/sidenav/drawer';
import { MaintainersService } from '../../services/maintainers.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})


export class RegionsComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer; // para manejar el cierre del panel lateral

  searchCommunes: boolean = false; // según su estado muestra distinto contenido en tabla de comunas (data o mensajes al usuario)

  regionNameSelected: string = '';

  regionSelected: any = []; // contendrá una región para crear una nueva comuna y a su vez lo formatea para que el input tipo select pueda leerla

  editMode: boolean = false; // en TRUE habilitará mostrar el contenido del panel asociado a la EDICIÓN, en FALSE a la CREACIÓN

  regionPanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de región
  communePanel: boolean = false; // si su valor pasa a TRUE habilitará mostrar el contenido del panel de comuna

  dataRowHasData: boolean = true; // en TRUE muestra la data en la grilla de comuna, en FALSE muestra mensajes al usuario

  selected: any;
  selectedRow: any;

  selectedTableTwo: any;
  selectedRowTableTwo: any;

  code = new FormControl();
  disabled: boolean = true;




  selectedRegions: Regions[] = [];
  selectedProduct: any = [];


  // setea el panel lateral para la creación / edición de regiones
  setRegion(editMode?: boolean, dataRow?: Regions): void {

    if (dataRow) {
      this.getCommunes(dataRow);
    }
    this.selectedRow = dataRow;
    // para modo creación
    if (!editMode) {
      this.regionCode.reset(); // limpia los inputs por si estaban cargados
      this.regionName.reset(); // limpia los inputs por si estaban cargados
    }
    // para modo edición
    else {
      this.editMode = true;
      this.regionCode.setValue(dataRow?.regionId); // carga los inputs con la data enviada desde la ROW de la tabla
      this.regionName.setValue(dataRow?.regionName); // carga los inputs con la data enviada desde la ROW de la tabla
    }
    this.communePanel = false; // habilita OCULTAR el contenido asociado a la comuna
    if (!this.regionPanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.regionPanel = true; // habilita mostrar el contenido asociado a la región
  }

  // setea el panel lateral para la creación / edición de comunas
  setCommune(editMode?: boolean, dataRow?: Communes): void {

    this.selectedRowTableTwo = dataRow;
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
    this.regionPanel = false; // habilita mostrar el contenido asociado a la comuna
    if (!this.communePanel) {
      this.drawer.toggle(); // ABRE el panel lateral
    }
    this.communePanel = true; // habilita OCULTAR el contenido asociado a la región
  }

  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle(); // cierra el panel
    this.regionPanel = false; // oculta el contenido del panel asociado a la región
    this.communePanel = false; // oculta el contenido del panel asociado a la comuna
    this.editMode = false; // setea la edición en false por si a continuación es necesario mostrar en el panel la creación de una entidad
  }

  colsRegions!: any[]; // array que contendrá la configuración del header de la tabla de Regiones

  colsCommunes!: any[]; // array que contendrá la configuración del header de la tabla de Comunas

  regionsDataSource: Regions[] = [];  // array que contendrá la data a mostrar en la tabla de Regiones

  communesDataSource: any = []; // array que contendrá la data a mostrar en la tabla de Comunas

  // configuraciones del select simple sin filtro
  selectWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'regionId',
    textField: 'regionName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  constructor(
    // se hace uso del servicio
    public _maintainersService: MaintainersService
  ) { }

  ngOnInit() {
    this.code = new FormControl({ value: '', disabled: this.disabled })

    // a traves del servicio, setea la data inicial que llenará la tabla de Regiones
    this.regionsDataSource = this._maintainersService.getRegions();

    // setea un registro vacío para mostrar inicialmente en la tabla de comunas
    this.communesDataSource = ['']

    // setea el header de las columnas en la tabla HTML de Comunas
    this.colsCommunes = [
      { field: 'communeId', header: 'Código', sort: true, align: 'align-center fit-column' }, // align: mismo nombre que clases de css
      { field: 'communeName', header: 'Nombre', sort: true, align: 'align-default' }, // en caso del align-default será a la izquierda
      { field: 'regionName', header: 'Región', sort: false, align: 'align-default' }, // si quiero a la derecha pongo align-end
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' }
    ];

    // setea el header de las columnas en la tabla HTML de Regiones
    this.colsRegions = [
      { field: 'regionId', header: 'Código', sort: true, align: 'align-center fit-column' },  // clase fit column es para las
      { field: 'regionName', header: 'Nombre', sort: true, align: 'align-default' },          // columnas más angostas
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' } // por ejemplo código y acciones
    ];
  }

  regionCode = new FormControl();  // para enviar y recibir data de los inputs
  regionName = new FormControl();  // para enviar y recibir data de los inputs
  communeCode = new FormControl(); // para enviar y recibir data de los inputs
  communeName = new FormControl(); // para enviar y recibir data de los inputs

  getCommunes(region: Regions) {

    this.selectedRow = region;

    this.regionNameSelected = `(${region?.regionId} - ${region?.regionName.substring(0, 10)}..)`;
    this.regionSelected = [region]; // setea la región seleccionada para que el input tipo select pueda leerlo y se pueda crear una nueva comuna
    this.searchCommunes = true; // setea la búsqueda en true para que la tabla muestre la data o mensajes al usuario

    // hace la búsqueda en el servicio y la guarda en una variable
    let match = this._maintainersService.getCommunesByRegion(region.regionName);

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


  // Agregar una región
  addRegion() {
    // llama al servicio, pide la función addRegion y le envía un objeto con los datos de la nueva región
    this._maintainersService.addRegion(
      {
        regionId: this.regionCode.value, // valor captado del input mediante el formControl
        regionName: this.regionName.value // valor captado del input mediante el formControl
      }
    );
    this.regionCode.reset(); // vacía el input para la próxima búsqueda
    this.regionName.reset(); // vacía el input para la próxima búsqueda
    this.closeDrawer(); // cierra el panel lateral
  }

  // Agregar una comuna
  addCommune() {
    // llama al servicio, pide la función addCommune y le envía un objeto con los datos de la nueva comuna
    this._maintainersService.addCommune(
      {
        communeId: this.communeCode.value, // valor captado del input mediante el formControl
        communeName: this.communeName.value, // valor captado del input mediante el formControl
        regionName: this.regionSelected // valor captado previamente por la función getCommune
      }
    );
    // tras agregar el nuevo registro, llama a la función getCommunes
    this.getCommunes(this.regionSelected[0]); // para que vuelva a renderizar la info de las comunas en la tabla HTML
    this.communeCode.reset(); // vacía el input para la próxima búsqueda
    this.communeName.reset(); // vacía el input para la próxima búsqueda
    this.closeDrawer(); // cierra el panel lateral
  }

  deleteExample(dataRow?: Communes) {
    this.selectedRowTableTwo = dataRow
    console.log('Eliminar fila')
  }

}
