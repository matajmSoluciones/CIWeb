importScripts("module.config.js");
if(_MODULE){
	_MODULE.forEach(function(row){
		importScripts(row);
	});
}
if(!_CONFIG){
	throw new Error("Este modulo requiere un fichero de configuración inicial cargado genere un archivo con la variable _CONFIG")
}
if(!_CASCADE || !_WEIGHT|| !_SCALES){
	throw new Error("Este modulo requiere un fichero de set en cascada, en la configuración de la app cargue un modulo de pesos.")
}
self.addEventListener("message",function(event){
	var feacture=JSVision.Feacture.LBP(event.data);	
	var windows=[],coords=[],step=[[],[]];
	JSVision.window.Pyramid.foreach(feacture[0],_CONFIG.recognition.pyramid,_CONFIG.canonical.width,_CONFIG.canonical.height,function(wind){
		JSVision.window.foreach(wind,_CONFIG.recognition.step,_CONFIG.canonical.width,_CONFIG.canonical.height,function(row,coord){			
			var hist=Histograms(row.data,"GRAY");
			hist.Normalize();
			var input=[Float32Array.from([1].concat(Array.from(hist)))];
			if(JVCascade.Strong(input,_CASCADE,_SCALES,_CONFIG.recognition.positive)){
				input=MFunction.Sigmoidea(Matrix.inmultiply(input,_WEIGHT))[0];
				var h=Tbrain.OneVsAll(input);
				if(h){
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
			}
		})
	});
	/*for(var i=0,n=step.length;i<n;i++){
		step[i]=JSVision.step.filter(step[i]);
	}*/
	var success=new CustomEvent("success",{detail:step});
	self.dispatchEvent(success);
});
self.addEventListener("success",function(event){
	//Comprobar solapamiento y comparar agrupaciones	
	self.postMessage(event.detail,[new ArrayBuffer(event.detail)]);
})