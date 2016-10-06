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
					var value=0,x1end=x1+w1,x2end=x2+w2,y1end=y1+h1,y2end=y2+h2;
					if(Global.Geometry.Polygons.Rectangule.isColision(x1,y1,w1,h1,x2,y2,w2,h2)==true){
						var coord={x1:(x1end>=x2) ? x2 : x1,y1:(y2>=y1) ? y2 : y1,x2:(x2end>=x1end) ? x1end : x2end,y2:(y2end>=y1end) ? y1end : y2end};
						var coord2={x1:Math.min(x1,x1end,x2end,x2),x2:Math.max(x1,x1end,x2end,x2),y1:Math.min(y1,y1end,y2end,y2),y2:Math.max(y1,y1end,y2end,y2)};						
						value=((coord.x2-coord.x1)*(coord.y2-coord.y1))/((coord2.x2-coord2.x1)*(coord2.y2-coord.y1));
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