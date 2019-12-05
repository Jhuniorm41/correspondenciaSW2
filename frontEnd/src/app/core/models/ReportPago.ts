export interface ReportPago {
    idPagoTransaccion: string;
    fechaPago: number;
    monto: number;
    nombre: string;
    apellido: string;
    ci: string;
    estadDeuda: string;
    estadoPago: string;
    estadoSincronizacion: string;
}
