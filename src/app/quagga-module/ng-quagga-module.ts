import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuaggaCamComponent} from './quagga-cam-component/quagga-cam-component.component';
import {QuaggaCamService} from './quagga-cam-service.service';

/**
 * Módulo que se exporta para poder utiliar el componente y los servicios como Módulo externo en otras aplicaciones.
 * Tiene como provider al QuaggaCamService y declara el QuaggaCamComponent.
 * Exporta ambos para que puedan ser utilizados desde los módulos que lo importan.
 *
 * adutra.
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [QuaggaCamService],
  declarations: [QuaggaCamComponent],
  exports: [QuaggaCamComponent]
})
export class QuaggaCamModule {
}
