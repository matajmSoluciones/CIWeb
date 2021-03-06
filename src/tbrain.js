var Matrix = require("./matrix.js");
var MFunction = require("./mfunction.js");

/* Turbo Brain JS
	V.1.0
	Librería Javascript para el desarollo de redes neuronales en javascript, optimizando y facilitando el desarrollo
	de los modelos matemáticos-
	Desarrollado por Jhonny Mata
	Derechos Reservados Matajm Soluciones 2017.
	El uso de esta librería es bajo Licencia GNU 2.0 pero su uso es exclusivo del autor.	
*/
'use strict';
var Tbrain={	
	//Metodos para la Regresión Linear Simple
	LinealRegression:{
		//Propagación hace la operación de multiplicar la matriz X x W generando un valor que representa la recta de la hipotesis de la función OJO X deberá entrar ya transpuesta (revisado)
		Propagation:function(X,W){
			var z=Matrix.inmultiply(X,W);
			return z;
		},
		//Función de costo para la Regresión Linear donde generará el valor de J de acuerdo a la distancia euclideana de la recta trasada por la hipotesis y los valores del vector entrenamiento (Revisado)
		Cost:function(X,W,Y){			
			var J=0;
			var H=Tbrain.LinearRegression.Propagation(X,W);
			for(var i=0,n=H.length;i<n;i++){
				if(isNaN(H[i])){
					for(var j=0,m=H[i].length;j<m;j++){
						J+=Math.pow(H[i][j]-Y[i][j],2);						
					}
					continue;
				}												
				J+=Math.pow(H[i]-Y[i],2);						
			}								
			J*=(1/(2*n));
			return J;
		},
		Training:{
			//Descenso de gradient para una matriz x, w en el cual se intenta reducir la función de costo de acuerdo a los valores de Y vector de entrenamiento (revisado)
			GradientDescent:function(X,W,Y,A,lambda,iters){
				var grad=new Float64Array(W.length);
				var J_history=new Float64Array(iters);
				for(var t=0;t<iters;t++){
					for(var j=0,n=W.length;j<n;j++){
						var H=Tbrain.LinearRegression.Propagation(X,W);
						var J=0;
						for(var i=0,m=H.length;i<m;i++){																	
							J+=(H[i]-Y[i])*X[i][j];
						}							
						grad[j]=W[j]-(((A/m)*J)+((lambda/m)*W[j]));								
					}
					W=grad;
					J_history[t]=Tbrain.LinearRegression.Cost(X,W,Y);							
				}
				return [W,J_history];
			}
		}
	},
	//Metodos para la Regresión Logistica Simple
	LogisticRegression:{
		//Propagación hace la operación de multiplicar la matriz X x W generando un valor que representa la recta de la hipotesis de la función OJO X deberá entrar ya transpuesta (revisado)
		Propagation:function(X,W){
			var z=MFunction.Sigmoidea(Matrix.inmultiply(X,W));				
			return z;
		},
		//Función de costo para la Regresión Logistica donde generará el valor de J de acuerdo a la propiedad logaritma donde se separa en una función comprimida la función compleja cuando H =1 || H=0 de la recta trasada por la hipotesis y los valores del vector entrenamiento (Revisado)
		Cost:function(X,W,Y){
			var J=0;
			var H=Tbrain.LogisticRegression.Propagation(X,W);
			for(var i=0,n=H.length;i<n;i++){
				if(isNaN(H[i])){
					for(var j=0,m=H[i].length;j<m;j++){						
						if(Y[i][j]==1){
							J+=-(Math.log(H[i][j]));
						}else{
							J+=-(Math.log(1-H[i][j]));
						}
					}
					continue;
				}												
				if(Y[i]==1){
					J+=-(Math.log(H[i]));
				}else{
					J+=-(Math.log(1-H[i]));
				}
			}								
			J*=(1/(2*n));
			return J;			
		},
		Training:{
			//Descenso de gradient para una matriz x, w en el cual se intenta reducir la función de costo de acuerdo a los valores de Y vector de entrenamiento (revisado)
			GradientDescent:function(X,W,Y,A,lambda,iters){
				var grad=new Float64Array(W.length);
				var J_history=new Float64Array(iters);
				for(var t=0;t<iters;t++){
					for(var j=0,n=W.length;j<n;j++){
						var H=Tbrain.LinearRegression.Propagation(X,W);
						var J=0;
						for(var i=0,m=H.length;i<m;i++){
							H[i]=MFunction.Sigmoidea(H[i]);
							J+=(H[i]-Y[i])*X[i][j];
						}							
						grad[j]=W[j]-(((A/m)*J)+((lambda/m)*W[j]));
					}							
					W=grad;
					J_history[t]=Tbrain.LinearRegression.Cost(X,W,Y);							
				}
				return [W,J_history];
			}
		}
	},
	OneVsAll:function(H,T){
		if(!T){
			T=0.5;
		}
		for(var i=0,max=0,n=H.length;i<n;i++){						
			if(H[i]>max){
				max=H[i];
				value=i;
			}
		}
		if(max<T){
			return false;
		}
		return [value,max];			
	}
};
module.exports=Tbrain;

/**
* @param{Object} Global Encapsula los objetos a la variable global del entorno en este momento
*/
/*
(function(Global){
	if(!Global.Matrix){
		throw new Error("El modulo Matrix no se pudo cargar o no se obtuvo una referencia");
	}
	if(!Global.MFunction){
		throw new Error("El modulo MFunction no se pudo cargar o no se obtuvo una referencia");
	}
	
	Global.RNAPerceptron=function(layers,name,mode,bits){
		if(bits==undefined){
			bits=32;
		}
		if(mode==undefined){
			mode="linear";
		}
		mode=mode.toLowerCase();
		var w=[],y=[],u=[];
		for(var i=0,n=layers.length;i<n;i++){
			y[y.length]=(bits!=64) ? new Float64Array(parseInt(layers[i])) : new Float64Array(parseInt(layers[i]));
			if(i>0){
				var index=w.length;
				w[index]= new Array(parseInt(layers[i]));
				u[index]=(bits!=64) ? new Float64Array(parseInt(layers[i])) : new Float64Array(parseInt(layers[i]));
				for(var j=0,m=w[index].length;j<m;j++){
					w[index][j]=(bits!=64) ? new Float64Array(parseInt(layers[i-1])) : new Float64Array(parseInt(layers[i-1]));
				}			
			}
		}	
		this.load=function(_W,_U){
			if(_W!=undefined){
				w=_W;
			}else{
				for(var i=0,n=w.length;i<n;i++){
					for(var j=0,m=w[i].length;j<m;j++){
						for(var k=0,q=w[i][j].length;k<q;k++){						
							w[i][j][k]=Math.random()*(1+1)-1;
						}
					}
				}
			}
			if(_U!=undefined){
				u=_U;
			}else{
				for(var i=0,n=u.length;i<n;i++){
					for(var j=0,m=w[i].length;j<m;j++){
						u[i][j]=Math.random()*(1+1)-1;
					}
				}
			}
			return [w,u];
		}
		this.propagation=function(_X){
			Tbrain.Perceptron.propagation(_X,w,u,y,mode);
			return y;
		}
		this.training=function(_X,_YE,alpha,num_iters){
			var C=Tbrain.Perceptron.Training.gradient_descent(_X,_YE,w,u,alpha,num_iters,mode,y);
			console.log(w,C);
		}
	}
})(this);*/