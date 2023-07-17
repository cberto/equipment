import { Component } from '@angular/core';

export interface UserData {
  username: string;
  rol: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userData: UserData = {
    username: 'Admin',
    rol: 'Administrador'
  }

  constructor() { }

}
