//Ejemplo de como desviar el curso normal de CIWeb para gestionar las salidas
self.addEventListener("success",function(event){
	event.stopImmediatePropagation();
	console.log(event.detail,event.detail[0].length+event.detail[1].length);
	self.postMessage(event.detail,[new ArrayBuffer(event.detail)]);
});