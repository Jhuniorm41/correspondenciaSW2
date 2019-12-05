import {Contact} from '../models/contacts';
export interface Entity {
    id: number;
    nombre: string;
    razonSocial: string;
    descripcion: string;
    estado: string;
    fechaRegistro: string;
    fechaModificacion: string;
    contact: Contact;
}
