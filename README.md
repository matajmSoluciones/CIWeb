# CIWeb
Framework para el dessarrollo de aplicaciones basadas en Inteligencia Artificial

Instalación
---------------
Este framework es recomendado usar bajo <a href="https://bower.io/">Bower</a> a través de:

```bash
	$ bower install matajmSoluciones/CIWeb
```
En el proyecto HTML que este realizando deberá colocar las siguientes rutas de archivos
```html
	<script src="__DIR/VisionConfig.js" type="text/javascript"></script>
	<script src="__DIR/JVision.js" type="text/javascript"></script>
```
Uso
--------
El framework es muy facil de usar por lo que deberás tener claro los elementos de entrada de información, y los contextos de salida

```javascript
	ContextoVision=JVision.init(Entrada,ContextoSalida,function(data){
		//callback cuando se complete el proceso
	});	
```
El `ContextoVision` retornado es la misma instancia global de `JVision.window` para ser usado localmente sobre el escope de trabajo

El framework por si solo tiene los escuchadores de eventos necesarios para detectar el estado actual de las entradas por lo que al ser modificado su estado se ejecutarán los procesos establecidos nuevamente.

Configuraciones
------------------

**JVision** requiere de un archivo `VisionConfig.js` que debe ser llamado para poder ejecutar sus procesos fundamentales, este archivo debe mantener la siguiente estructura

```javascript
	var _CONFIG={
	canonical:{
		width:40,
		height:52
	},
	window:{
		width:350,
		height:200
	},
	ouput:{
		width:750,
		height:350
	},
	animation:{
		mode:"static", //"Animations"
		overlap:true
	},
	recognition:{
		async:true,//false
		mode:"LBP", //"HaarLike","Canny"
		step:15,
		pyramid:1.2,
		path:"Worker.js",
		delay:100	
	}
}
```

Estas configuraciones le permiten al framework ejecutar los procesos de manera estatica dentro de su sistema

Procesos Asíncronos
--------------------

El comportamiento de los procesos asíncronos en el framework permiten separar el flujo de trabajo en hilos de procesos independientes del sistema, por lo que manejará WebWorker durante todo el proceso.

La ventana del proceso asíncrono que realiza el framework es que mantiene el mismo proceso de visión artificial durante todo su proceso, lo que puede alterar es las entradas y salidas de esta.

Para poder usar el worker del framework debe tener creado un archivo `module.config.js` en el directorio actual del worker
```javascript
	/*
		Cargador de dependencias del Worker Async Recognition
	*/
	var _MODULE=[
		"VisionConfig.js",
		"Matrix.js",
		"TurboColors.js",
		"Morphology.js",
		"JSVisionLib.js",
		"JVCascade.js",
		"geometry.js",
		"LBPCascade.js"
	];
```

**Nota**: Este archivo permite cargar modulos necesarios para realizar tareas y procesos ya definidos por el framework, puede agregar otros modulos y alterar el flujo del worker con escuchadores de eventos, el archivo `VisionConfig.js` del modulo debe estar apuntando al creado anteriormente.

Alterar el flujo de salida del worker
------------------------------------

Este es uno de las opciones mas importante que ofrece el framework, ya que nos permitirá alterar las salidas del worker y añadir funcionalidad extra o incluso reemplazar el proceso sin afectar el código

Para ello el fichero `module.config.js` deberá poseer los ficheros cargados que deseó utilizar para la alteración.

```javascript
/*
	Cargador de dependencias del Worker Async Recognition
*/
var _MODULE=[
	"VisionConfig.js",
	"Matrix.js",
	"TurboColors.js",
	"Morphology.js",
	"JSVisionLib.js",
	"JVCascade.js",
	"geometry.js",
	"LBPCascade.js",
	"external.js" // modulo creado para alterar el flujo
];
```
Luego en el archivo `external.js` creamos un escuchador de eventos `success` para las respuestas exitosas

```javascript
//Ejemplo de como añadir funcionalidad extra
self.addEventListener("success",function(event){
	console.log(event.detail);	
});
```
Esta operación permite que al terminar el proceso exitosamente me muestre en consola los objetos del resultado, puedo incluso alterar la función agregando el metodo `event.stopImmediatePropagation()` para detener la acción por defecto del framework y reemplazar por el proceso actual.

**Nota**: Al alterar el flujo de procesos es recomendable enviar nuevamente un mensaje al proceso principal con los objetos reemplazados para continuar el flujo de procesos del sistema

Un ejemplo para un flujo reemplazado sería

```javascript
//Ejemplo de como desviar el curso normal de CIWeb para gestionar las salidas
self.addEventListener("success",function(event){
	event.stopImmediatePropagation();
	console.log(event.detail);
	self.postMessage(event.detail,[new ArrayBuffer(event.detail)]);
});
```
En este caso se detiene el flujo se muestra en consola y se vuelve a enviar los objetos hacia el proceso principal una tecnica recomendada cuando queremos alterar los objetos del resultado para añadir otros procesos.

Grunt
-------------------------
Durante la codificación se hace uso de nodejs y grunt para la compresión de archivos, si desea generar los ficheros comprimidos deberá hacer la instalación de dependencias y ejecute

```bash
	$ grunt
```

Pruebas
---------------

**CIWeb** proporciona una serie de pruebas automatizadas que son cargadas en el navegador directamente no requiere otras extensiones para realizarlas, podrá observar por si mismo el resultado de cada prueba