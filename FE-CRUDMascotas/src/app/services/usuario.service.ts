import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propietario } from '../interfaces/propietario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = 'https://localhost:7261/';
  private myApiUrl: string = 'api/Usuario/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  getUsuario(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  addMUsuario(usuario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }
  updateUsuario(id: number, usuario: Propietario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario);
  }

  EditarUsuario(code: number, usuario: Propietario): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${code}`, usuario);
  }

  obtenerUsuarioPorID(code: any) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${code}`);
  }

  eliminarUsuarioPorID(data: any) {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${data}`);
  }
}
