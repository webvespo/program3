import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Propietario } from 'src/app/interfaces/propietario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreusuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource<Propietario>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) Sort!: MatSort;

  constructor(private _usuarioService: UsuarioService,
    private dialogo: MatDialog) {
    // Si dejas esta linea en el constructor y en ngOnInit, te trae dos veces los datos
    // si queres ver las llamadas, entrá a network (F12) y fijate que hay dos llamadas a Usuario/
    // this.cargarUsuarios();
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
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarUsuario(code: any) {
    this.abrirDialogo(code, 'Editar Usuario', 'Editar');
  }

  agregarUsuario() {
    this.abrirDialogo(0, 'Agregar Usuario', 'Agregar');
  }

  eliminarUsuario(code: any) {
    this.abrirDialogo(code, 'Confirmar ELIMINAR', 'Eliminar');
  }

  abrirDialogo(code: any, title: any, boton: any) {
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
      this.cargarUsuarios();
    })
  }

}


