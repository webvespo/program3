import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  filtroPersonas: string[] = [
    'Masculino',
    'Femenino',
    'Otro',
    'Todos'
  ]

  filtroMascotas: string[] = [
    'Perro',
    'Gato',
    'Todos'
  ]

  ngOnInit(): void {
    
  }



}

