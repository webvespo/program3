import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dueño } from 'src/app/interfaces/dueño';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogoComponent } from '../dialogo/dialogo.component';

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} */


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreusuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Dueño>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private _snackBar: MatSnackBar, private _usuarioService: UsuarioService, private dialogo: MatDialog) {
    this.cargarUsuarios();
  }

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

    //this.ELEMENT_DATA = this._usuarioService.getUsuario();
    // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarUsuario(code: any) {
    this.abrirDialogo(code, 'Editar Usuario','Guardar');
  }

  agregarUsuario() {
    this.abrirDialogo(0, 'Agregar Usuario', 'Agregar');
  }

  eliminarUsuario(code: any) {
    this.abrirDialogo(code, 'Confirmar ELIMINAR','Eliminar');
  }
  deleteUsuario(index: number) {
    //console.log(index);
    this._usuarioService.deleteUsuario(index);
    this.cargarUsuarios();

    this._snackBar.open('Usuario eliminado correctamente.', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  abrirDialogo(code: any, title: any, boton:any) {
    //  console.log(id);
    var _popup = this.dialogo.open(DialogoComponent, {
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
      //console.log(item);
      this.cargarUsuarios();
    })
  }

}


