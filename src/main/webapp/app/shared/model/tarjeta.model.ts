import { IVenta } from 'app/shared/model/venta.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface ITarjeta {
  id?: number;
  tipo?: string;
  numero?: string;
  codSeguridad?: number;
  fechaVencimiento?: number;
  montoMax?: number;
  ventas?: IVenta[];
  cliente?: ICliente;
}

export class Tarjeta implements ITarjeta {
  constructor(
    public id?: number,
    public tipo?: string,
    public numero?: string,
    public codSeguridad?: number,
    public fechaVencimiento?: number,
    public montoMax?: number,
    public ventas?: IVenta[],
    public cliente?: ICliente
  ) {}
}
