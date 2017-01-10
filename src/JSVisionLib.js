(function(Global){
	if(!Global.Morphology){
		throw new Error("Este objeto requiere la librería Morphology para continuar!");
	}
	if(!Global.Colors){
		throw new Error("Este objeto requiere la librería TurboColors para continuar!");
	}	
	Global.JSVision={
		Feacture:{
			LBP:function(src,T){
				if(T==undefined || isNaN(T)==true){
					T=0;
				}			
				var destiny=new ImageData(src.width,src.height),histogram=new Int32Array(256);
				for(var i=0,n=src.data.length;i<n;i+=4){
					var byte=new Int16Array(8),sum=0;
					var coords=Morphology.Position.set(i,src.width,4);
					var indexs=new Int32Array([
						(coords.x-1>=0) ? Morphology.Position.get(coords.x-1,coords.y,src.width,4) : -1,
						(coords.x-1>=0) ? Morphology.Position.get(coords.x-1,coords.y+1,src.width,4) : -1,
						Morphology.Position.get(coords.x,coords.y+1,src.width,4),
						(coords.x+1<src.width) ? Morphology.Position.get(coords.x+1,coords.y+1,src.width,4) : -1,
						(coords.x+1<src.width) ? Morphology.Position.get(coords.x+1,coords.y,src.width,4) : -1,
						(coords.x+1<src.width && coords.y-1>=0) ? Morphology.Position.get(coords.x+1,coords.y-1,src.width,4) : -1,
						(coords.y-1>=0)? Morphology.Position.get(coords.x,coords.y-1,src.width,4) : -1,
						(coords.x-1>=0 && coords.y-1>=0) ? Morphology.Position.get(coords.x-1,coords.y-1,src.width,4) : -1
					]);
					var color2=Colors.RGB.Effects.Color.GrayScale(src.data[i],src.data[i+1],src.data[i+2]);
					for (var j=0,m=indexs.length;j<m;j++){
						if(src.data[indexs[j]]==undefined || src.data[indexs[j]+1]==undefined || src.data[indexs[j]+2]==undefined){							
							continue;
						}						
						var color1=Colors.RGB.Effects.Color.GrayScale(src.data[indexs[j]],src.data[indexs[j]+1],src.data[indexs[j]+2]);
						byte[j]=(color1-color2>=T) ? Math.pow(2,j) : 0;						
						sum+=byte[j];
					}
					destiny.data[i]=sum;
					destiny.data[i+1]=sum;
					destiny.data[i+2]=sum;
					destiny.data[i+3]=255;
					histogram[sum]++;
				}
				return [destiny,histogram];
			},
			LBPUniform:function(src,T){
				if(T==undefined || isNaN(T)==true){
					T=0;
				}
				var destiny=new Uint8ClampedArray(src.length/4),histogram=new Int32Array(256);			
				for(var i=0,k=0,n=src.length;i<n;i+=4,k=i/4){
					var byte=new Int16Array(8),sum=0,Uniform=0;
					var coords=Morphology.Position.set(i,W,4);
					var indexs=new Int32Array([
						(coords.x-1>=0) ? Morphology.Position.get(coords.x-1,coords.y,W,4) : -1,
						(coords.x-1>=0) ? Morphology.Position.get(coords.x-1,coords.y+1,W,4) : -1,
						Morphology.Position.get(coords.x,coords.y+1,W,4),
						(coords.x+1<=W) ? Morphology.Position.get(coords.x+1,coords.y+1,W,4) : -1,
						(coords.x+1<=W) ? Morphology.Position.get(coords.x+1,coords.y,W,4) : -1,
						(coords.x+1<=W) ? Morphology.Position.get(coords.x+1,coords.y-1,W,4) : -1,
						Morphology.Position.get(coords.x,coords.y-1,W,4),
						(coords.x-1>=0) ? Morphology.Position.get(coords.x-1,coords.y-1,W,4) : -1
						]);
					for (var j=0,m=indexs.length;j<m;j++){
						if(src[indexs[j]]==undefined || src[indexs[j]+1]==undefined || src[indexs[j]+2]==undefined || src[i]==undefined || src[i+1]==undefined || src[i+2]==undefined){							
							continue;
						}						
						var color1=Colors.RGB.Effects.Color.GrayScale(src[indexs[j]],src[indexs[j]+1],src[indexs[j]+2]);
						var color2=Colors.RGB.Effects.Color.GrayScale(src[i],src[i+1],src[i+2]);
						byte[j]=(color1-color2>=T) ? Math.pow(2,j) : 0;
						sum+=byte[j];						
					}
					for (var j=0,m=byte.length-1;j<=m;j++){
						if(j<m){								
							if((byte[j]!=0 && byte[j+1]==0) || (byte[j]==0 && byte[j+1]!=0)){
								Uniform++;
							}
						}else{
							if((byte[j]!=0 && byte[0]==0) || (byte[j]==0 && byte[0]!=0)){
								Uniform++;
							}
						}
					}
					if(Uniform!=2 && Uniform!=0){
						sum=0;
					}
					destiny[k]=sum;
					histogram[sum]++;
				}
				return [destiny,histogram];
			},
			HaarLike:function(src){
				console.log("HAAR LIKE isn't completed...");
			},
			TemplateMatching:function(src,T){
				var destiny=new Int32Array(src.data.length);
				var centerCC={x:Math.floor((src.width-1)/2),y:Math.floor((src.height-1)/2),index:0};
				centerCC.index=Math.floor(centerCC.x+centerCC.y*src.width);
				for(var i=0,n=src.data.length;i<n;i++){
					var centerTo={y:Math.floor(i/W),x:0},sumval=0;
					centerTo.x=Math.floor((i-centerTo.y*W));
					for(var y=0;y<src.height;y++){
						for(var x=0;x<src.width;x++){
							var x1=x-centerCC.x,y1=y-centerCC.y;
							var x2=centerTo.x-x1,y2=centerTo.y-y1;
							var index1=x+y*src.width,index2=x2+y2*W;
							if(src.data[index2]){								
								sumval+=Math.pow(T[index1]-src.data[index2],2);
							}
						}
					}
					destiny[i]=Math.round(sumval);
				}
				return destiny;
			}
		},
		window:{
			foreach:function(src,step,W,H,callback){
				for(var y=0,h=H-1;y+h<src.height;y+=step){
					for(var x=0,w=W-1;x+w<src.width;x+=step){
						var img=src.cloneImage(x,y,W,H);										
						callback(img,{
							x:x,
							y:y,
							width:W,
							height:H
						});
					}
				}
			},
			filter:function(src,step,W,H,callback){
				var windows=[];
				Global.JSVision.window.foreach(src,step,Wm,Hm,function(wind){
					var test=callback(wind) || false;
					if(test==true){
						windows.push(wind);
					}
				});
				return windows;
			},
			Pyramid:{
				foreach:function(src,step,Wm,Hm,callback){
					for(var i=0,w=src.width,h=src.height;w>=Wm && h>=Hm;i++,w=Math.round(src.width/Math.pow(step,i)),h=Math.round(src.height/Math.pow(step,i))){
						var wind=src.scale(w,h);
						callback(wind,i);
					}
				},
				filter:function(src,step,Wm,Hm,callback){
					var windows=[];
					Global.JSVision.window.Pyramid.foreach(src,step,Wm,Hm,function(wind,index){
						var test=callback(wind,index) || false;
						if(test==true){
							windows.push(wind);
						}
					});
					return windows;
				},
				map:function(src,step,Wm,Hm,callback){
					var windows=[];
					Global.JSVision.window.Pyramid.foreach(src,step,Wm,Hm,function(wind,index){
						windows.push(callback(wind,index));
					});
					return windows;
				}
			}
		},
		step:{
			filter:function(step){
				var g=[],i=0;
				var p=step.sort(function(row1,row2){
					return row2.h-row1.h;
				});
				while(p[i]){
					var test=false,j=0;
					while(g[j]){
						var solap=Geometry.Polygons.Rectangule.Overlap(p[i].x,p[i].y,p[i].width,p[i].height,g[j].x,g[j].y,g[j].width,g[j].height);
						if(solap>0.5){
							test=true;
							break;
						}
						j++;
					}
					if(test==false){
						g[g.length]=p[i];
					}
					p.splice(i,1);
				}
				return g;
			}
		}		
	}	
})(this);