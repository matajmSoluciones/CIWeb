if(!window)throw new Error("Esta libreria funciona con el HTMLDocumentElement, no puede ser usada por ningun motivo para procesos en segundo plano, para ello use las librerias de procesos");if(!_CONFIG)throw new Error("Esta libreria requiere un fichero de configuración inicial cargado genere un archivo con la variable _CONFIG");!function(a){function b(){console.log("ASYNC");var a=e.Capture();d.postMessage(a,[new ArrayBuffer(a)])}function c(){var a=e.Capture();d&&(e.objects=d(a)),e.input.ended||e.input.paused||setTimeout(c,_CONFIG.recognition.delay)}var d,e={objects:[[],[]],input:null,ouput:null,init:function(a,f,g){if(!(f instanceof CanvasRenderingContext2D))throw new Error("El window debe ser un contexto del canvas final");var h=document.createElement("canvas");return h.context=h.getContext("2d"),h.width=_CONFIG.window.width,h.height=_CONFIG.window.height,1==_CONFIG.recognition.async?(d=new Worker(_CONFIG.recognition.path),d.addEventListener("message",function(a){e.objects=a.data[1],d.call&&d.call(a.data),"animation"!=_CONFIG.animation.mode||e.input.ended||e.input.paused||setTimeout(b,_CONFIG.recognition.delay)}),d.call=g):d=g,"animation"==_CONFIG.animation.mode?(a.addEventListener("play",e.Render),a.addEventListener("loadeddata",e.Render),1==_CONFIG.recognition.async?a.addEventListener("play",b):a.addEventListener("play",c)):(a.addEventListener("load",e.Render),1==_CONFIG.recognition.async?a.addEventListener("load",b):a.addEventListener("load",c)),e.window=h.context,e.ouput=f,e.input=a,h.context},Render:function(a){if(!e.ouput&&!e.window)throw new Error("Establezca una salida para poder Renderizar!");e.window.drawImage(e.input,0,0,_CONFIG.window.width,_CONFIG.window.height),e.ouput.drawImage(e.input,0,0,e.ouput.canvas.width,e.ouput.canvas.height);for(var b=0,c=e.objects.length;b<c;b++)for(var d=0,f=e.objects[b].length;d<f;d++)e.ouput.beginPath(),e.ouput.rect(e.objects[b][d].x,e.objects[b][d].y,e.objects[b][d].width,e.objects[b][d].height),e.ouput.strokeStyle=0==b?"red":"blue",e.ouput.lineWeight=3,e.ouput.stroke();"animation"==_CONFIG.animation.mode&&(e.input.paused||e.input.ended?window.cancelAnimationFrame(e.Render):window.requestAnimationFrame(e.Render))},Capture:function(){var a=e.window.getImageData(0,0,_CONFIG.window.width,_CONFIG.window.height);return a},classifyPyramid:function(a,b,c,d){for(var f=[],g=document.createElement("canvas").getContext("2d"),h=a.height-b,i=a.width-b;h>d&&i>c;h-=b,i-=b)g.canvas.width=i,g.canvas.height=h,g.drawImage(a,0,0,i,h),f.push({width:g.canvas.width,height:g.canvas.height,windows:e.getWindows(g,_CONFIG.Canonical.width,_CONFIG.Canonical.height,_CONFIG.Canonical.step)});return f},getWindows:function(a,b,c,d){for(var e=[],f=0;f+c<=a.canvas.width;f+=d)for(var g=0;g+b<=a.canvas.height;g+=d)e.push({x:g,y:f,data:a.getImageData(g,f,b,c)});return e}};a.JVision=e}(window);