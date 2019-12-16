import { ICliente } from 'app/shared/model/cliente.model';
import { ITarjeta } from 'app/shared/model/tarjeta.model';

export interface IVenta {
  id?: number;
  monto?: number;
  cliente?: ICliente;
  tarjeta?: ITarjeta;
}

export class Venta implements IVenta {
  constructor(public id?: number, public monto?: number, public cliente?: ICliente, public tarjeta?: ITarjeta) {}
}
