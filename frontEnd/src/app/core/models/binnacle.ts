import {Timestamp} from 'rxjs';

export interface Binnacle {
    id: number;
    fechaRegistro: Timestamp<Date>;
    accion: string;
    usuario: string;
}
