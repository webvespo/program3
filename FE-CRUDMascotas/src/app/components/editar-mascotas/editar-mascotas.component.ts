import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrls: ['./editar-mascotas.component.css']
})


export class EditarMascotasComponent implements OnInit {
  comboUsuariosList: any;
  

  constructor(private _usuarioService: UsuarioService){
    
  }
  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((combo:any)=>{
      this.comboUsuariosList=combo;
    })
  }

/*   dataSource: string[] = []
  //datasource = new FormsModule;
  constructor(private _usuarioService: UsuarioService, @Inject(MAT_DIALOG_DATA) public dataComboUsuario: any)
    {
      this.cargarUsuarios();
    }

  cargarUsuarios() {
    this._usuarioService.getUsuarios().subscribe(dataComboUsuario => {
      this.dataSource.data = dataComboUsuario;
    }, error => {
      alert('Opss ocurrio un error');
    }
    )
  } */

}
