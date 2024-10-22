import { Raza } from './Raza';
import { Propietario } from './propietario';
export interface Mascota {
  id: number;
  nombre: string;
  color: string;
  edad: number;
  peso: number;
  fechaCreacion?: Date;
  NombreUsuario: Propietario;
  raza: Raza;
}
