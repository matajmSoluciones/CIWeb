//Ejemplo de como desviar el curso normal de CIWeb para gestionar las salidas
self.addEventListener("success",function(event){
	event.stopImmediatePropagation();
	console.log(event.detail);
	self.postMessage(event.detail,[new ArrayBuffer(event.detail)]);
});