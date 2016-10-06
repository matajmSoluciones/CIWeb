importScripts("VisionConfig.js");
if(!_CONFIG){
	throw new Error("Este modulo requiere un fichero de configuración inicial cargado genere un archivo con la variable _CONFIG")
}
if(_CONFIG.load){
	_CONFIG.load.forEach(function(row){
		importScripts(row);
	});
}
if(!_WEIGHTS){
	throw new Error("Este modulo requiere un fichero de configuración pesos cargado en la configuración de la app cargue un modulo de pesos.")
}
self.addEventListener("message",function(event){
	console.time("PROBANDO ASYNC PROMISE");
	var feacture=JSVision.Feacture.LBP(event.data);	
	var windows=[],coords=[],step=[[],[]];
	JSVision.window.Pyramid.foreach(feacture[0],_CONFIG.recognition.pyramid,_CONFIG.canonical.width,_CONFIG.canonical.height,function(wind){
		JSVision.window.foreach(wind,_CONFIG.recognition.step,_CONFIG.canonical.width,_CONFIG.canonical.height,function(row,coord){			
			var hist=Histograms(row.data,"GRAY");
			hist.Normalize();			
			var h=JVCascade([Float32Array.from([1].concat(Array.from(hist)))],_WEIGHTS);			
			if(step[h[0]]){
				var index1=Morphology.Position.scale(coord.x,coord.y,wind.width,wind.height,_CONFIG.window.width,_CONFIG.window.height);
				var index2=Morphology.Position.scale(coord.x+(coord.width-1),coord.y+(coord.height-1),wind.width,wind.height,_CONFIG.ouput.width,_CONFIG.ouput.height);
				var next={
					x:index1.x,
					y:index1.y,
					width:(index2.x-index1.x)+1,
					height:(index2.y-index1.y)+1,
					h:h[1]
				};
				step[h[0]].push(next);
			}
		})
	});
	for(var i=0,n=step.length;i<n;i++){
		step[i]=JSVision.step.filter(step[i]);
	}
	console.log(step);
	//Comprobar solapamiento y comparar agrupaciones	
	self.postMessage([feacture[0],step]);
	console.timeEnd("PROBANDO ASYNC PROMISE");
});