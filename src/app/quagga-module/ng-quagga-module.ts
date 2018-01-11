import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgQuaggaCamComponent} from './quagga-cam-component/ng-quagga-cam.component';
import {NgQuaggaService} from './ng-quagga-service.service';

/**
 * Módulo que se exporta para poder utiliar el componente y los servicios como Módulo externo en otras aplicaciones.
 * Tiene como provider al NgQuaggaService y declara el NgQuaggaCamComponent.
 * Exporta ambos para que puedan ser utilizados desde los módulos que lo importan.
 *
 * adutra.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [NgQuaggaService],
  declarations: [NgQuaggaCamComponent],
  exports: [NgQuaggaCamComponent]
})
export class NgQuaggaModule {
}
