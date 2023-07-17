import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {

  datetime: string = '';

  constructor() {
    setInterval(() => {
      this.datetime = new Date().toLocaleString();
    }, 1);
  }


}
