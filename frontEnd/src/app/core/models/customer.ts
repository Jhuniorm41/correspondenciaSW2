import {Company} from "./company";

export interface Customers {
    id: number;
    nombre: string;
    apellido: string;
    codIntegracion: string;
    ci: string;
    estado: string;
    fechaRegistro: string;
    fechaModificacion: string;
    empresa: Company;
}