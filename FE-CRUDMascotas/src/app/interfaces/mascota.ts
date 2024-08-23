import { Raza } from './Raza';
import { Propietario } from './propietario';
export interface Mascota {
  id: number;
  nombre: string;
  color: string;
  edad: number;
  peso: number;
  fechaCreacion?: Date;
  usuarioId: number;
  usuario: Propietario;
  //nombreUsuario: Propietario;
 // usuarioId: number;
 // usuario: Usuario;
  razaId: number;
  raza: Raza;
}
