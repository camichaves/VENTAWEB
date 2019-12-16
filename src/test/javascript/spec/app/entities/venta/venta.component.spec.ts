import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VentawebTestModule } from '../../../test.module';
import { VentaComponent } from 'app/entities/venta/venta.component';
import { VentaService } from 'app/entities/venta/venta.service';
import { Venta } from 'app/shared/model/venta.model';

describe('Component Tests', () => {
  describe('Venta Management Component', () => {
    let comp: VentaComponent;
    let fixture: ComponentFixture<VentaComponent>;
    let service: VentaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VentawebTestModule],
        declarations: [VentaComponent],
        providers: []
      })
        .overrideTemplate(VentaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VentaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VentaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Venta(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ventas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
