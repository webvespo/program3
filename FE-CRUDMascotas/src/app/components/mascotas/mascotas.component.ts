import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { DialogoMascotasComponent } from '../dialogo-mascotas/dialogo-mascotas.component';
import { EditarMascotasComponent } from '../editar-mascotas/editar-mascotas.component';


@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre','edad','Raza','color','peso','Propietario','acciones'];
  dataSource = new MatTableDataSource<Mascota>();
  isEditMode = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, 
    private _mascotaService: MascotaService, 
    private dialogo: MatDialog){}

  ngOnInit(): void {
    this.obtenerMascotas();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  obtenerMascotas() {
    this._mascotaService.getMascotas().subscribe(data => {
      this.dataSource.data = data;
      }, error => {
          alert('Opss ocurrio un error');
        }
        )
  }

  onEdit(){
    this.isEditMode=true;
  }

  onCancel(){
    this.isEditMode=false;
  }

  editarMascota(code: any) {
    this.abrirDialogo(code, 'Editar Mascota', 'Editar');
  }

  agregarMascota() {
    this.abrirDialogo(0, 'Agregar Mascota', 'Agregar');
  }

  eliminarMascota(code: any) {
    this.abrirDialogo(code, 'Confirmar ELIMINAR', 'Eliminar');
  }

  abrirDialogo(code: any, title: any, boton: any) {
    var _popup = this.dialogo.open(DialogoMascotasComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '750ms',
      width: '40%',
      data: {
        title: title,
        code: code,
        boton: boton
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.obtenerMascotas();
    })
  }
  abrirDialogo2(code:any,title:any, boton:any){
    var _popup = this.dialogo.open(EditarMascotasComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '750ms',
      width: '40%',
      data: {
        title: title,
        code: code,
        boton: boton
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.obtenerMascotas();
    })
  }

}
