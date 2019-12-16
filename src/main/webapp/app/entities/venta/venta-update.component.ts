import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IVenta, Venta } from 'app/shared/model/venta.model';
import { VentaService } from './venta.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';

@Component({
  selector: 'jhi-venta-update',
  templateUrl: './venta-update.component.html'
})
export class VentaUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  tarjetas: ITarjeta[];

  editForm = this.fb.group({
    id: [],
    monto: [],
    cliente: [],
    tarjeta: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ventaService: VentaService,
    protected clienteService: ClienteService,
    protected tarjetaService: TarjetaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ venta }) => {
      this.updateForm(venta);
    });
    this.clienteService
      .query()
      .subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.tarjetaService
      .query()
      .subscribe((res: HttpResponse<ITarjeta[]>) => (this.tarjetas = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(venta: IVenta) {
    this.editForm.patchValue({
      id: venta.id,
      monto: venta.monto,
      cliente: venta.cliente,
      tarjeta: venta.tarjeta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const venta = this.createFromForm();
    if (venta.id !== undefined) {
      this.subscribeToSaveResponse(this.ventaService.update(venta));
    } else {
      this.subscribeToSaveResponse(this.ventaService.create(venta));
    }
  }

  private createFromForm(): IVenta {
    return {
      ...new Venta(),
      id: this.editForm.get(['id']).value,
      monto: this.editForm.get(['monto']).value,
      cliente: this.editForm.get(['cliente']).value,
      tarjeta: this.editForm.get(['tarjeta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }

  trackTarjetaById(index: number, item: ITarjeta) {
    return item.id;
  }
}
