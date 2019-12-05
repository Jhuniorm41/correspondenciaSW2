import {Company} from './company';
import {Categories} from './category';
import {Customers} from './customer';

export interface Debts {
    id: number;
    concepto: string;
    periodo: string;
    monto: number;
    vigencia: string;
    facturable: boolean;
    estado: string;
    moneda: number;
    idIntegracion: string;
    categoria: Categories;
    empresa: Company;
    cliente: Customers;

}
