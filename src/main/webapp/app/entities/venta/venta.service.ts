import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVenta } from 'app/shared/model/venta.model';

type EntityResponseType = HttpResponse<IVenta>;
type EntityArrayResponseType = HttpResponse<IVenta[]>;

@Injectable({ providedIn: 'root' })
export class VentaService {
  public resourceUrl = SERVER_API_URL + 'api/ventas';

  constructor(protected http: HttpClient) {}

  create(venta: IVenta): Observable<EntityResponseType> {
    return this.http.post<IVenta>(this.resourceUrl, venta, { observe: 'response' });
  }

  update(venta: IVenta): Observable<EntityResponseType> {
    return this.http.put<IVenta>(this.resourceUrl, venta, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVenta>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVenta[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
