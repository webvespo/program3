import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dialogo-mascotas',
  templateUrl: './dialogo-mascotas.component.html',
  styleUrls: ['./dialogo-mascotas.component.css']
})
export class DialogoMascotasComponent implements OnInit {
  ingresoDatos: any;
  editarData: any;
  id: any;
  usuarioIdCombo: any;
  //selectOpt: any;
  comboUsuariosList: any;
  selectComboUsuario: any = {
    id: "",
    nombre: ""
  };


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<DialogoMascotasComponent>,
    private buildr: FormBuilder,
    private _service: MascotaService,
    private _usuarioService: UsuarioService
  ) { }


  ngOnInit(): void {
    this._usuarioService.getUsuarios().subscribe((combo: any) => {
      this.comboUsuariosList = combo;
    })
    this.ingresoDatos = this.data;
    if (this.ingresoDatos.code > 0) {
      this.configDialogoData(this.ingresoDatos.code);
    }
    else {
      this.configDialogoDataEmpty();
    }
  }

  configDialogoData(code: any) {
    this._service.getMascota(code).subscribe(item => {
      this.editarData = item;
      this.miFormulario.setValue({
        nombre: this.editarData.nombre,
        color: this.editarData.color,
        edad: this.editarData.edad,
        peso: this.editarData.peso,
        fechaCreacion: this.editarData.fechaCreacion,
        usuarioId: this.editarData.nombreUsuario.id,
        usuario: {
          id: this.editarData.nombreUsuario.id,
          nombreUsuario: this.editarData.nombreUsuario.nombreUsuario,
          nombre: this.editarData.nombreUsuario.nombre,
          apellido: this.editarData.nombreUsuario.apellido,
          sexo: this.editarData.nombreUsuario.sexo
        },
        //usuario: this.editarData.nombreUsuario.nombreUsuario,
        razaId: this.editarData.raza.id,
        raza: this.editarData.raza.nombre
      })
    })
  }

  public fechaHoy = new Date();
  configDialogoDataEmpty() {
    this.miFormulario = this.buildr.group({
      nombre: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      color: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      edad: new FormControl((''), [Validators.required]),
      peso: new FormControl((''), [Validators.required]),
      fechaCreacion: new FormControl(''),
      usuarioId: new FormControl(''),
      usuario: {
        id: new FormControl('')!,
        nombreUsuario: new FormControl('')!,
        nombre: new FormControl('')!,
        apellido: new FormControl('')!,
        sexo: new FormControl('')!,
      },
      //usuario: new FormControl(''),
      razaId: new FormControl(''),
      raza: new FormControl((''), [Validators.required, Validators.pattern('[a-zA-Z]+$')])
    })
  }

  cerrarDialogo() { this.ref.close(); }

  public miFormulario = this.buildr.group({
    nombre: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
    color: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
    edad: new FormControl(this.buildr.control(''), [Validators.required]),
    peso: new FormControl(this.buildr.control(''), [Validators.required]),
    fechaCreacion: new FormControl('')!,
    usuarioId: [this.buildr.control(''), Validators.required],
    usuario: {
      id: new FormControl('')!,
      nombreUsuario: new FormControl('')!,
      nombre: new FormControl('')!,
      apellido: new FormControl('')!,
      sexo: new FormControl('')!,
    },
    razaId: new FormControl('')!,
    raza: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
  });

  public get formMiFormulario(): any {
    return this.miFormulario.value;
  }

  guardarCambios() {
    if (this.id != 0) {
      if (this.ingresoDatos.boton == "Eliminar") {
        this.eliminarMascota();
      }
      const editaDatosMascota: Mascota = {
        id: 0,
        nombre: this.formMiFormulario.nombre,
        color: this.formMiFormulario.color,
        edad: this.formMiFormulario.edad,
        peso: this.formMiFormulario.peso,
        fechaCreacion: this.fechaHoy,
        usuarioId: 0,
        usuario: {
          id: this.formMiFormulario.usuario.id,
          nombreUsuario: this.formMiFormulario.usuario.nombreUsuario,
          nombre: this.formMiFormulario.usuario.nombre,
          apellido: this.formMiFormulario.usuario.apellido,
          sexo: this.formMiFormulario.usuario.sexo
        },
        razaId: 0,
        raza: {
          id: this.formMiFormulario.raza.id,
          nombre: this.formMiFormulario.raza.nombre
        }
      };

      const creaNuevaMascota: Mascota = {
        id: 0,
        nombre: this.formMiFormulario.nombre,
        color: this.formMiFormulario.color,
        edad: this.formMiFormulario.edad,
        peso: this.formMiFormulario.peso,
        fechaCreacion: this.fechaHoy,
        usuarioId: 0,
        usuario: {
          id: this.formMiFormulario.usuario.id,
          nombreUsuario: this.formMiFormulario.usuario.nombreUsuario,
          nombre: this.formMiFormulario.usuario.nombre,
          apellido: this.formMiFormulario.usuario.apellido,
          sexo: this.formMiFormulario.usuario.sexo
        },
        razaId: 0,
        raza: {
          id: this.formMiFormulario.raza.id,
          nombre: this.formMiFormulario.raza.nombre
        }
      };


      if (this.ingresoDatos.boton == 'Editar') {
        editaDatosMascota.id = this.ingresoDatos.code;
        this.editarMascota(this.ingresoDatos.code, editaDatosMascota);
      }
      else {
        this.agregarMascota(creaNuevaMascota);
      }
    }
  }


  editarMascota(code: any, editaDatosMascota: Mascota) {
    this._service.updateMascota(code, editaDatosMascota).subscribe(() => {
      this.cerrarDialogo();
      console.log(code);
    })
  }

  agregarMascota(mascota: Mascota) {
    this._service.addMascota(mascota).subscribe(data => {
      this.cerrarDialogo();
    })
  }

  eliminarMascota() {
    this._service.deleteMascota(this.ingresoDatos.code).subscribe(res => {
      this.cerrarDialogo();
    })
  }


}