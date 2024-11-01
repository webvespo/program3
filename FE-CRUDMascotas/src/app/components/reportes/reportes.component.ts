import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';

import { Raza } from 'src/app/interfaces/Raza';
import { Propietario } from 'src/app/interfaces/propietario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  sexoSeleccionado!: string;
  showPersonas: boolean = false;
  showMascotas: boolean = false;
  reportePorSexoPersonas: boolean = false;
  reportePorRazaMascota: boolean = false;

  selectSexo: string[] = [
    'Male',
    'Female',
    'Otro'
  ]

  razaList: Raza[] = [ // Agregar nuevas razas acá
    { nombre: 'Pitbull' },
    { nombre: 'Golden Retriever' },
    { nombre: 'Salchicha' },
    { nombre: 'Caniche' },
  ]
  // Tabla Propietarios
  displayedColumns: string[] = ['nombreusuario', 'nombre', 'apellido', 'sexo'];
  dataSource1 = new MatTableDataSource<Propietario>();
  apiResponse: any = [];
  // Tabla Raza Mascotas
  displayedColumns2: string[] = ['nombre','edad','Raza','color','peso','propietario'];
  dataSource2 = new MatTableDataSource<Mascota>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private _usuarioService: UsuarioService,
    private _mascotaService: MascotaService, 
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerMascotas();
  }

  filtrarPor(){

  }

  filterData($event: any){
    this.dataSource1.filter = $event.target.value;
  }

  onChange1($event: any) {
    let filteredData = _.filter(this.apiResponse, (item) => {
      return item.sexo.toLowerCase() == $event.value.toLowerCase();
    })
    this.dataSource1 = new MatTableDataSource(filteredData);
  }

  cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe((data: any) =>{
      this.apiResponse = data;
      this.dataSource1 = new MatTableDataSource(data);
    }, error => {
      alert('Opss ocurrio un error');
    }
    )
  }
  onChangeRaza($event: any) {
    let filteredData2 = _.filter(this.apiResponse, (item) => {
      return item.raza.nombre.toLowerCase() == $event.value.trim().toLowerCase();
    })
    this.dataSource2 = new MatTableDataSource(filteredData2);
  }

  obtenerMascotas() {
    this._mascotaService.getMascotas().subscribe(data => {
      this.apiResponse = data;
      this.dataSource2 = new MatTableDataSource(data);
      }, error => {
          alert('Opss ocurrio un error');
        }
        )
  }
  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    if (this.dataSource1.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

 


}

