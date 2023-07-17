import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  openedFiltersMenu: boolean = false;

  // configuraciones del select simple sin filtros
  selectWithoutFilter: IDropdownSettings = {
    singleSelection: true,
    idField: 'communeId',
    textField: 'communeName',
    allowSearchFilter: true,
    searchPlaceholderText: 'Buscar...',
  };

  communeDataSource: object[] = [
    { communeId: 5, communeName: 'Laura' },
    { communeId: 6, communeName: 'Ivanna' }
  ]

  communeSelected: object[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleFiltersMenu() {
    this.openedFiltersMenu = !this.openedFiltersMenu;
  }

}
