(function(Global){
	var Morphology={
		Position:{
			get:function(x,y,width,pixels){
				return pixels*(x+(y*width));
			},
			set:function(index,width,pixels){
				var pos={x:0,y:Math.floor(index/(pixels*width))};
				pos.x=(index-pixels*pos.y*width)/pixels;
				return pos;
			},
			scale:function(x1,y1,w1,h1,w2,h2){
				var index={x:0,y:0};
				index.x=Math.floor((x1*w2)/w1);
				index.y=Math.floor((y1*h2)/h1);
				return index;
			},
			getStep:function(bin,width){
				var steps=[];
				for(var i=0,n=bin.length;i<n;i++){
					if(bin[i]!=0){
						var coords=Morphology.Position.set(i,width,1);
						coords.index=i;
						coords.rgbIndex=Morphology.Position.get(coords.x,coords.y,width,4);
						steps[steps.length]=coords;						
					}					
				}
				return steps;
			}			
		},
		resize:function(src,x1,y1,w,h,width){
			var img=new ImageData(w,h);
			var _W=x1+w,_H=y1+h;
			for(var y=y1,j=0;y<_H;y++){
				for(var x=x1;x<_W;x++){
					var index=Morphology.Position.get(x,y,width,4);					
					img.data[j]=src[index];
					img.data[j+1]=src[index+1];
					img.data[j+2]=src[index+2];
					img.data[j+3]=src[index+3];
					j+=4;
				}
			}
			return img;
		},
		scale:function(img,w1,h1,w2,h2){
			//var x2=Math.floor(((objects[i].x+objects[i].w)*lienzo.canvas.width)/self.buffering2.canvas.width);
				//var y2=Math.floor(((objects[i].y+objects[i].h)*lienzo.canvas.height)/self.buffering2.canvas.height);
			var copy=new ImageData(w2,h2);			
			for(var y=0;y<h2;y++){
				for(var x=0;x<w2;x++){
					var coords1=Morphology.Position.scale(x,y,w2,h2,w1,h1);
					var index1=Morphology.Position.get(coords1.x,coords1.y,w1,4);									
					var index2=Morphology.Position.get(x,y,w2,4);
					copy.data[index2]=img[index1];
					copy.data[index2+1]=img[index1+1];
					copy.data[index2+2]=img[index1+2];
					copy.data[index2+3]=img[index1+3];
				}
			}
			return copy;
		},
		resizeBin:function(src,x1,y1,w,h,width){
			var img=new BinaryObject(w,h);
			var _W=x1+w,_H=y1+h;
			for(var y=y1,j=0;y<_H;y++){
				for(var x=x1;x<_W;x++){
					var index=Morphology.Position.get(x,y,width,1);				
					img.bin[j]=src[index];
					j++;
				}
			}
		},
		Erosion:function(bin,step,EE,width,callback){
			var array=new Uint8Array(bin.length),pos=[];
			for(var i=0,n=step.length;i<n;i++){
				var index=Morphology.Position.get(step[i].x,step[i].y,width,1),test=false;
				for(var j=0,m=EE.length;j<m;j++){
					var x=step[i].x+EE[j].x,y=step[i].y+EE[j].y,index1=x+(y*width);
					if(bin[index1]==0){
						if(callback instanceof Function){
							callback(index);
						}
						pos[pos.length]={
							x:x,
							y:y,
							index:index1,
							rgbIndex:index1*4
						};
						test=true;
						break;
					}
				}
				if(test==false){
					array[index]=1;
					pos[pos.length]=step[i];
				}
			}
			return [array,pos];
		},
		Dilation:function(bin,step,EE,width,callback){
			var array=new Uint8Array(bin.length),pos=[];
				for(var i=0,n=step.length;i<n;i++){
					var index=Morphology.Position.get(step[i].x,step[i].y,width,1),test=false;
					array[index]=1;
					pos[pos.length]=step[i];
					for(var j=0,m=EE.length;j<m;j++){
						var x=step[i].x+EE[j].x,y=step[i].y+EE[j].y,index1=x+(y*width);
						if(bin[index1]==0){
							array[index1]=1;
							pos[pos.length]={
								y:y,
								x:x,
								index:index1,
								rgbIndex:index1*4
							};
							if(callback instanceof Function){
								callback(index1);
							}
						}
					}
				}
			return [array,pos];
		},
		//multiplica la matriz actual Binaria por el elemento estructurante asignado...
		inmultiply:function(src,dst){
			var arr=new Uint8ClampedArray(src.length);
			for(var i=0,n=arr.length;i<n;i++){
				arr[i]=bin[i]*dst[i];
			}			
			return arr;
		},
		//trasladar matriz binaria al origen en la posición x y asignada
		translate:function(src,dst,x,y,w1,w2){
			var arr=new Uint8ClampedArray(src.length),_W=w2+x;
			for(var i=Morphology.Position.get(x,y,w1,4),n=source.length;i<n;i+=4){
				var coords=Morphology.Position.set(i,w1,4);
				arr[i]=src[i];
				arr[i+1]=src[i+1];
				arr[i+2]=src[i+2];
				if(coords.x<=_W && coords.x>=x && coords.y>=y){
					arr[i]=dst[i];
					arr[i+1]=dst[i+1];
					arr[i+2]=dst[i+2];
				}
			}
			return arr;
		},
		//trasladar matriz binaria al origen en la posición x y asignada
		translateBin:function(src,dst,x,y,w1,w2){
			var arr=new Uint8ClampedArray(src.length),_W=w2+x;
			for(var i=Morphology.Position.get(x,y,w1,1),n=source.length;i<n;i++){
				var coords=Morphology.Position.set(i,w1,1);
				arr[i]=src[i];
				if(coords.x<=_W && coords.x>=x && coords.y>=y){
					arr[i]=dst[i];
				}
			}
			return arr;
		},
		//invierte la matriz en su complemento...
		complement:function(src){
			var arr=new Uint8ClampedArray(src.length),_W=w2+x;
			for(var i=0,n=src.length;i<n;i++){
				arr[i]=(src[i]==1) ? 0 : 1;
			}
			return object;
		},
		//intersecta el conjunto entrante con la matriz originada...
		intersection:function(src,dst){
			var arr=new Uint8ClampedArray(src.length),_W=w2+x;
			for(var i=0,n=src.length;i<n;i++){
				if(src[i]==dst[i]){
					arr[i]=1;
				}
			}
			return arr;
		},
		//elimina los elementos del conjunto original que pertenecen al elemento estructurante entrante...
		different:function(src,dst){
			var arr=new Uint8ClampedArray(src.length),_W=w2+x;
			for(var i=0,n=src.length;i<n;i++){
				if(src[i]!=dst[i]){
					arr[i]=1;
				}
			}
			return arr;
		},
		Conexa:function(src,w){
			console.time("Hola");
			var some={},equals={},tags={},tag=1;
			for(var i=0,n=src.length;i<n;i++){						
				if(src[i]!=0){					
					var coords=Morphology.Position.set(i,w,1);
					var indexs=[
						{
							x:coords.x-1,
							y:coords.y-1,
							index:Morphology.Position.get(coords.x-1,coords.y-1,w,1)
						},
						{
							x:coords.x,
							y:coords.y-1,
							index:Morphology.Position.get(coords.x,coords.y-1,w,1)
						},
						{
							x:coords.x+1,
							y:coords.y-1,
							index:Morphology.Position.get(coords.x+1,coords.y-1,w,1)
						},
						{
							x:coords.x-1,
							y:coords.y,
							index:Morphology.Position.get(coords.x-1,coords.y,w,1)
						},
						{
							x:coords.x+1,
							y:coords.y,
							index:Morphology.Position.get(coords.x+1,coords.y,w,1)
						}
					];
					//previo al pixel central
					if(indexs[3].x>=0 && src[indexs[3].index]!=tag && src[indexs[3].index]!=0){						
						tag=src[indexs[3].index];
					}					
					src[i]=tag;	
					if(indexs[0].x>=0 && indexs[0].y>=0 && src[indexs[0].index]!=0){
						some[src[indexs[0].index]]=tag;
						
					}
					if(indexs[1].x>=0 && indexs[1].y>=0 && src[indexs[1].index]!=0){
						some[src[indexs[1].index]]=tag;
						
					}
					if(indexs[2].x<w && indexs[2].y>=0 && src[indexs[2].index]!=0){
						some[src[indexs[2].index]]=tag;							
					}					
					tag++;
					
				}
			}
			for( var i in some){
				var bubble=some[i],valor;
				equals[i]=[some[i]];
				while(valor=some[bubble]){
					equals[i].push(valor);
					delete(some[bubble]);
					bubble=valor;									
				}
				for(var j=0,n=equals[i].length;j<n;j++){
					tags[equals[i][j]]=parseInt(i);
				}
			}
			for(var i=0,n=src.length;i<n;i++){
				if(src[i]!=0 && tags[src[i]]){
					src[i]=tags[src[i]];
				}
			}
			console.timeEnd("Hola");
		}
	};
	Global.BinaryObject=function(w,h){
		this.bin=new Int8Array(w*h);
		this.width=w;
		this.height=h;
		this.step=[];
		this.resize=function(x,y,w,h){
			return Morphology.resizeBin.apply(null,[this,x,y,this.width,this.height]);
		}
		this.getStep=function(){
			this.step=Morphology.Position.getStep.apply(null,[this.bin,this.width]);
			return this.step;
		}
		this.Erosion=function(EE,callback){
			var value=Morphology.Erosion.apply(null,[this.bin,this.step,EE,this.width,callback]);
			this.bin=value[0];
			this.step=value[1];
			return value;
		}
		this.Dilation=function(EE,callback){			
			var value=Morphology.Dilation.apply(null,[this.bin,this.step,EE,this.width,callback]);
			this.bin=value[0];
			this.step=value[1];
			return value;
		}
		this.Translate=function(dst,x,y,w2){			
			var value=Morphology.translateBin.apply(null,[this.bin,dst,x,y,this.width,w2]);
			this.bin=value[0];
			this.step=value[1];
			return value;
		}
		this.Conexa=function(){
			Morphology.Conexa.apply(null,[this.bin,this.width]);
		}
		this.Threshold={
			Skin:function(src,parseTo){
				switch(parseTo){
					case "HSV":
					default:
						for(var i=0,n=src.length;i<n;i+=4){
							var hsv=Colors.RGB.parseToHSV(src[i],src[i+1],src[i+2]);
							if(Colors.HSV.isHuman(hsv.h,hsv.s,hsv.v)==true){
								this.bin[i/4]=1;
							}else{
								this.bin[i/4]=0;
							}
						}
					break;
					case "YCrCb":
						for(var i=0,n=src.length;i<n;i+=4){
							var hsv=Colors.RGB.parseToYCrCb(src[i],src[i+1],src[i+2]);
							if(Colors.YCrCb.isHuman(hsv.Cr,hsv.Cb)==true){
								this.bin[i/4]=1;
							}else{
								this.bin[i/4]=0;
							}
						}
					break;
					case "RGB":
						for(var i=0,n=src.length;i<n;i+=4){
							if(Colors.RGB.isHuman(src[i],src[i+1],src[i+2])==true){
								this.bin[i/4]=1;
							}else{
								this.bin[i/4]=0;
							}
						}
					break;
				}			
				this.getStep();	
			}.bind(this)		
		};
	}
	ImageData.prototype.cloneImage=function(x,y,w,h){
		return Morphology.resize.apply(null,[this.data,x,y,w,h,this.width]);
	}
	ImageData.prototype.scale=function(w,h){
		return Morphology.scale.apply(null,[this.data,this.width,this.height,w,h]);
	}
	Global.Morphology=Morphology;
})(this);