import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MaintainersService } from '../../services/maintainers.service';
import { Group, Mobile } from '../../interface/maintainers';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-groups-mobiles',
  templateUrl: './groups-mobiles.component.html',
  styleUrls: ['./groups-mobiles.component.css']
})
export class GroupsMobilesComponent implements OnInit {

  @ViewChild('drawer')
  public drawer!: MatDrawer;

  openedFiltersMenu: boolean = false;

  editMode: boolean = false;

  groupsMobilesPanel: boolean = false;
  duplicateMobilesPanel: boolean = false;
  mobilesPanel: boolean = false;

  colsGroupsMobiles!: any[];

  colsMobiles!: any[];

  groupFilterSelected: object[] = [];
  mobileSelected: object[] = [];
  groupSelected: object[] = [];


  selected: any;
  selectedTableTwo: any;

  selectedRow: any;
  selectedRowTableTwo: any;
  groupsMobilesDate = new FormControl();
  originMobilesDate = new FormControl();
  duplicateMobilesDate = new FormControl();

  mobileId = new FormControl();
  mobileDescription = new FormControl();
  mobileState = new FormControl();

  selectGroups: IDropdownSettings = {
    singleSelection: true,
    idField: 'groupId',
    textField: 'groupName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  selectMobiles: IDropdownSettings = {
    singleSelection: true,
    idField: 'mobileId',
    textField: 'description',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  mobilesDataSource: Mobile[] = [];

  groupsMobilesDataSource: Group[] = [];

  selectGroupsMobiles: Group[] = [];
  mobilesSelect: Mobile[] = [];

  handleFiltersMenu() {
    this.openedFiltersMenu = !this.openedFiltersMenu;
  }

  constructor(
    public _maintainersService: MaintainersService,
  ) { }


  ngOnInit(): void {

    this.colsGroupsMobiles = [
      { field: 'groupDate', header: 'Fecha', sort: true, align: 'align-default' },
      { field: 'groupName', header: 'Grupo', sort: true, align: 'align-default' },
      { field: 'relatedMobileId', header: 'Móvil', sort: true, align: 'align-default' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' }
    ];

    this.colsMobiles = [
      { field: 'mobileId', header: 'Id Interno', sort: true, align: 'align-default' },
      { field: 'description', header: 'Descripción', sort: true, align: 'align-default' },
      { field: 'state', header: 'Estado', sort: true, align: 'align-center' },
      { field: 'actions', header: 'Acciones', sort: false, align: 'align-center fit-column' }
    ];

    this.mobilesDataSource = this._maintainersService.getMobiles();

    this.groupsMobilesDataSource = this._maintainersService.getGroups();

  }


  setGroupsMobiles(editMode?: boolean, dataRow?: Group): void {
    this.selectedRow = dataRow;
    // para modo creación
    if (!editMode) {
      this.mobileSelected = [];
      this.groupSelected = [];
      this.groupsMobilesDate.reset();
    }
    // para modo edición
    else {
      this.editMode = true;
      this.mobileSelected = [{ mobileId: dataRow?.relatedMobileId, description: dataRow?.relatedMobileId }];
      this.groupSelected = [{ groupId: dataRow?.groupId, groupName: dataRow?.groupName }];
      this.groupsMobilesDate.setValue(dataRow?.groupDate)
    }

    this.duplicateMobilesPanel = false;
    this.mobilesPanel = false;
    if (!this.groupsMobilesPanel) {
      this.drawer.toggle();
    }
    this.groupsMobilesPanel = true;
  }

  setDuplicateMobiles(dataRow?: Group): void {
    this.selectedRow = dataRow;
    this.originMobilesDate.setValue(dataRow?.groupDate);
    this.groupsMobilesPanel = false;
    this.mobilesPanel = false;
    if (!this.duplicateMobilesPanel) {
      this.drawer.toggle();
    }
    this.duplicateMobilesPanel = true;
  }

  setMobiles(dataRow?: Mobile): void {
    this.selectedRowTableTwo = dataRow;
    if (dataRow) {
      this.editMode = true;
      this.mobileId.setValue(dataRow?.mobileId);
      this.mobileDescription.setValue(dataRow?.description);
      this.mobileState.setValue(dataRow?.state);
    }
    else {
      this.editMode = false;
      this.mobileId.reset();
      this.mobileDescription.reset();
      this.mobileState.reset();
    }

    this.duplicateMobilesPanel = false;
    this.groupsMobilesPanel = false;
    if (!this.mobilesPanel) {
      this.drawer.toggle();
    }
    this.mobilesPanel = true;
  }


  // cierre del panel lateral
  closeDrawer(): void {
    this.drawer.toggle();
    this.groupsMobilesPanel = false;
    this.mobilesPanel = false;
    this.editMode = false;
  }

  deleteExample(dataRow?: Group) {
    this.selectedRow = dataRow;
    this.selectedRowTableTwo = dataRow
    console.log('Eliminar fila')
  }
}
