import {Component} from '@angular/core';
import {NgQuaggaService} from './quagga-module/ng-quagga-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mediaDevices = false;
  canVibrate = false;

  /**
   * Lista de codigos de barra que fueron agregados para mostrar en pantalla.
   * @type {Array}
   */
  listOfBarcodes: { format: string, code: string, count: number }[] = [];


  /**
   * Input para el componente
   * @type {{width: string; height: string}}
   */
  styles = {width: '350px', height: '150px'};






  constructor(private barcodeScannerService: NgQuaggaService) {
    this.listOfBarcodes.push({format: 'Test', code: '12345', count: 0});

    this.barcodeScannerService.scanResult().subscribe(data => this.addBarcode(data));
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      this.mediaDevices = true;
    }
    this.canVibrate = 'vibrate' in navigator || 'mozVibrate' in navigator;
  }


  addBarcode(result: any) {
    const code = result.codeResult.code;
    const format = result.codeResult.format;
    const found = this.listOfBarcodes.find(d => d.code === code);
    if (found == null) {
      const data = {format: format, code: code, count: 1};
      this.listOfBarcodes.unshift(data);
    } else {
      found.count++;
    }
  }

  onRemoveItemClick(index: number) {
    this.listOfBarcodes.splice(index, 1);
  }
}
