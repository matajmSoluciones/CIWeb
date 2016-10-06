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
					JVision.objects=event.data[1];
					if(process1.call){
						process1.call(event.data);						
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
			return lienzo.context;
		},
		Render:function(event){
			if(!JVision.ouput && !JVision.window){
				throw new Error("Establezca una salida para poder Renderizar!");
			}
			JVision.window.drawImage(JVision.input,0,0,_CONFIG.window.width,_CONFIG.window.height);			
			JVision.ouput.drawImage(JVision.input,0,0,JVision.ouput.canvas.width,JVision.ouput.canvas.height);
			for(var i=0,n=JVision.objects.length;i<n;i++){
				for(var j=0,m=JVision.objects[i].length;j<m;j++){								
					JVision.ouput.beginPath();
						JVision.ouput.rect(JVision.objects[i][j].x,JVision.objects[i][j].y,JVision.objects[i][j].width,JVision.objects[i][j].height);
						JVision.ouput.strokeStyle=(i==0) ? "red" : "blue";
						JVision.ouput.lineWeight=3;
						JVision.ouput.stroke();
				}
			}
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
			var a=document.createElement("canvas").getContext("2d");
			for(var y=src.height-step,x=src.width-step;y>Hmin && x>Wmin;y-=step,x-=step){
			//for(var y=src.height-step;y>Hmin;y-=step){	
				//for(var x=src.width-step;x>Wmin;x-=step){					
					a.canvas.width=x;
					a.canvas.height=y;
					a.drawImage(src,0,0,x,y);
					windows.push({
						width:a.canvas.width,
						height:a.canvas.height,
						windows:JVision.getWindows(a,_CONFIG.Canonical.width,_CONFIG.Canonical.height,_CONFIG.Canonical.step)
					});
				//}
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
	console.log("ASYNC");
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