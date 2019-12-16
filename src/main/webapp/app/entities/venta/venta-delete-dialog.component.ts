import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVenta } from 'app/shared/model/venta.model';
import { VentaService } from './venta.service';

@Component({
  templateUrl: './venta-delete-dialog.component.html'
})
export class VentaDeleteDialogComponent {
  venta: IVenta;

  constructor(protected ventaService: VentaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ventaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ventaListModification',
        content: 'Deleted an venta'
      });
      this.activeModal.dismiss(true);
    });
  }
}
