import { Usuario } from './Usuario';
export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  color: string;
  edad: number;
  peso: number;
  fechaCreacion?: Date;
  usuarioId: number;
  usuario: Usuario;
}
