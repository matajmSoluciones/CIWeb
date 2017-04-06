/**
* TurboColors V1.1
* Procese matrices imagenes en el lado cliente al estilo canvas
* @author Jhonny Mata
*/
/**
* @param{Object} Global Encapsula los objetos a la variable global del entorno en este momento
*/
(function(Global){
	var Colors={
		/**
		* Convolution
		* @param{Uint8ClampedArray} I
		* @param{Object} K
		* @param{Number} width
		* @param{Number} ESCALAR
		* @param{Number} BIAS
		* @param{String} mode
		* @return{Uint8ClampedArray}
		*/
		Convolution:function(I,K,width,ESCALAR,BIAS,mode){
			if(ESCALAR==undefined || ESCALAR==null){
				ESCALAR=1;
			}
			if(BIAS==undefined || BIAS==null){
				BIAS=0;
			}
			var destiny=new Uint8ClampedArray(I.length);
			if(mode!="BIN"){
				var centerCC={x:Math.floor((K.width-1)/2),y:Math.floor((K.height-1)/2),index:0};
				centerCC.index=Math.floor(centerCC.x+centerCC.y*K.width);				
				for(var i=0,n=I.length;i<n;i+=4){
					var centerTo={y:Math.floor(i/(4*width)),x:0},sumval={r:0,g:0,b:0};
					centerTo.x=Math.round((i/4)-(centerTo.y*width));
					for(var y=0;y<K.height;y++){
						for(var x=0;x<K.width;x++){
							var x1=x-centerCC.x,y1=y-centerCC.y;
							var x2=centerTo.x-x1,y2=centerTo.y-y1;
							var index1=Math.round(x+y*K.width),index2=4*(x2+y2*width);							
							if(I[index2]){
								sumval.r+=K.bin[index1]*I[index2];
								sumval.g+=K.bin[index1]*I[index2+1];
								sumval.b+=K.bin[index1]*I[index2+2];								
							}
						}
					}
					destiny[i]=(ESCALAR*sumval.r)+BIAS;
					destiny[i+1]=(ESCALAR*sumval.g)+BIAS;
					destiny[i+2]=(ESCALAR*sumval.b)+BIAS;
					destiny[i+3]=I[i+3];
				}						
			}else{
				var centerCC={x:Math.floor((K.width-1)/2),y:Math.floor((K.height-1)/2),index:0};
				centerCC.index=Math.floor(centerCC.x+centerCC.y*K.width);
				for(var i=0,n=I.length;i<n;i++){
					var centerTo={y:Math.floor(i/width),x:0},sumval=0;
					centerTo.x=Math.floor((i-centerTo.y*width));
					for(var y=0;y<K.height;y++){
						for(var x=0;x<K.width;x++){
							var x1=x-centerCC.x,y1=y-centerCC.y;
							var x2=centerTo.x-x1,y2=centerTo.y-y1;
							var index1=x+y*K.width,index2=x2+y2*width;
							if(I[index2]){
								sumval+=K.bin[index1]*I[index2];								
							}
						}
					}
					destiny[i]=Math.round((ESCALAR*sumval)+BIAS);
				}
			}
			return destiny;
		},
		RGB:{
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToHSV:function(R,G,B){
				var hsv={h:0,s:0,v:0},max=Math.max(R, G, B),min=Math.min(R, G, B);
				if(max!=min){
					if(max==R && G>=B){
						hsv.h=60*((G-B)/(max-min));
					}else{
						if(max==R && G<B){
							hsv.h=60*((G-B)/(max-min))+360;
						}else{
							if(max==G){
								hsv.h=60*((G-B)/(max-min))+120;
							}else{
								if(max==B){
									hsv.h=60*((G-B)/(max-min))+240;
								}
							}
						}
					}
				}
				if(max!=0){
					hsv.s=1-(min/max);
				}
				hsv.v=(R+G+B)/3;			
				return hsv;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToHSL:function(r,g,b){
				var max=Math.max(r, g, b),min=Math.min(r, g, b),hsl={h:0,s:0,l:0};
				if(max!=min){
					if(max==r && g>=b){
						hsl.h=60*((g-b)/(max-min))+0;				
					}else{
						if(max==r && g<b){
							hsl.h=60*((g-b)/(max-min))+360;
						}else{
							if(max==g){
								hsl.h=60*((g-b)/(max-min))+120;
							}else{
								if(max==b){
									hsl.h=60*((g-b)/(max-min))+240;
								}
							}
						}
					}
				}
				hsl.l=(max+min)/2;
				if(max!=min){
					if(hsl.l<=0.5){
						hsl.s=(max-min)/(2*hsl.l);
					}else{				
						hsl.s=Math.abs((max-min)/(2-(2*hsl.l)));
					}
				}
				return hsl;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToNormalized:function(r,g,b){
				var sum=r+g+b;
				var RnGnBn={r:(r/sum),g:(g/sum),b:(b/sum)};
    			return RnGnBn;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToYCrCb:function(r,g,b){
				var YCrCb={
					y:Math.round((0.257*r)+(0.504*g)+(0.098*b)+16),
					Cr:Math.round(-(0.148 *r)-(0.291*g)+(0.439*b)+128),
					Cb:Math.round((0.439*r)-(0.368*g)-(0.071*b)+128)
				};
				return YCrCb;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToTLS:function(r,g,b){
				var TLS={t:0,l:0,s:0},RnGnBn=Colors.RGB.parseToNormalized(r,g,b);
				var r1=RnGnBn.r-(1/3),g1=RnGnBn.g-(1/3),b1=RnGnBn.b-(1/3);
				if(g1>0){
					TLS.t=(Math.atan(r1/g1))/(2*Math.PI)+(1/4);
				}else{
					if(g1<0){
						TLS.t=(Math.atan(r1/g1))/(2*Math.PI)+(3/4);
					}
				}
				TLS.s=Math.sqrt((9/5)*(Math.pow(r1,2)+Math.pow(g1,2)));
				TLS.l=0.299*r1+0.587*g1+0.114*b1;
				return TLS;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Object}
			*/
			parseToLux:function(r,g,b){
				var LUX={l:Math.pow((r+1),0.3)*Math.pow((g+1),0.5)*Math.pow((b+1),0.1),u:0};
				if(r<LUX.l){
					LUX.u=(256/2)*((r+1)/(LUX.l+1));
				}else{
					LUX.u=256+(256/2)*((LUX.l+1)/(b+1));
				}
				return LUX.u;
			},
			/**
			* @param{Number} R
			* @param{Number} G
			* @param{Number} B
			* @return{Boolean}
			*/
			isHuman:function(r,g,b){
				return (((r>95) && (g>40 && g <100) && (b>20) && ((Math.max(r,g,b) - Math.min(r,g,b)) > 15) && (Math.abs(r-g)>15) && (r > g) && (r > b)));
			},
			whitePatch:function(src){
				var destiny=new Uint8ClampedArray(src.length);
				var max={r:0,g:0,b:0};
				for(var i=0,n=src.length;i<n;i+=4){
					max.r=Math.max(max.r,src[i]);
					max.g=Math.max(max.g,src[i+1]);
					max.b=Math.max(max.b,src[i+2]);
					if(max.r==255 && max.g==255 & max.b==255){
						break;
					}
				}
				for(var i=0,n=src.length;i<n;i+=4){
					destiny[i]=src[i]*Math.round(255/max.r);
					destiny[i+1]=src[i+1]*Math.round(255/max.g);
					destiny[i+2]=src[i+2]*Math.round(255/max.b);
				}
				return destiny;
			},
			Effects:{
				Filters:{
						BLUR:{
						width:5,
						height:5,
						bin:[
							0.0030,0.0133,0.0219,0.0133,0.0030,
							0.0133,0.0596,0.0983,0.0596,0.0133,
							0.0219,0.0983,0.1621,0.0983,0.0219,
							0.0133,0.0596,0.0983,0.0596,0.0133,
							0.0030,0.0133,0.0219,0.0133,0.0030
						]
					},
					GAUSSIAN:{
						width:5,
						height:5,
						bin:[
							0.003663003663003663 , 0.014652014652014652  , 0.02564102564102564 , 0.014652014652014652 , 0.003663003663003663,
							0.014652014652014652 , 0.05860805860805861   , 0.09523809523809523 , 0.05860805860805861  , 0.014652014652014652,
							0.02564102564102564  , 0.09523809523809523   , 0.15018315018315018 , 0.09523809523809523  , 0.02564102564102564,
							0.014652014652014652 , 0.05860805860805861   , 0.09523809523809523 , 0.05860805860805861  , 0.014652014652014652,
							0.003663003663003663 ,  0.014652014652014652 , 0.02564102564102564 , 0.014652014652014652 , 0.003663003663003663
						]
					},
					MEDIA:{
						width:3,
						height:3,
						bin:[		
							0.1111111111111111 , 0.1111111111111111 , 0.1111111111111111,
							0.1111111111111111 , 0.1111111111111111 , 0.1111111111111111,
							0.1111111111111111 , 0.1111111111111111 , 0.1111111111111111
						]						
					},
					LAGAUSSIANO:{
						width:5,
						height:5,
						bin:[
							 0 ,  0 , -1 ,  0 ,  0 ,
							 0 , -1 , -2 , -1 ,  0 ,
			   				-1 , -2 , 16 , -2 , -1 ,
							 0 , -1 , -2 , -1 ,  0 ,
							 0 ,  0 , -1 ,  0 ,  0
						]
					},
					PREWITTV:{
						width:3,
						height:3,
						bin:[
							-1,-1,-1,
							 0, 0, 0,
							 1, 1, 1
						]
					},
					PREWITTH:{
						width:3,
						height:3,
						bin:[
							-1,	0,-1,
							-1, 0, 1,
							-1, 0, 1
						]
					},SOBELV:{
						width:3,
						height:3,
						bin:[
							-1,	-2, -1,
							 0,  0,  0,
							 1,  2,  1
						]
					},SOBELH:{
						width:3,
						height:3,
						bin:[
							-1,	 0,  1,
							-2,  0,  2,
							-1,  0,  1
						]
					},LAPLACIANO:{
						width:3,
						height:3,
						bin:[
							 0,	-1,  0,
							-1,  4, -1,
							 0, -1,  0
						]			
					},
					SHARPEN:{
						width:5,
						height:5,
						bin:[
							0 , 0 ,  0 , 0 , 0,
							0 , 0 , -1 , 0 , 0,
							0 ,-1 ,  5 ,-1 , 0,
							0 , 0 , -1 , 0 , 0,
							0 , 0 ,  0 , 0 , 0
						]
					},
					EMBOSS:{
						width:3,
						height:3,
						bin:[
							-2 , -1 , 0,
							-1 ,  1 , 1,
							 0 ,  1 , 2
						]
					}
				},
				Color:{
					GrayScale:function(r,g,b){
						return Math.round((r+g+b)/3);
					},
					BlackAlpha:function(r,g,b,S){
						if(S<2 || S>10 || S==undefined){
							S=5;
						}
						return {r:r/S,g:g/S,b:b/S};
					},
					HightContrast:function(r,g,b,ang){
						if(ang==undefined){
							ang=60;
						}
						return {
							r:(r-128)*Math.tan(ang*Math.PI/180)+128,
							g:(g-128)*Math.tan(ang*Math.PI/180)+128,
							b:(b-128)*Math.tan(ang*Math.PI/180)+128
						};
					}
				},
				Layer:{
					Overlap:function(px1,px2){
						return Math.floor((px1/255)*(px1+((2*px2)/255)*(255-px1)));
					},
					Screen:function(px1,px2){
						return Math.floor(255-(((255-px2)*(255-px1))/255));
					},
					Whiten:function(px1,px2){
						return Math.floor((256*px1)/(256-px2));
					},
					Blacken:function(px1,px2){
						return Math.floor(255-((256*(255-px1))/px2+1));
					},
					Subtraction:function(px1,px2){
						return Math.abs(px1-px2);
					}
				}
			}
		},
		HSV:{
			parseToRGB:function(h,s,v){
				var hi=Math.round(Math.abs(h/60) % 6),f=((h/60)%6)-hi,p=v*(1-s),q=v*(1-s*f),t=v*(1-(1-f)*s),rgb={r:0,g:0,b:0};
				switch(hi){
					case 0:
						rgb.r=v;
						rgb.g=t;
						rgb.b=p;
					break;
					case 1:
						rgb.r=q;
						rgb.g=v;
						rgb.b=p;
					break;
					case 2:
						rgb.r=p;
						rgb.g=v;
						rgb.b=t;
					break;
					case 3:
						rgb.r=p;
						rgb.g=q;
						rgb.b=v;
					break;
					case 4:
						rgb.r=t;
						rgb.g=p;
						rgb.b=v;
					break;
					case 5:
						rgb.r=v;
						rgb.g=p;
						rgb.b=q;
					break;
				}
				rgb.r=Math.round(rgb.r);
				rgb.g=Math.round(rgb.g);
				rgb.b=Math.round(rgb.b);
				return rgb;				
			},
			parseToRGBNormalized:function(h,s,v){
				var rgb=this.parseToRGB(h,s,v);
				return Colors.RGB.parseToNormalized(rgb.r,rgb.g,rgb.b);
			},
			parseToHSL:function(h,s,v){
				var rgb=this.parseToRGB(h,s,v);
				return Colors.RGB.parseToHSL(rgb.r,rgb.g,rgb.b);
			},
			parseToYCrCb:function(h,s,v){
				var rgb=this.parseToRGB(h,s,v);
				return Colors.RGB.parseToYCrCb(rgb.r,rgb.g,rgb.b);
			},
			parseToTLS:function(h,s,v){
				var rgb=this.parseToRGB(h,s,v);
				return Colors.RGB.parseToTLS(rgb.r,rgb.g,rgb.b);
			},
			parseToLux:function(h,s,v){
				var rgb=this.parseToRGB(h,s,v);
				return Colors.RGB.parseToLux(rgb.r,rgb.g,rgb.b);
			},
			isHuman:function(h,s,v){
				return ((h>=0 && h<=50) ||  (h>=340 && h<=360)) && (s>0.12 && s<0.68) && v>=102;
			}
		},
		RnGnBn:{
			parseToRGB:function(Rn,Gn,Bn){
				var rgb={r:0,g:0,b:0};
				rgb.r=Math.round(Rn*255);
				rgb.g=Math.round(Gn*255);
				rgb.b=Math.round(Bn*255);
				return rgb;
			},
			parseToHSV:function(Rn,Gn,Bn){
				var rgb=this.parseToRGB(Rn,Gn,Bn);
				return Colors.RGB.parseToHSV(rgb.r,rgb.g,rgb.b);
			},
			parseToHSL:function(Rn,Gn,Bn){
				var rgb=this.parseToRGB(Rn,Gn,Bn);
				return Colors.RGB.parseToHSL(rgb.r,rgb.g,rgb.b);
			},
			parseToYCrCb:function(Rn,Gn,Bn){
				var rgb=this.parseToRGB(Rn,Gn,Bn);
				return Colors.RGB.parseToYCrCb(rgb.r,rgb.g,rgb.b);
			},
			parseToTLS:function(Rn,Gn,Bn){
				var rgb=this.parseToRGB(Rn,Gn,Bn);
				return Colors.RGB.parseToTLS(rgb.r,rgb.g,rgb.b);
			},
			parseToLux:function(Rn,Gn,Bn){
				var rgb=this.parseToRGB(Rn,Gn,Bn);
				return Colors.RGB.parseToTLS(rgb.r,rgb.g,rgb.b);
			},
			isHuman:function(Rn,Gn,Bn){
				return (((Rn / Gn )>1.185) && (((Rn*Bn)/(Math.pow(Bn+Gn+Bn,2))) > 0.107) && (((Rn*Gn)/(Math.pow(Rn+Gn+Bn,2))) > 0.112));
			}
		},
		HSL:{
			parseToRGB:function(h,s,l){
				var hi=Math.round(Math.abs(h/60) % 6),f=((h/60)%6)-hi,p=l*(1-s),q=l*(1-s*f),t=l*(1-(1-f)*s),rgb={r:0,g:0,b:0};
				switch(hi){
					case 0:
						rgb.r=l;
						rgb.g=t;
						rgb.b=p;
					break;
					case 1:
						rgb.r=q;
						rgb.g=l;
						rgb.b=p;
					break;
					case 2:
						rgb.r=p;
						rgb.g=l;
						rgb.b=t;
					break;
					case 3:
						rgb.r=p;
						rgb.g=q;
						rgb.b=l;
					break;
					case 4:
						rgb.r=t;
						rgb.g=p;
						rgb.b=l;
					break;
					case 5:
						rgb.r=l;
						rgb.g=p;
						rgb.b=q;
					break;
				}
				rgb.r=Math.round(rgb.r);
				rgb.g=Math.round(rgb.g);
				rgb.b=Math.round(rgb.b);
				return rgb;
			},
			parseToHSV:function(h,s,l){
				var rgb=this.parseToRGB(h,s,l);
				return Colors.RGB.parseToHSV(rgb.r,rgb.g,rgb.b);
			},
			parseToNormalized:function(h,s,l){
				var rgb=this.parseToRGB(h,s,l);
				return Colors.RGB.parseToNormalized(rgb.r,rgb.g,rgb.b);
			},
			parseToYCrCb:function(h,s,l){
				var rgb=this.parseToRGB(h,s,l);
				return Colors.RGB.parseToYCrCb(rgb.r,rgb.g,rgb.b);
			},
			parseToTLS:function(h,s,l){
				var rgb=this.parseToRGB(h,s,l);
				return Colors.RGB.parseToTLS(rgb.r,rgb.g,rgb.b);
			},
			parseToLux:function(h,s,l){
				var rgb=this.parseToRGB(h,s,l);
				return Colors.RGB.parseToLux(rgb.r,rgb.g,rgb.b);
			}
		},
		YCrCb:{
			parseToRGB:function(Y,Cr,Cb){
				return {
					r:Math.round(Y+1.402*(Cr-128)),
					g:Math.round(Y-0.34414*(Cb-128)-0.71414 * (Cr-128)),
					b:Math.round(Y+1.772*(Cb-128))
				};
			},
			parseToHSV:function(Y,Cr,Cb){
				var rgb=this.parseToRGB(Y,Cr,Cb);
				return Colors.RGB.parseToHSV(rgb.r,rgb.g,rgb.b);
			},
			parseToNormalized:function(Y,Cr,Cb){
				var rgb=this.parseToRGB(Y,Cr,Cb);
				return Colors.RGB.parseToNormalized(rgb.r,rgb.g,rgb.b);
			},
			parseToHSL:function(Y,Cr,Cb){
				var rgb=this.parseToRGB(Y,Cr,Cb);
				return Colors.RGB.parseToHSL(rgb.r,rgb.g,rgb.b);
			},
			parseToTLS:function(Y,Cr,Cb){
				var rgb=this.parseToRGB(Y,Cr,Cb);
				return Colors.RGB.parseToTLS(rgb.r,rgb.g,rgb.b);
			},
			parseToLux:function(Y,Cr,Cb){
				var rgb=this.parseToRGB(Y,Cr,Cb);
				return Colors.RGB.parseToLux(rgb.r,rgb.g,rgb.b);
			},
			isHuman:function(Cr,Cb){
				return (Cb>=80 && Cb<=120) && (Cr>=133 && Cr<=173);
			}
		}
	},Histograms=function(img,mode){
		var rgb;
		if(mode!="BIN" && mode!="GRAY"){
			rgb={r:new Float32Array(256),g:new Float32Array(256),b:new Float32Array(256)};
			rgb.Calcule=function(){
				for(var i=0,n=img.length;i<n;i+=4){
					this.r[img[i]]++;
					this.g[img[i+1]]++;
					this.b[img[i+2]]++;
				}		
			};
			rgb.Normalize=function(){
				var xmax={r:Math.max.apply(null,this.r),g:Math.max.apply(null,this.g),b:Math.max.apply(null,this.b)};
				for(var i=0;i<256;i++){					
					rgb.r[i]=rgb.r[i]/xmax.r;
					rgb.g[i]=rgb.g[i]/xmax.g;
					rgb.b[i]=rgb.b[i]/xmax.b;
				}
			}
			rgb.Discreet=function(){
				var normalizado={r:new Float32Array(256),g:new Float32Array(256),b:new Float32Array(256)};
				var discreto={r:new Float32Array(256),g:new Float32Array(256),b:new Float32Array(256)};
				for(var i=0,n=img.length/4;i<256;i++){
					normalizado.r[i]=this.r[i]/n;
					normalizado.g[i]=this.g[i]/n;
					normalizado.b[i]=this.b[i]/n;
					for(var j=0;j<=i;j++){
						discreto.r[i]+=normalizado.r[j];
						discreto.g[i]+=normalizado.g[j];
						discreto.b[i]+=normalizado.b[j];
					}
				}
				return discreto;
			};
			rgb.Equalize=function(){
				var img2=new Uint8ClampedArray(img.length);				
				var discreto=this.Discreet();
				for(var i=0,n=img2.length;i<n;i+=4){
					img2[i]=Math.round(255*discreto.r[img[i]]);
					img2[i+1]=Math.round(255*discreto.g[img[i+1]]);
					img2[i+2]=Math.round(255*discreto.b[img[i+2]]);
				}
				return img2;
			}
		}else{
			rgb=new Float32Array(256);
			if(mode=="BIN"){
				rgb.Calcule=function(){
					for(var i=0,n=img.length;i<n;i++){
						this[img[i]]++;
					}
				};
			}else{
				rgb.Calcule=function(){
					for(var i=0,n=img.length;i<n;i+=4){						
						this[Colors.RGB.Effects.Color.GrayScale(img[i],img[i+1],img[i+2])]++;					
					}
				};
			}
			rgb.Discreet=function(){
				var normalizado=new Float32Array(256);
				var discreto=new Float32Array(256);
				for(var i=0,n=(mode=="BIN") ? img.length : img.length/4;i<256;i++){
					normalizado[i]=this[i]/n;
					normalizado[i]=this[i]/n;
					normalizado[i]=this[i]/n;
					for(var j=0;j<=i;j++){
						discreto[i]+=normalizado[j];
						discreto[i]+=normalizado[j];
						discreto[i]+=normalizado[j];
					}
				}
				return discreto;
			};
			rgb.Equalize=function(){
				var img2=new Uint8ClampedArray(img.length);				
				var discreto=this.Discreet();
				if(mode=="GRAY"){
					for(var i=0,n=img2.length;i<n;i+=4){
						var val=Math.round(255*discreto[Colors.RGB.Effects.Color.GrayScale(img[i],img[i+1],img[i+2])]);
						img2[i]=val;
						img2[i+1]=val;
						img2[i+2]=val;
					}
				}else{
					for(var i=0,n=img2.length;i<n;i+=4){
						img2[i]=Math.round(255*discreto[img[i]]);
					}
				}				
				return img2;
			}
			rgb.Normalize=function(){
				var xmax=Math.max.apply(null,this);
				for(var i=0;i<256;i++){
					rgb[i]=rgb[i]/xmax;
				}
			}
		};
		rgb.Functions={
			inverse:function(px){
				return 255-px;
			},
			square:function(px){
				return Math.pow(px,2)/255;
			},
			cubic:function(px){
				return Math.pow(px,3)/65025;
			},
			sqrt:function(px){
				return Math.sqrt(255*px);
			},
			sqrt3:function(px){
				return Math.cbrt(65025*px);
			},
			log:function(px){
				return 255*(Math.log(1+px)/Math.log(256))
			}
		};
		Object.defineProperty(rgb,"Calcule",{enumerable:false, writable:false});
		Object.defineProperty(rgb,"Normalize",{enumerable:false, writable:false});
		Object.defineProperty(rgb,"Equalize",{enumerable:false, writable:false});
		Object.defineProperty(rgb,"Discreet",{enumerable:false, writable:false});
		Object.defineProperty(rgb,"Functions",{enumerable:false, writable:false});
		rgb.Calcule();
		return rgb;
	};
	Global.Histograms=Histograms;
	Global.Colors=Colors;	
	Object.freeze(Global.Colors);
	Object.freeze(Global.Colors.RGB);	
	Object.freeze(Global.Colors.RGB.Filters);
	Object.freeze(Global.Colors.RGB.Effects);
	Object.freeze(Global.Colors.RGB.Effects.Color);
	Object.freeze(Global.Colors.RGB.Effects.Layer);	
	Object.freeze(Global.Colors.HSV);
	Object.freeze(Global.Colors.RnGnBn);
	Object.freeze(Global.Colors.HSL);
	Uint8ClampedArray.prototype.Histogram=function(mode){
		return Histograms.apply(null,[this,mode]);
	}
	ImageData.prototype.Convolution=function(K,E,B,mode){
		return Colors.Convolution.apply(null,[this.data,K,this.width,E,B,mode]);
	}
})(this);