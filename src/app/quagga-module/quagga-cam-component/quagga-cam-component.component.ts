import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {QuaggaCamService} from '../quagga-cam-service.service';

import Quagga from 'quagga';

@Component({
  selector: 'app-quagga-cam-component',
  templateUrl: './quagga-cam-component.component.html',
  styleUrls: ['./quagga-cam-component.component.css']
})
export class QuaggaCamComponent implements OnInit {

  constructor(private quaggaCamService: QuaggaCamService) {
  }

  /** Input Definitions **/
  @Input('readers') readers = ['upc_reader', 'upc_e_reader', 'ean_reader', 'code_128_reader',
    'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'i2of5_reader'];
  @Input('config') config = {
    frequency: 2,
    decoder: {
      readers: this.readers,
      multiple: false
    },
    locate: true,
    locator: {
      halfSample: false,
      patchSize: 'medium',
    },
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector('#interactive'),
      constraints: {
        facingMode: 'environment',
      },
    }
  };
  @Input('drawLines') drawLines = false;
  @Input('styles') styles = {width: '345px', height: '150px'};
  @Input('errorMargin') errorMargin = 0.09;

  /** Child references **/
  @ViewChild('videoCamera') videoCamera: ElementRef;

  /** Variables **/
  boxInitialized = false;
  boxCoordinates = [];

  lineInitialized = false;
  lineCoordinates = [];


  ngOnInit() {

    this.initQuagga();
    this.attachQuaggaOnDetected();
    this.attachQuaggaOnProcessed();
  }


  /**
   * Inicializa el Quagga con la configuracion te setLiveStreamConfig.
   * Si tien errores, muestra un alert con el error. Sino, llama a Quagga.start que abre la camara.
   */
  initQuagga() {
    Quagga.init(this.config, (err) => {
      if (err) {
        alert(err.code);
      }
      Quagga.start();
    });
  }

  /**
   * Attach del callback a Quagga.onDetectedCallback pasandole la code y la referencia a this.(closure)
   */
  attachQuaggaOnDetected() {
    const thus = this;
    Quagga.onDetected(data => this.onDetectedCallback(data, thus));
  }

  /**
   * On detected que se agrega como callback al Quagga.onDetectedCallback
   * se envia el thus como referencia al this porque se ejecuta asincronico.
   *
   * @param data
   * @param thus
   */
  onDetectedCallback(data: any, thus: any) {
    if (data && data.codeResult && data.codeResult.format) {
      if (thus.validateResult(data)) {
        const data2 = data.codeResult.code;
        const format2 = data.codeResult.format;
        if (format2 && data2) {
          thus.publishBarcode(data);
        }
      }
    }
  }

  /**
   * Valida que una lectura de Quagga ya sea en el attachQuaggaOnProcessed o onDetectedCallback retorne un valor de lectura en codeResult
   * con un margen de error menor a 0.09
   *
   * @param data
   * @returns {boolean}
   */
  private validateResult(data: any) {
    let countDecodedCodes = 0;
    let err = 0;
    if (data && data.codeResult && data.codeResult.decodedCodes) {
      for (let i = 0; i < data.codeResult.decodedCodes.length; i++) {
        const decodedCode = data.codeResult.decodedCodes[i];
        if (decodedCode.error !== undefined) {
          countDecodedCodes++;
          err += parseFloat(decodedCode.error);

        }
      }
    }
    if (err / countDecodedCodes < this.errorMargin) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Publica el resultado en el servicio de barcodeScanner para que sea consumido por quienes lo observan
   * @param {string} format
   * @param {string} data
   */
  private publishBarcode(result: any) {
    this.quaggaCamService.addResult(result);
  }

  /**
   * Attach del callback a Quagga.onProcessedCallback pasandole la code y la referencia a this.(closure)
   */
  private attachQuaggaOnProcessed() {
    if (this.drawLines) {
      const thus = this;
      Quagga.onProcessed(result => this.onProcessedCallback(result, thus));
    }
  }

  /**
   * Funcionalidad que se agrega como callback al Quagga.attachQuaggaOnProcessed. Es llamada cada vez que
   * Quagga detecta algun tipo de codigo de barras, sin importar si es completo o válido.
   * Se dibuja la box y la línea con el color rojo si el código leido es inválido y verde si es válido.
   *
   * @param result
   * @param thus
   */
  private onProcessedCallback(result, thus) {
    const line = thus.getLine();
    const box = thus.getBox();
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementsByClassName('drawingBuffer')[0];
    const context = canvas.getContext('2d');

    Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, context, {color: 'green', lineWidth: 5});

    if (result && result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(line, {x: 'x', y: 'y'}, context, {color: 'green', lineWidth: 5});
    } else {
      Quagga.ImageDebug.drawPath(line, {x: 'x', y: 'y'}, context, {color: 'red', lineWidth: 5});
    }
  }

  /**
   * A partir del width y height del tag video, setea las coordenadas del box que se dibuja en el canvas.
   * Se inicializa una sola vez y es llamado cada vez que se hace el attachQuaggaOnProcessed de Quagga.
   * Retorna las coordenadas en el foramto que es aceptado el drawPath de Quagga.
   * @returns {Array}
   */
  private getBox() {
    if (!this.boxInitialized) {
      this.boxInitialized = true;
      console.log('getBox');
      const width = this.videoCamera.nativeElement.videoWidth;
      const height = this.videoCamera.nativeElement.videoHeight;

      const border = 30;
      const canvasX1 = border;
      const canvasX2 = width - border;

      const canvasY1 = border;
      const canvasY2 = height - border;

      this.boxCoordinates = [
        [canvasX1, canvasY1],
        [canvasX2, canvasY1],
        [canvasX2, canvasY2],
        [canvasX1, canvasY2],
      ];
    }

    return this.boxCoordinates;
  }

  /**
   * A partir del width y height del tag video, setea las coordenadas de la linea que se dibuja en el canvas.
   * Se inicializa una sola vez y es llamado cada vez que se hace el attachQuaggaOnProcessed de Quagga.
   * Retorna las coordenadas en el foramto que es aceptado el drawPath de Quagga.
   * @returns {Array}
   */
  private getLine() {
    if (!this.lineInitialized) {
      this.lineInitialized = true;

      const width = this.videoCamera.nativeElement.videoWidth;
      const height = this.videoCamera.nativeElement.videoHeight;
      const border = 30;

      const canvasY = height / 2;
      const canvasX1 = border;
      const canvasX2 = width - border;
      this.lineCoordinates = [{x: canvasX1, y: canvasY}, {x: canvasX2, y: canvasY}];
    }
    return this.lineCoordinates;
  }


}
