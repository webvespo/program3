import { Raza } from './Raza';
import { Dueño } from './dueño';
export interface Mascota {
  id: number;
  nombre: string;
  color: string;
  edad: number;
  peso: number;
  fechaCreacion?: Date;
  usuarioId: number;
  usuario: Dueño;
  //nombreUsuario: Dueño;
 // usuarioId: number;
 // usuario: Usuario;
  razaId: number;
  raza: Raza;
}
