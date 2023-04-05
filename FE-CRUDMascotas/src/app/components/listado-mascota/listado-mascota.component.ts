import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';



/* const listMascotas: Mascota[] = [
  {nombre:'Ciro',edad:3,raza:'Golden',color:'Dorado',peso:20}
];
 */


@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['nombre','edad','raza','color','peso','acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, 
    private _mascotaService:MascotaService){}
  ngOnInit(): void {
    this.obtenerMascotas();
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
    this.paginator._intl.itemsPerPageLabel='Items por página';
    }
  }
/*   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel='Items por página';
    this.dataSource.sort = this.sort;
  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerMascotas() {
    this.loading=true;
    this._mascotaService.getMascotas().subscribe(data => {
      this.loading=false;
      this.dataSource.data = data;
        }, error => {
          this.loading = false;
          alert('Opss ocurrio un error');
        }
        )
  }

  eliminarMascota() {
    this.loading=true;
    setTimeout(() => {
      this.loading=false;
      this._snackBar.open('Se eliminó la mascota', '',{
        duration: 3000,
        horizontalPosition: 'right',
      });
    }, 3000);
    
  }
}
