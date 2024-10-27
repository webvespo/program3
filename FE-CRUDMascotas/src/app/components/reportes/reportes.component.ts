import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { Raza } from 'src/app/interfaces/Raza';
import { Propietario } from 'src/app/interfaces/propietario';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
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

  displayedColumns: string[] = ['nombreusuario', 'nombre', 'apellido', 'sexo'];
  dataSource = new MatTableDataSource<Propietario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;


  ngOnInit(): void {
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }


}

