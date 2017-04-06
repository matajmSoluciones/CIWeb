(function(Global){
	Global.Geometry={
		Polygons:{
			Rectangule:{
				//verifica si colisionan dos objetos
				isColision:function(x1,y1,w1,h1,x2,y2,w2,h2){
					if (x1 + w1 < x2){
						return false;
					}
					if (x1 > x2 + w2){
						return false;
					}
					if (y1 > y2 + h2){
						return false;
					}
					return true;
				},
				Overlap:function(x1,y1,w1,h1,x2,y2,w2,h2){
					var value=0;
					if(Global.Geometry.Polygons.Rectangule.isColision(x1,y1,w1,h1,x2,y2,w2,h2)){											
						value=(w1*h1)-(w2*h2)/((w1*h1)+(w2*h2));			
					}
					return value;
				},
				//verifica si el objeto B esta contenido en A
				isContent:function(x1,y1,w1,h1,x2,y2,w2,h2){
					var test=false;
						if(x1+w1>= x2+w2 && y1+h1>=y2+h2){
							test=true;
						}
					return test;
				},
				Scale:{
					//Escalar de acuerdo a la proporción del rectangulo a la nueva dimencion
					Proportion:function(w1,h1,w2,h2){
						var mesured={w:w2,h:h2};
						if(w2>=h2){
							mesured.w=Math.round((h2*w1)/h1);
							if(mesured.w>w2){
								mesured.w=w2;
							}
						}						
						if(w1>=h1){
							mesured.h=Math.round((h1*mesured.w)/w1);
						}	
						return mesured;
					}
				}
			}
		}
	};
	/*Global.CanvasRenderingContext2D.prototype.isContent=function(x,y,w,h){
		return Global.Geometry.Polygons.Rectangule.isContent.apply(null,[0,0,this.canvas.width,this.canvas.height,x,y,w,h]);
	}*/
})(this);