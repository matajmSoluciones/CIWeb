if(importScripts("VisionConfig.js"),!_CONFIG)throw new Error("Este modulo requiere un fichero de configuración inicial cargado genere un archivo con la variable _CONFIG");if(_CONFIG.load&&_CONFIG.load.forEach(function(a){importScripts(a)}),!_WEIGHTS)throw new Error("Este modulo requiere un fichero de configuración pesos cargado en la configuración de la app cargue un modulo de pesos.");self.addEventListener("message",function(a){console.time("PROBANDO ASYNC PROMISE");var b=JSVision.Feacture.LBP(a.data),c=[[],[]];JSVision.window.Pyramid.foreach(b[0],_CONFIG.recognition.pyramid,_CONFIG.canonical.width,_CONFIG.canonical.height,function(a){JSVision.window.foreach(a,_CONFIG.recognition.step,_CONFIG.canonical.width,_CONFIG.canonical.height,function(b,d){var e=Histograms(b.data,"GRAY");e.Normalize();var f=JVCascade([Float32Array.from([1].concat(Array.from(e)))],_WEIGHTS);if(c[f[0]]){var g=Morphology.Position.scale(d.x,d.y,a.width,a.height,_CONFIG.window.width,_CONFIG.window.height),h=Morphology.Position.scale(d.x+(d.width-1),d.y+(d.height-1),a.width,a.height,_CONFIG.ouput.width,_CONFIG.ouput.height),i={x:g.x,y:g.y,width:h.x-g.x+1,height:h.y-g.y+1,h:f[1]};c[f[0]].push(i)}})});for(var d=0,e=c.length;d<e;d++)c[d]=JSVision.step.filter(c[d]);console.log(c),self.postMessage([b[0],c]),console.timeEnd("PROBANDO ASYNC PROMISE")});