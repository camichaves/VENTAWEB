import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ClienteDeleteDialogComponent } from './cliente-delete-dialog.component';

@Component({
  selector: 'jhi-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit, OnDestroy {
  clientes: ICliente[];
  eventSubscriber: Subscription;

  constructor(protected clienteService: ClienteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll() {
    this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => {
      this.clientes = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInClientes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICliente) {
    return item.id;
  }

  registerChangeInClientes() {
    this.eventSubscriber = this.eventManager.subscribe('clienteListModification', () => this.loadAll());
  }

  delete(cliente: ICliente) {
    const modalRef = this.modalService.open(ClienteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cliente = cliente;
  }
}
