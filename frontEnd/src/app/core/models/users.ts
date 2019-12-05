
import { Roles } from './rol';
export class User {
    id: number;
    usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;
    password: string;
    fechaRegistro: string;
    fechaModificacion: string;
    usuarioAlta: string;
    usuarioModificacion: string;
    estado: string;
    rol: Roles;
}
