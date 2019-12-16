import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tarjeta',
        loadChildren: () => import('./tarjeta/tarjeta.module').then(m => m.VentawebTarjetaModule)
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.VentawebClienteModule)
      },
      {
        path: 'venta',
        loadChildren: () => import('./venta/venta.module').then(m => m.VentawebVentaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class VentawebEntityModule {}
