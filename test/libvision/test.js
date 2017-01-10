describe('extraer LBP',function(){
	var input=new ImageData(350,200),error=0;
	for(var i=0,j=0,n=input.data.length;i<n;i+=4,j++){
		input.data[i]=binary1[j];
		input.data[i+1]=binary1[j];
		input.data[i+2]=binary1[j];
		input.data[i+3]=255;
	}
	var LBP=JSVision.Feacture.LBP(input);
	it('LBP image 3-D + A',function(){
		var imgData=[8,8,8,255,2,2,2,255,7,7,7,255,2,2,2,255,7,7,7,255,8,8,8,255,7,7,7,255,7,7,7,255,1,1,1,255];
		var resultData=[0,0,0,255,31,31,31,255,6,6,6,255,124,124,124,255,182,182,182,255,0,0,0,255,48,48,48,255,97,97,97,255,193,193,193,255];
		var image=new ImageData(3,3);
		for(var i=0,n=image.data.length;i<n;i++){
			image.data[i]=imgData[i];
		}
		var LBP=JSVision.Feacture.LBP(image);
		for(var i=0,n=LBP[0].data.length;i<n;i++){			
			expect(LBP[0].data[i]).toBe(resultData[i]);
		}
	});
	it('errores de comparacion imagen',function(){
		for(var i=0,j=0,n=LBP[0].data.length;i<n;i+=4,j++){
			if(LBP[0].data[i]!=LBP1[j]){
				error++;
				//break;
			}
		}
		expect(error).toBe(0);		
	});
	it('histograma comparación',function(){
		console.log(LBP[1],histogram1);
		for(var i=0,j=0,n=LBP[1].length;i<n;i++){
			expect(LBP[1][i]).toBe(histogram1[i]);			
		}
	})
});

/*
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Prueba JVision</title>
	<link rel="stylesheet" href="">
</head>
<body>
	<h1>Prueba Consola</h1>	
	<script src="Morphology.js" type="text/javascript"></script>	
	<script src="geometry.js" type="text/javascript"></script>	
	<script src="TurboColors.js" type="text/javascript"></script>	
	<script src="JSVisionLib.js" type="text/javascript"></script>
	<script>
		window.addEventListener("load",function(){
		var img=new Image();
		img.onload=function(e){
			var real=new Image();
			var lienzo=document.createElement("canvas");
			lienzo.width=img.naturalWidth;
			lienzo.height=img.naturalHeight;
			var context=lienzo.getContext("2d");
			context.drawImage(img,0,0,lienzo.width,lienzo.height);
			var template=context.getImageData(0,0,lienzo.width,lienzo.height);
			document.body.appendChild(lienzo);
			real.onload=function(){
				var lienzo2=document.createElement("canvas");
				lienzo2.width=lienzo.width;
				lienzo2.height=lienzo.height;
				var context2=lienzo2.getContext("2d");
				context2.drawImage(real,0,0,lienzo2.width,lienzo2.height);
				document.body.appendChild(lienzo2);
				var data=context2.getImageData(0,0,lienzo2.width,lienzo2.height);
				var LBP=JSVision.Feacture.LBP(data,0);
				fetch('templates/template.txt').then(function(data){
					return data.text();
				}).then(function(txt){
					var testValue=new Float32Array(txt.split(" ").slice(1,(LBP[0].data.length/4)+1));
					for(var i=0,j=0,n=LBP[0].length;i<n;i+=4,j=i/4){
						if(LBP[0].data[i]!=template.data[j]){
							throw new Error("La prueba ha fallado el LBP generado y la plantilla no coinciden en el indice "+i+"...",[LBP[0].data[i],template.data[i]]);
						}
					}
					fetch('templates/histogram.txt').then(function(data){
						return data.text();
					}).then(function(txt){
						var testValue=new Float32Array(txt.split(" ").slice(1,257));
						var hist=Histograms(LBP[0].data,"GRAY");						
						for(var i=0,n=testValue.length;i<n;i++){
							if(hist[i]!=testValue[i]){
								throw new Error("La prueba ha fallado el histograma y la plantilla no coinciden en el indice "+i+"...",[LBP[0].data[i],template.data[i]]);
							}
						}
						fetch('templates/histogramNormalized.txt').then(function(data){
							return data.text();
						}).then(function(txt){
							var testValue=new Float32Array(txt.split(" ").slice(1,257));							
							hist.Normalize();
							for(var i=0,n=testValue.length;i<n;i++){							
								if(Math.abs(hist[i]-testValue[i])>=0.01){
									throw new Error("La prueba ha fallado el histograma normalizado y la plantilla no coinciden en el indice "+i+"...",[LBP[0].data[i],template.data[i]]);
								}
							}
						context2.putImageData(LBP[0],0,0);
						console.log("El testeo ha finalizado exitosamente...");
						});
						
					});					
				});
			}
			real.src='templates/realTest.png';			
		}
		img.src='templates/LBPTest.jpeg';

		});
	</script>
</body>
</html>
*/