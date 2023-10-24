import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  sexo: any[] = ['Masculino','Femenino']
  form: FormGroup

  constructor(private fb: FormBuilder, 
              private _usuarioService: UsuarioService,
              private router: Router,
              private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      usuario:['',Validators.required],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      sexo:['',Validators.required],
    })
  }

  agregarUsuario(){
    console.log(this.form);

    const user: Usuario = {
      id: this.form.value.name,
      nombre: this.form.value.position,
      //apellido: this.form.value.apellido,
      //sexo: this.form.value.sexo,
    }
    console.log(user);
   // this._usuarioService.agregarUsuario(user);
    this.router.navigate(['/dashboard/usuarios'])

    this._snackBar.open('Usuario agregado correctamente.', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })

  }

}
