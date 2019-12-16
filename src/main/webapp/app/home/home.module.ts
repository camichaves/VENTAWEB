import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VentawebSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [VentawebSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class VentawebHomeModule {}
