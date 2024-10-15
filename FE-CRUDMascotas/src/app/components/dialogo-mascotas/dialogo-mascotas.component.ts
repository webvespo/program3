import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import { UsuarioService } from '../../services/usuario.service';
import { Raza } from 'src/app/interfaces/Raza';
import { Usuario } from 'src/app/interfaces/Usuario';

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
  comboUsuariosList: any;
  razaSeleccionada: any;
  datosPropietario: any;
  razaList: Raza[] = [
    { id: 1, nombre: 'Pitbull' },
    { id: 2, nombre: 'Ovejero Alemán' },
    { id: 3, nombre: 'Golden' },
    { id: 4, nombre: 'Salchicha' },
    { id: 5, nombre: 'Caniche' },
  ]

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
        idUsuario: this.editarData.nombreUsuario.id,
        idRaza: this.editarData.raza.id,
        nombre: this.editarData.nombre,
        color: this.editarData.color,
        edad: this.editarData.edad,
        peso: this.editarData.peso,
        fechaCreacion: this.editarData.fechaCreacion,
        NombreUsuario: {
          apellido: this.editarData.nombreUsuario.apellido,
          id: this.editarData.nombreUsuario.id,
          nombre: this.editarData.nombreUsuario.nombre,
          nombreUsuario: this.editarData.nombreUsuario.nombreUsuario,
          sexo: this.editarData.nombreUsuario.sexo
        },
        raza: {
          id: this.editarData.raza.id,
          nombre: this.editarData.raza.nombre
        }
      })
    })
  }

  public fechaHoy = new Date();
  configDialogoDataEmpty() {
    this.miFormulario = this.buildr.group({
      idUsuario: new FormControl(''),
      idRaza: new FormControl(''),
      nombre: new FormControl((''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
      color: new FormControl((''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
      edad: new FormControl((''), [Validators.required]),
      peso: new FormControl((''), [Validators.required]),
      fechaCreacion: new FormControl(''),
      NombreUsuario: new FormControl({
        apellido: new FormControl('')!,
        id: new FormControl('')!,
        nombre: new FormControl('')!,
        nombreUsuario: new FormControl('')!,
        sexo: new FormControl('')!,
      })!,
      raza: new FormControl({
        id: new FormControl('')!,
        nombre: new FormControl('')!,
      })
    })
  }

  cerrarDialogo() { this.ref.close(); }

  public miFormulario = this.buildr.group({
    idUsuario: new FormControl(''),
    idRaza: new FormControl(''),
    nombre: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
    color: new FormControl(this.buildr.control(''), [Validators.required, Validators.pattern('([a-zA-Z]\\s*[a-zA-Z]*)+[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$')]),
    edad: new FormControl(this.buildr.control(''), [Validators.required]),
    peso: new FormControl(this.buildr.control(''), [Validators.required]),
    fechaCreacion: new FormControl('')!,
    NombreUsuario: new FormControl({
      apellido: new FormControl('')!,
      id: new FormControl('')!,
      nombre: new FormControl('')!,
      nombreUsuario: new FormControl('')!,
      sexo: new FormControl('')!,
    })!,
    raza: new FormControl({
      id: new FormControl('')!,
      nombre: new FormControl('')!,
    })
  });

  public get formMiFormulario(): any {
    return this.miFormulario.value;
  }

  obtenerNombreRazaSeleccionada() {
    const razaSeleccionada = this.razaList.find(listarRazas => listarRazas.id === this.formMiFormulario.idRaza);
    return razaSeleccionada ? razaSeleccionada.nombre : '';
  }

  obtenerDatosUsuarioPorId(idUsuario: any) {
    this._usuarioService.obtenerUsuarioPorID(this.formMiFormulario.idUsuario).subscribe(item => {
      this.datosPropietario = item;
    })
  }



  guardarCambios() {
    if (this.id != 0) {
      if (this.ingresoDatos.boton == "Eliminar") {
        this.eliminarMascota();
      }
      const editaDatosMascota: Mascota = {
        id: this.ingresoDatos.code,
        nombre: this.formMiFormulario.nombre,
        color: this.formMiFormulario.color,
        edad: this.formMiFormulario.edad,
        peso: this.formMiFormulario.peso,
        fechaCreacion: this.fechaHoy,
        NombreUsuario: {
          apellido: this.formMiFormulario.NombreUsuario.apellido,
          id: this.formMiFormulario.idUsuario,
          nombre: this.formMiFormulario.NombreUsuario.nombre,
          nombreUsuario: this.formMiFormulario.NombreUsuario.nombreUsuario,
          sexo: this.formMiFormulario.NombreUsuario.sexo
        },
        raza: {
          id: this.formMiFormulario.idRaza,
          nombre: this.obtenerNombreRazaSeleccionada()
        }
      };

      const creaNuevaMascota: Mascota = {
        id: 0,
        nombre: this.formMiFormulario.nombre,
        color: this.formMiFormulario.color,
        edad: this.formMiFormulario.edad,
        peso: this.formMiFormulario.peso,
        fechaCreacion: this.fechaHoy,
        NombreUsuario: {
          apellido: this.formMiFormulario.NombreUsuario.apellido,
          id: this.formMiFormulario.NombreUsuario.id,
          nombre: this.formMiFormulario.NombreUsuario.nombre,
          nombreUsuario: this.formMiFormulario.NombreUsuario.nombreUsuario,
          sexo: this.formMiFormulario.NombreUsuario.sexo
        },
        raza: {
          id: this.formMiFormulario.idRaza,
          nombre: this.obtenerNombreRazaSeleccionada()
        }
      };

      if (this.ingresoDatos.boton == 'Editar') {
        this.editarMascota(this.ingresoDatos.code, editaDatosMascota);
      } else {
        this.agregarMascota(creaNuevaMascota);
      }
    }
  }

  editarMascota(code: any, editaDatosMascota: Mascota) {
    this._service.updateMascota(code, editaDatosMascota).subscribe(() => {
      this.cerrarDialogo();
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
