import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ITarjeta, Tarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from './tarjeta.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-tarjeta-update',
  templateUrl: './tarjeta-update.component.html'
})
export class TarjetaUpdateComponent implements OnInit {
  isSaving: boolean;

  clientes: ICliente[];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    numero: [],
    codSeguridad: [],
    fechaVencimiento: [],
    montoMax: [],
    cliente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tarjetaService: TarjetaService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tarjeta }) => {
      this.updateForm(tarjeta);
    });
    this.clienteService
      .query()
      .subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tarjeta: ITarjeta) {
    this.editForm.patchValue({
      id: tarjeta.id,
      tipo: tarjeta.tipo,
      numero: tarjeta.numero,
      codSeguridad: tarjeta.codSeguridad,
      fechaVencimiento: tarjeta.fechaVencimiento,
      montoMax: tarjeta.montoMax,
      cliente: tarjeta.cliente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tarjeta = this.createFromForm();
    if (tarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.tarjetaService.update(tarjeta));
    } else {
      this.subscribeToSaveResponse(this.tarjetaService.create(tarjeta));
    }
  }

  private createFromForm(): ITarjeta {
    return {
      ...new Tarjeta(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value,
      numero: this.editForm.get(['numero']).value,
      codSeguridad: this.editForm.get(['codSeguridad']).value,
      fechaVencimiento: this.editForm.get(['fechaVencimiento']).value,
      montoMax: this.editForm.get(['montoMax']).value,
      cliente: this.editForm.get(['cliente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarjeta>>) {
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
}
