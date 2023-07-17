import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaintainersModule } from "./maintainers/maintainers.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { ModalModule } from "./maintainers/crossroads/modal/modal.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaintainersModule,
    SharedModule,
    ModalModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes propios
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AsideComponent } from './components/aside/aside.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { ChartsModule } from 'ng2-charts';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CrossroadService } from './Services/crossroad.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ImagesLoadService } from './Services/images-load.service';
import { SharedModule } from '../../.history/src/app/shared/shared.module_20211130163819';
import { ModalModule } from './maintainers/crossroads/modal/modal.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    ComingSoonComponent,
    PageNotFoundComponent,
  ],
  imports: [

    //MODULOS EXTERNOS
    NgxPaginationModule,
    ChartsModule,
    LeafletModule,

    //MATERIAL & ANGULAR
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatTableModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [CrossroadService,
    ImagesLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }*/
