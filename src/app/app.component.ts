import { Component, HostListener, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { PerfectScrollbarDirective, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { async } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { PacienteEdicionComponent } from '../paciente-edicion/paciente-edicion.component';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import {Transformation} from '@cloudinary/url-gen';

// Import required actions.
import {thumbnail, scale} from '@cloudinary/url-gen/actions/resize';
import {byRadius} from '@cloudinary/url-gen/actions/roundCorners';
import {sepia} from '@cloudinary/url-gen/actions/effect';
import {source} from '@cloudinary/url-gen/actions/overlay';
import {opacity,brightness} from '@cloudinary/url-gen/actions/adjust';
import {byAngle} from '@cloudinary/url-gen/actions/rotate'

// Import required qualifiers.
import {image} from '@cloudinary/url-gen/qualifiers/source';
import {Position} from '@cloudinary/url-gen/qualifiers/position';
import {compass} from '@cloudinary/url-gen/qualifiers/gravity';
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import { DialogoPacienteComponent } from '../dialogo-paciente/dialogo-paciente.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../users/user.model';
import { DataRowOutlet } from '@angular/cdk/table';

export interface DialogData {
   name: string;
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [PacienteService]
})

export class PacientesComponent implements OnInit {

  name: string;

  public users: Paciente[] = [];
  public searchText: string;
  public page: any;
  public showSearch: boolean = false;
  public viewType: string = 'grid';
  public settings: Settings;
  public archivos: any = [];
  public previsualizacion: string;
  public pacVisual: String
  img: CloudinaryImage


  constructor(
    public appSettings: AppSettings,
    public router: Router,
    public usersService: PacienteService,
    private sanitizer: DomSanitizer,
    paciente: Paciente,
    public dialog: MatDialog

  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.getUsers();
  }


  public getUsers(): void {
    // this.users = null //for show spinner each time
    // this.usersService.listar().subscribe(users => users == users);
    this.usersService.listar().subscribe(data => {
      this.usersService.notificacion.subscribe(dato =>{});
     this.users = data
  });
  }

  public addUser(user: Paciente) {
    this.usersService.registrar(user).subscribe(user => this.getUsers());
  }

  public updateUser(user: Paciente) {
    this.usersService.modificar(user).subscribe(user => this.getUsers());
  }

  public deleteUser(user: Paciente) {
    this.usersService.eliminar(user.idPaciente).subscribe(user => this.getUsers());
  }

  public changeView(viewType) {
    this.viewType = viewType;
    this.showSearch = false;
  }

  public onPageChanged(event) {
    this.page = event;
    this.getUsers();
    //document.getElementById('main').scrollTop = 0;
  }


   openDialog(): void {
      let dialogRef = this.dialog.open(DialogoPacienteComponent, {
        width: '250px',
        data: {name: this.name},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });


  }

}




