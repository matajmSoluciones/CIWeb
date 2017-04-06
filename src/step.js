'use strict';
var Step={
	/*
		Operaciones de conjuntos basada en vectores javascript
		{a,b,c,d,e}
	*/
	//Verifica si el elemento x pertenece al conjunto A
	isPertain:function(x,A){
		var test=false;
		for(var i=0,n=A.length;i<n;i++){
			if(A[i]==x){
				test=true;
				break;
			}
		}
		return test;
	},
	//Agrupa todos los elementos de los conjuntos A y B que sean distintos en un nuevo conjunto, si ya existe un elemento en el conjunto se omite la inserción duplicada de elementos (Revisado)
	Union:function(A,B){
		var C=A.slice();
		for(var i=0,n=B.length,m=A.length;i<n;i++){
			var test=true;
			for(var j=0;j<m;j++){
				if(B[i]==A[j]){
					test=false;
					break;
				}
			}
			if(test==true){
				C.push(B[i]);
			}
		}
		return C;
	},
	//Agrupa todos los elementos de los conjuntos A y B que pertenecen a ambos conjuntos en un nuevo conjunto (Revisado)
	Intersection:function(A,B){
		var C=[];
		for(var i=0,n=A.length,m=B.length;i<n;i++){
			for(var j=0;j<m;j++){
				if(A[i]==B[j]){
					C.push(A[i]);
				}
			}
		}
		return C;
	},
	//Agrupa todos los elementos del conjunto A que no estan en B
	Difference:function(A,B){
		var C=[];
		for(var i=0,n=B.length,m=A.length;i<n;i++){
			var add=true;				
			for(var j=0;j<m;j++){					
				if(B[i]==A[j]){
					add=false;
					break;
				}
			}				
			if(add==true){
				C.push(B[i]);
			}
		}
		return C;
	}
}
module.exports=Step;