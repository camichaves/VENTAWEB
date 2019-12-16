import { IVenta } from 'app/shared/model/venta.model';
import { IUser } from 'app/core/user/user.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  apellido?: string;
  ventas?: IVenta[];
  user?: IUser;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public nombre?: string, public apellido?: string, public ventas?: IVenta[], public user?: IUser) {}
}
