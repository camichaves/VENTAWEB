import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';
import { TarjetaDeleteDialogComponent } from './tarjeta-delete-dialog.component';

@Component({
  selector: 'jhi-tarjeta',
  templateUrl: './tarjeta.component.html'
})
export class TarjetaComponent implements OnInit, OnDestroy {
  tarjetas: ITarjeta[];
  eventSubscriber: Subscription;

  constructor(protected tarjetaService: TarjetaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.tarjetaService.query().subscribe((res: HttpResponse<ITarjeta[]>) => {
      this.tarjetas = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTarjetas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITarjeta) {
    return item.id;
  }

  registerChangeInTarjetas() {
    this.eventSubscriber = this.eventManager.subscribe('tarjetaListModification', () => this.loadAll());
  }

  delete(tarjeta: ITarjeta) {
    const modalRef = this.modalService.open(TarjetaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tarjeta = tarjeta;
  }
}
