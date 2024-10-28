import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { Raza } from 'src/app/interfaces/Raza';
import { Propietario } from 'src/app/interfaces/propietario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  showPersonas:boolean = false;
  showMascotas:boolean = false;
  reportePorSexoPersonas:boolean = false;
  reportePorRazaMascota:boolean = false;
  selectSexo: string[] = [
    'Male',
    'Female',
    'Otro'
  ]
  public verMale:string="";

  razaList: Raza[] = [ // Agregar nuevas razas acá
    { nombre: 'Pitbull' },
    { nombre: 'Golden Retriever' },
    { nombre: 'Salchicha' },
    { nombre: 'Caniche' },
  ]

  displayedColumns: string[] = ['nombreusuario', 'nombre', 'apellido', 'sexo'];
  dataSource = new MatTableDataSource<Propietario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private _usuarioService: UsuarioService,
    
  ){}


  ngOnInit(): void {
    this.cargarUsuarios();
  }
  
  cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
      this.dataSource.data = data;
    }, error => {
      alert('Opss ocurrio un error');
    }
    )
  }




  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }
}

