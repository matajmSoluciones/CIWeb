if(!window){
	throw new Error("Esta libreria funciona con el HTMLDocumentElement, no puede ser usada por ningun motivo para procesos en segundo plano, para ello use las librerias de procesos");
}
if(!_CONFIG){
	throw new Error("Esta libreria requiere un fichero de configuración inicial cargado genere un archivo con la variable _CONFIG")
}
(function(Global){
	var process1;
	var JVision={		
		objects:[[],[]],		
		input:null,
		ouput:null,
		overlap:null,
		buffer:null,
		init:function(Input,ouput,callback){
			if(!(ouput instanceof CanvasRenderingContext2D)){
				throw new Error("El window debe ser un contexto del canvas final");
			}
			var lienzo=document.createElement("canvas");
			lienzo.context=lienzo.getContext("2d");
			lienzo.width=_CONFIG.window.width;
			lienzo.height=_CONFIG.window.height;
			if(_CONFIG.recognition.async==true){
				process1=new Worker(_CONFIG.recognition.path);
				process1.addEventListener("message",function(event){
					JVision.objects=event.data;
					if(process1.call){
						process1.call(JVision.objects);
					}
					if(_CONFIG.animation.mode=="animation" && !JVision.input.ended && !JVision.input.paused){
						setTimeout(calculeAsync, _CONFIG.recognition.delay);
					}
				});
				process1.call=callback;
			}else{
				process1=callback;
			}
			if(_CONFIG.animation.mode=="animation"){
				Input.addEventListener("play",JVision.Render);
				Input.addEventListener("loadeddata",JVision.Render);
				if(_CONFIG.recognition.async==true){
					Input.addEventListener("play",calculeAsync);
				}else{
					Input.addEventListener("play",calculeSync);
				}
			}else{
				Input.addEventListener("load",JVision.Render);
				if(_CONFIG.recognition.async==true){
					Input.addEventListener("load",calculeAsync);
				}else{
					Input.addEventListener("load",calculeSync);					
				}
			}
			JVision.window=lienzo.context;
			JVision.ouput=ouput;
			JVision.input=Input;
			JVision.buffer=ouput.canvas.cloneNode(true).getContext("2d");			
			if(_CONFIG.animation.overlap==true){
				JVision.overlap=ouput.canvas.cloneNode(true).getContext("2d");			
			}
			return lienzo.context;
		},
		Render:function(event){			
			if(!JVision.ouput && !JVision.window){
				throw new Error("Establezca una salida para poder Renderizar!");
			}
			JVision.buffer.clearRect(0,0,JVision.buffer.canvas.width,JVision.buffer.canvas.height);
			JVision.window.drawImage(JVision.input,0,0,_CONFIG.window.width,_CONFIG.window.height);
			JVision.buffer.drawImage(JVision.input,0,0,JVision.ouput.canvas.width,JVision.ouput.canvas.height);
			if(_CONFIG.animation.overlap==true){
				JVision.buffer.drawImage(JVision.overlap.canvas,0,0,JVision.ouput.canvas.width,JVision.ouput.canvas.height);
			}
			for(var i=0,n=JVision.objects.length;i<n;i++){
				for(var j=0,m=JVision.objects[i].length;j<m;j++){								
					JVision.buffer.beginPath();
						JVision.buffer.rect(JVision.objects[i][j].x,JVision.objects[i][j].y,JVision.objects[i][j].width,JVision.objects[i][j].height);
						JVision.buffer.strokeStyle=(i==0) ? "red" : "blue";
						JVision.buffer.lineWeight=3;
						JVision.buffer.stroke();
				}
			}
			JVision.ouput.clearRect(0,0,JVision.ouput.canvas.width,JVision.ouput.canvas.height);
			JVision.ouput.drawImage(JVision.buffer.canvas,0,0,JVision.ouput.canvas.width,JVision.ouput.canvas.height);
			if(_CONFIG.animation.mode=="animation"){
				if(JVision.input.paused || JVision.input.ended){
					window.cancelAnimationFrame(JVision.Render);
				}else{
					window.requestAnimationFrame(JVision.Render);
				}				
			}
		},
		Capture:function(){
			var img=JVision.window.getImageData(0,0,_CONFIG.window.width,_CONFIG.window.height);
			return img;
		},
		classifyPyramid:function(src,step,Wmin,Hmin){
			var windows=[];
			for(var i=0,w=src.width,h=src.height;w>=Wmin && h>=Hmin;i++,w=Math.round(src.width/Math.pow(step,i)),h=Math.round(src.height/Math.pow(step,i))){
				var a=document.createElement("canvas").getContext("2d");
				a.canvas.width=w;
				a.canvas.height=h;
				a.drawImage(src,0,0,w,h);
				windows.push(a);
			}
			return windows;
		},
		getWindows:function(src,WC,HC,step){
			var windows=[];
			for (var y=0;y+HC<=src.canvas.width;y+=step){
				for(var x=0;x+WC<=src.canvas.height;x+=step){
					windows.push(
						{
							x:x,
							y:y,
							data:src.getImageData(x,y,WC,HC)
						}
					);
				}
			}
			return windows;
		}		
	};
	Global.JVision=JVision;
	
function calculeAsync(){
	var img=JVision.Capture();
	process1.postMessage(img,[new ArrayBuffer(img)]);
}
function calculeSync(){
	var img=JVision.Capture();
	if(process1){
		JVision.objects=process1(img);	
	}
	if(!JVision.input.ended && !JVision.input.paused){
		setTimeout(calculeSync, _CONFIG.recognition.delay);			
	}
}
})(window);