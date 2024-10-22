import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Propietario } from 'src/app/interfaces/propietario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {
  selectSexo: string[] = [
    'Male',
    'Female',
    'Otro'
  ]

  ingresoDatos: any;
  editarData: any;
  id: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DialogoComponent>,
    private buildr: FormBuilder,
    private _service: UsuarioService) {  }


  ngOnInit(): void {
    this.ingresoDatos = this.data;
    if (this.ingresoDatos.code > 0) {
      this.configDialogoData(this.ingresoDatos.code)
    }
    else
    {
      this.configDialogoDataEmpty();
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
  configDialogoDataEmpty() {
    this.miFormulario = this.buildr.group({
      nombreUsuario: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      nombre: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      apellido: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      sexo: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    })
  }

  cerrarDialogo() { this.ref.close(); }


  public miFormulario = this.buildr.group({

    nombreUsuario: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    nombre: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    apellido: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    sexo: [this.buildr.control(''), Validators.required],
  });

  public get formMiFormulario() {
    return this.miFormulario.value;
  }

  guardarCambios() {
    if (this.id != 0) {
      if (this.ingresoDatos.boton == "Eliminar") {
        this.eliminarUsuario();
      }
      const editaDatosPersona: Propietario = {
        id: 0,
        nombreUsuario: this.formMiFormulario.nombreUsuario!,
        nombre: this.formMiFormulario.nombre!,
        apellido: this.formMiFormulario.apellido!,
        sexo: this.formMiFormulario.sexo!,
      };
      if (this.ingresoDatos.boton == 'Editar') {
      editaDatosPersona.id = this.ingresoDatos.code;
      this.editarUsuario2(editaDatosPersona.id, editaDatosPersona);
    }
    else
    {
     this.agregarUsuario(editaDatosPersona);
    }
  }

  }


editarUsuario2(code: number, usuario: Propietario) {
  this._service.EditarUsuario(code, usuario).subscribe(() => {
    this.cerrarDialogo();
  })
}

agregarUsuario(usuario: Propietario) {
  this._service.addMUsuario(usuario).subscribe(data => {
    this.cerrarDialogo();
  })
}

eliminarUsuario() {
  this._service.eliminarUsuarioPorID(this.ingresoDatos.code).subscribe(res => {
    this.cerrarDialogo();
  })
}
}

