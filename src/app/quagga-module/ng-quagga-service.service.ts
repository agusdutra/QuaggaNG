import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
/**
 * Servicio al cual se llama desde el componente de lectura para publicar resultados válidos de lectura
 * de códigos de barra.
 * Para ser utilizado, los componentes deben subscribirse a scanCode(). Desde el componente de lectura se va a
 * llamar al método addResult que hace una llamada al next del Subject.
 * Con esta llamada, todos los que esten subscriptos a scanResult ejecutaran el callback que tienen subscripto.
 *
 * adutra
 */
@Injectable()
export class NgQuaggaService {


  private barCodeSubject = new Subject<any>();

  scanResult() {
    return this.barCodeSubject.asObservable();
  }

  addResult(result) {
    this.barCodeSubject.next(result);

  }
}


