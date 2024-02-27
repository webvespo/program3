import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Dueño } from 'src/app/interfaces/dueño';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {
  ingresoDatos: any;
  editarData: any;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DialogoComponent>,
    private buildr: FormBuilder,
    private _service: UsuarioService) { }

  ngOnInit(): void {
    this.ingresoDatos = this.data;
    if (this.ingresoDatos.code > 0) {
      this.configDialogoData(this.ingresoDatos.code)
    }
  }

  configDialogoData(code: any) {
    this._service.obtenerUsuarioPorID(code).subscribe(item => {
      this.editarData = item;
      this.miFormulario.setValue({
        nombreUsuario: this.editarData.nombreUsuario,
        nombre: this.editarData.nombre,
        apellido: this.editarData.apellido,
        sexo: this.editarData.sexo
      })
    })
  }
  
  cerrarDialogo() { this.ref.close(); }

  miFormulario = this.buildr.group({
    nombreUsuario: this.buildr.control(''),
    nombre: this.buildr.control(''),
    apellido: this.buildr.control(''),
    sexo: this.buildr.control(''),
  });

    tioEdit(){
    const editaDatosPersona: Dueño = {
      id: 0,
      nombreUsuario: this.editarData.nombreUsuario,
        nombre: this.editarData.nombre,
        apellido: this.editarData.apellido,
        sexo: this.editarData.sexo,
    };
  }


  guardarCambios() {
    if(this.id !=0) {
        // if (this.ingresoDatos.boton == 'Guardar') {
    //  this.editarUsuario(this.ingresoDatos.code,this.NewForm.setValu(this.miFormulario));
    //}
    
    if (this.ingresoDatos.boton == "Eliminar") {
      console.log(this.ingresoDatos.code);

      this.eliminarUsuario();
    }
    //if (this.ingresoDatos.boton == 'Editar') {
    //  this.tioEdit(this.ingresoDatos.code,this.miFormulario);
    //}

    } else {
      this.agregarUsuario(this.ingresoDatos.code);
    }
  }

  editarUsuario(code: any, usuario: Dueño) {
    this._service.EditarUsuario(code, usuario).subscribe(item => {
      this.editarData = item;
      usuario.id = this.editarData.code;
      this.miFormulario.setValue({
        nombreUsuario: this.editarData.nombreUsuario,
        nombre: this.editarData.nombre,
        apellido: this.editarData.apellido,
        sexo: this.editarData.sexo
      })
      this.cerrarDialogo();
    })
  }

  agregarUsuario(usuario: Dueño){
    this._service.addMUsuario(usuario).subscribe(data =>{
      this.cerrarDialogo();
    })
  }

  eliminarUsuario() {
    this._service.eliminarUsuarioPorID(this.ingresoDatos.code).subscribe(res => {
      this.cerrarDialogo();
    })
  }
}

