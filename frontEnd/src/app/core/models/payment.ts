import {Debts} from './debt';
import {Customers} from './customer';

export interface Payments {
    id: number;
    nroAutorizacion: number;
    nroFactura: number;
    codControl: string;
    fechaPago: string;
    fechaRegistro: string;
    usuarioPago: string;
    entidadFinanciera: string;
    nota: string;
    estado: string;
    idTransaccion: string;
    nit: string;
    razonSocial: string;
    estadoSincronizacion: string;
    motivoReversion: string;
    fechaReversion: string;
    deuda: Debts;
    cliente: Customers;
}
