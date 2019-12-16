import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';

@Component({
  templateUrl: './tarjeta-delete-dialog.component.html'
})
export class TarjetaDeleteDialogComponent {
  tarjeta: ITarjeta;

  constructor(protected tarjetaService: TarjetaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tarjetaService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tarjetaListModification',
        content: 'Deleted an tarjeta'
      });
      this.activeModal.dismiss(true);
    });
  }
}
