# Quagga Module

Módulo de Angular que expone el modo Live Stream de la librería QuaggaJS para la lectura de códigos de barras.
Expone un componente QuaggaCamComponent, que es el que contiene la cámara para agregarla a la vista, con los parámetros configurables y un servicio que publica la lectura de resultados válidos.

# Como usar: 

1 - Agregar el módulo 

```
npm install ng-quagga-module
```

2 - Importar el módulo donde se vaya a usar: 
```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, NgQuaggaModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```


3 - Agregar el componente a cualquier componente de vista:

```
<quagga-cam-component> </quagga-cam-component>
```


4 - Inyectar el service y subscribirse al método scanResult los resultados.

```
  constructor(private barcodeScannerService: BarCodeScannerService) {

    this.barcodeScannerService.scanResult().subscribe(data => this.addBarcode(data));
  }
```

El servicio cada vez que se realiza una lectura exitosa, publica el objeto result de QuaggaJS. 

Ejemplo de estructura del objeto result: 

```
{
  "codeResult": {
    "code": "FANAVF1461710",  // the decoded code as a string
    "format": "code_128", // or code_39, codabar, ean_13, ean_8, upc_a, upc_e
    "start": 355,
    "end": 26,
    "codeset": 100,
    "startInfo": {
      "error": 1.0000000000000002,
      "code": 104,
      "start": 21,
      "end": 41
    },
    "decodedCodes": [{
      "code": 104,
      "start": 21,
      "end": 41
    },
    // stripped for brevity
    {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    }],
    "endInfo": {
      "error": 0.8888888888888893,
      "code": 106,
      "start": 328,
      "end": 350
    },
    "direction": -1
  },
  "line": [{
    "x": 25.97278706156836,
    "y": 360.5616435369468
  }, {
    "x": 401.9220519377024,
    "y": 70.87524989906444
  }],
  "angle": -0.6565217179979483,
  "pattern": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, /* ... */ 1],
  "box": [
    [77.4074243622672, 410.9288668804402],
    [0.050203235235130705, 310.53619724086366],
    [360.15706727788256, 33.05711026051813],
    [437.5142884049146, 133.44977990009465]
  ],
  "boxes": [
    [
      [77.4074243622672, 410.9288668804402],
      [0.050203235235130705, 310.53619724086366],
      [360.15706727788256, 33.05711026051813],
      [437.5142884049146, 133.44977990009465]
    ],
    [
      [248.90769330706507, 415.2041489551161],
      [198.9532321622869, 352.62160512937635],
      [339.546160777576, 240.3979259789976],
      [389.5006219223542, 302.98046980473737]
    ]
  ]
}

```


#Configuraciones del componente


# Descargar código 

