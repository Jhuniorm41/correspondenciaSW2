import {Contact} from '../models/contacts';

export interface Company {
  id: number;
  prefijo: string;
  nombre: string;
  razonSocial: string;
  nit: string;
  direccion: string;
  telefono: number;
  estado: string;
  fechaRegistro: string;
  fechaModificacion: string;
  contact: Contact;
}
