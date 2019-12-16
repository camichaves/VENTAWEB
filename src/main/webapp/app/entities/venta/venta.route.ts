import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Venta } from 'app/shared/model/venta.model';
import { VentaService } from './venta.service';
import { VentaComponent } from './venta.component';
import { VentaDetailComponent } from './venta-detail.component';
import { VentaUpdateComponent } from './venta-update.component';
import { IVenta } from 'app/shared/model/venta.model';

@Injectable({ providedIn: 'root' })
export class VentaResolve implements Resolve<IVenta> {
  constructor(private service: VentaService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVenta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((venta: HttpResponse<Venta>) => venta.body));
    }
    return of(new Venta());
  }
}

export const ventaRoute: Routes = [
  {
    path: '',
    component: VentaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ventawebApp.venta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VentaDetailComponent,
    resolve: {
      venta: VentaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ventawebApp.venta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VentaUpdateComponent,
    resolve: {
      venta: VentaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ventawebApp.venta.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VentaUpdateComponent,
    resolve: {
      venta: VentaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ventawebApp.venta.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
