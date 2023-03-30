import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {
  loading: boolean = false;
  form: FormGroup
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:['', Validators.required],
      raza:['', Validators.required],
      color:['', Validators.required],
      edad:['', Validators.required],
      peso:['', Validators.required],
    })

  }

  ngOnInit(): void {

  }
  agregarMascota() {
    //console.log(this.form)
    //const nombre = this.form.get('nombre')?.value;
    //const nombre = this.form.value.nombre;

    const mascota: Mascota = {
      nombre: this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso
    }
    console.log(mascota)
  }

}
