import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dueño } from '../interfaces/dueño';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = 'https://localhost:7261/';
  private myApiUrl: string = 'api/Usuario/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Dueño[]> {
    return this.http.get<Dueño[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getUsuario(id: number): Observable<Dueño> {
    return this.http.get<Dueño>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  addMUsuario(usuario: Dueño): Observable<Dueño> {
    return this.http.post<Dueño>(`${this.myAppUrl}${this.myApiUrl}`, usuario);
  }
  updateUsuario(id: number, usuario: Dueño): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, usuario);
  }

  EditarUsuario(code: number, usuario: Dueño): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${code}`, usuario);
  }

  obtenerUsuarioPorID(code: any) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${code}`);
  }

  eliminarUsuarioPorID(data: any) {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${data}`);
  }
}
