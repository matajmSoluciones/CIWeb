/* Matrix
	V.1.0
	Libreria Javascript para operaciones de Algebra Linear en Matrices
	Matrix Generator and calculator
		Las matrices se evaluan en: 
		[ 1  2]
		[ 3  4]
		javascript
		[
			[1,2]
			[3,4]
		]
		La matriz original matemáticamente deberá ingresar transpuesta de acuerdo a esta estructura
		[
			[columna],
			[columna],
			[ filas, filas]
		]
*/
(function(Global){	
	var Matrix={
		//retorna  la matriz transpuesta de acuerdo a la estructura fila -> columna  pasa a ser viseversa (Revisado)		
		Transposed:function(A){
			var At=[],M=A.length,N=0;
			for(var i=0;i<M;i++){
				var n=A[i].length;
				if(i==0){					
					N=n;
				}
				if(n!=N){
					throw new Error("La matriz no posee la misma estructura para todas sus filas recuerde una matriz debe ser mxn o nxn, debe coincidir con la documentación");
				}
			}
			for (var i=0;i<N;i++){
				At[i]=new Float32Array(M);
				for( var j=0;j<M;j++){
					At[i][j]=A[j][i];
				}
			}			
			return At;
		},
		//valida si la matriz ingresada es triangular superios (Revisado)
		isOverTriangle:function(A){
			var test=false;
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length!=n){
					break;
				}
				for(var j=0;j<n;j++){
					if(i>j){						
						if(A[i][j]==0){
							test=true;
						}else{							
							test=false;
							break;
						}						
					}
				}
			}
			return test;
		},
		//valida si la matriz ingresada es triangular inferior (revisado)
		isUnderTriangle:function(A){
			var test=false;
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length!=n){
					break;
				}
				for(var j=0;j<n;j++){
					if(i<j){						
						if(A[i][j]==0){
							test=true;
						}else{							
							test=false;
							break;
						}						
					}
				}
			}
			return test;
		},
		//Valida si la matriz es diagonal (Revisado)
		isDiagonal:function(A){
			var test=false;
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length!=n){
					break;
				}
				for(var j=0;j<n;j++){
					if(i!=j){						
						if(A[i][j]==0){
							test=true;
						}else{							
							test=false;
							break;
						}						
					}
				}
			}
			return test;
		},
		//Valida si la matriz diagonal es escalar (Revisado)
		isScalar:function(A){
			var test=false,equal;
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length!=n){
					break;
				}
				for(var j=0;j<n;j++){
					if(i!=j){						
						if(A[i][j]==0){
							test=true;
						}else{							
							test=false;
							break;
						}												
					}else{
						if(!equal){
							equal=A[i][j];
						}
						if(A[i][j]==equal){
							test=true;
						}else{							
							test=false;
							break;
						}
					}
				}
			}
			return test;
		},
		//Genera una matriz identidad de nxn establecido por el usuario basado en un arreglo Int de 8 bits (0 : 1) (Revisado)
		Identity:function(n){
			var A=new Array(n);
			for(var i=0;i<n;i++){
				A[i]=new Int8Array(n);				
				for(var j=0;j<n;j++){					
					A[i][j]=(i==j) ? 1 : 0;
				}
			}
			return A;
		},
		//Verifica si las dos matriz concuerdan en cada uno de sus valores en orden de la matriz basado en un arreglo Flotante 32 bits
		Equal:function(A,B){
			var test=false;
			if(A.length==B.length){
				for(var i=0,n=A.length;i<n;i++){
					if(A[i].length!=B[i].length){
						test=false;
						break;
					}
					for(var j=0,m=A[i].length;j<m;j++){
						if(A[i][j]==B[i][j]){
							test=true;
						}else{
							test=false;
							break;
						}
					}
				}
			}
			return test;
		},
		//Revisado si la matriz es simetrica, es decir si es igual a su transpuesta (revisado)
		isSimetry:function(A){
			var At=Matrix.Transposed(A);
			return Matrix.Equal(A,At);
		},
		//Confirma si la matriz es asimetrica, es decir si la
		isAsimetry:function(A){
			var At=Matrix.Transposed(A);
			return Matrix.Equal(At,Matrix.not(A));
		},
		//Invierte los signos de la matriz escalando la imagen por -1 (revisado)
		not:function(A){
			var NA=Matrix.inmultiply(-1,A);
			return NA;
		},
		//Confirma si la matriz es nula (Revisado)
		isNull:function(A){
			var test=true;
			for(var i=0,n=A.length;i<n;i++){
				for(var j=0,m=A[i].length;j<m;j++){
					if(A[i][j]!=0){
						test=false;
						break;
					}
				}
			}
			return test;
		},
		//Suma dos matrices de orden mxn iguales de las cuales se obtiene una matriz del mismo orden (Revisado)
		Sum:function(A,B){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(!isNaN(A[i])){					
					C[i]=A[i]+B[i];
				}else{
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=A[i][j]+B[i][j];
					}					
				}
			}
			return C;
		},
		// Eleva toda la matriz por A^x (Revisado)
		pow:function(A,x){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.pow(A[i][j],x);
					}
				}else{
					C[i]=Math.pow(A[i],x);
				}
			}
			return C;
		},
		//Asigna la matriz el valor exponencial de X con respecto al valor inicial de la matriz (revisado)
		exp:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.exp(A[i][j]);
					}
				}else{
					C[i]=Math.exp(A[i]);
				}
			}
			return C;
		},
		//Asigna la matriz el logaritmo de X con respecto al valor inicial de la matriz (revisado)
		log:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.log(A[i][j]);
					}
				}else{
					C[i]=Math.log(A[i]);
				}
			}
			return C;
		},
		//Asigna la matriz el valor absoluto de X con respecto al valor inicial de la matriz (revisado)
		abs:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.abs(A[i][j]);
					}
				}else{
					C[i]=Math.abs(A[i]);
				}
			}
			return C;
		},
		//Asigna la matriz el coseno de X con respecto al valor inicial de la matriz (revisado)
		cos:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.cos(A[i][j]);
					}
				}else{
					C[i]=Math.cos(A[i]);
				}
			}
			return C;
		},
		//Asigna la matriz la tangente de X con respecto al valor inicial de la matriz (revisado)
		atan:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.atan(A[i][j]);
					}
				}else{
					C[i]=Math.atan(A[i]);
				}
			}
			return C;
		},
		//Asigna la matriz el seno de X con respecto al valor inicial de la matriz (revisado)
		sin:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.sin(A[i][j]);
					}
				}else{
					C[i]=Math.sin(A[i]);
				}
			}
			return C;
		},
		//Redondea la matriz como un entero con respecto al valor inicial de la matriz (revisado)
		round:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.round(A[i][j]);
					}
				}else{
					C[i]=Math.round(A[i]);
				}
			}
			return C;
		},
		//Parsea la matriz como un entero basado en el máximo de decimal obtenido respecto al valor inicial de la matriz (revisado)
		cell:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.cell(A[i][j]);
					}
				}else{
					C[i]=Math.cell(A[i]);
				}
			}
			return C;
		},
		//Parsea la matriz como un entero basado en el minimo de decimal obtenido respecto al valor inicial de la matriz (revisado)
		floor:function(A){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=Math.floor(A[i][j]);
					}
				}else{
					C[i]=Math.floor(A[i]);
				}
			}
			return C;
		},
		//Parsea la matriz como un entero basado en el minimo de decimal obtenido respecto al valor inicial de la matriz (revisado)
		random:function(m,n){
			var C=new Array(m);
			for(var i=0;i<m;i++){
				if(n){					
					C[i]=new Float32Array(n);
					for(var j=0;j<n;j++){
						C[i][j]=Math.random();
					}
				}else{
					C[i]=Math.random();
				}
			}
			return C;
		},
		//genera un vector con el máximo valor por filas de acuerdo a la matriz de origen (revisado)
		maxr:function(A){
			var C=new Array(A.length);
			var notArray=false;		
			for(var i=0,n=C.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;							
					C[i]=Math.max.apply(null,A[i]);					
				}else{
					notArray=true;
					break;
				}
			}			
			if(notArray==true){
				C=Math.max.apply(null,A);
			}
			return C;
		},
		//genera un vector con el máximo valor por filas de acuerdo a la matriz de origen (revisado)
		minr:function(A){
			var C=new Array(A.length);
			var notArray=false;		
			for(var i=0,n=C.length;i<n;i++){
				if(A[i].length){
					var m=A[i].length;							
					C[i]=Math.min.apply(null,A[i]);					
				}else{
					notArray=true;
					break;
				}
			}			
			if(notArray==true){
				C=Math.min.apply(null,A);
			}
			return C;
		},	
		//genera un vector con el máximo valor por columna de acuerdo a la matriz de origen (revisado)
		maxc:function(A){
			var C=new Float32Array(A[0].length);				
			for(var i=0,n=A.length;i<n;i++){
				var m=A[i].length;
				for(var j=0;j<m;j++){
					C[j]=Math.max(A[i][j],C[j]);
				}				
			}
			return C;
		},	
		//genera un vector con el máximo valor por columna de acuerdo a la matriz de origen (revisado)
		minc:function(A){
			var C=new Float32Array(A[0]);				
			for(var i=0,n=A.length;i<n;i++){
				var m=A[i].length;
				for(var j=0;j<m;j++){
					C[j]=Math.min(A[i][j],C[j]);
				}				
			}
			return C;
		},		
		//Multiplica una matriz por un escalar u otra matriz, en caso de un escalar el producto es el resultado de una nueva matriz con la misma medida mxn en caso contrario el producto de una matriz mxn y nxp es mxp (Revisado)
		inmultiply:function(A,B){
			var n=0,m=0,n2=0,p=0,C=[];			
			if(!isNaN(A)){
				m=n=1;
			}else if(typeof(A)=="object"){
				m=A.length;
				if(A[0] && typeof(A[0])=="object"){
					n=A[0].length;
				}else if(A[0] && !isNaN(A[0])){
					n=1;
				}
			}
			if(!isNaN(B)){
				n2=p=1;
			}else if(typeof(B)=="object"){
				n2=B.length;
				if(B[0] && typeof(B[0])=="object"){
					p=B[0].length;
				}else if(B[0] && !isNaN(B[0])){
					p=1;
				}
			}
			if(n!=n2 && !((m==n && m==1) || (n2==p && p==1))){
				throw new Error("La matriz A tiene una dimensión "+m+"x"+n+" y B tiene una dimensión "+n2+"x"+p+" las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");
			}else if(m==0 || n==0 || n2==0 || p==0 || (m==n && n==n2 && n2==p && p==1)){
				throw new Error("No se aceptan matrices con dimensiones nulas!");
			}
			// Cuando A o B son 1x1
			if(m==1 && n==1){				
				for(var i=0;i<n2;i++){
					C[i]=new Float32Array(p);
					for(var j=0;j<p;j++){
						C[i][j]=B[i][j]*A;
					}
				}
				m=n2;
			}else if(n2==1 && p==1){				
					for(var i=0;i<m;i++){
						C[i]=new Float32Array(n);
						for(var j=0;j<n;j++){
							C[i][j]=A[i][j]*B;
						}
					}
					p=n;			
			}else{
				if(p>1){
					for(var i=0;i<m;i++){
						C[i]=new Float32Array(p);
						for(var j=0;j<p;j++){
							for(var k=0;k<n;k++){
								C[i][j]+=((n==1) ? ((!A[i][0]) ? A[i] : A[i][0]) : A[i][k])*B[k][j];
							}
						}
					}
				}else{
					C=new Float32Array(m);
					for(var i=0;i<m;i++){						
						for(var j=0;j<p;j++){
							for(var k=0;k<n;k++){
								C[j]+=((n==1) ? ((!A[i][0]) ? A[i] : A[i][0]) : A[i][k])*B[k][j];
							}
						}
					}					
				}
			}
			if(m==1 && p==1 && C[0]){
				C=C[0];
			}
			return C;
			//var C=new Array(A.length);
			/*if(A[0] && B[0] && A[0].length && B[0].length && A[0].length!=B.length){
				throw new Error("La matriz A tiene una dimensión "+A.length+"x"+A[0].length+" y B tiene una dimensión "+B.length+"x"+B[0].length+" las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");
			}else if(A[0] && B[0] && !A[0].length && !B[0].length && A.length!=B.length){
				throw new Error("La matriz A tiene una dimensión 1x"+A.length+" y B tiene una dimensión 1x"+B.length+" las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");
			}else if(A[0] && A[0].length && B[0] && !B[0].length && A[0].length!=B.length){
				throw new Error("La matriz A tiene una dimensión "+A.length+"x"+A[0].length+" y B tiene una dimensión 1x"+B.length+" las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");
			}else if(A[0] && !A[0].length && B[0] && B[0].length && A.length!=B.length){
				throw new Error("La matriz A tiene una dimensión 1x"+A.length+" y B tiene una dimensión "+B.length+"x"+B[0].length+" las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");
			}*/
			/*if(!isNaN(A)){
				for(var i=0,n=B.length;i<n;i++){
					var m=B[i].length;
					C[i]=new Float32Array(m);
					for(var j=0;j<m;j++){
						C[i][j]=B[i][j]*A;
					}
				}
			//}else if(A[0] && A[0].length>0 && B[0] && B[0].length>0){
			}else if(A[0] && isNaN(A[0]) && A[0].length>0 && B[0] && isNaN(B[0]) && B[0].length>0){
				for(var i=0,m=A.length;i<m;i++){
					var p=B[i].length;
					C[i]=new Float32Array(p);
					for(var j=0;j<m;j++){
						for(var k=0,n=A[i].length;k<n;k++){
							C[i][j]+=A[i][k]*B[k][j];
						}
					}
				}
			}else if(A[0] && isNaN(A[0]) && A[0].length>0){
				for(var i=0,m=A.length;i<m;i++){					
					C[i]=0;
					for(var k=0,n=A[i].length;k<n;k++){
						C[i]+=A[i][k]*B[k];
					}					
				}
			}
			*/
			//return (C.length>1) ? C : ((!isNaN(C[0])) ? C[0] : (C[0].length==1) ? C[0][0] : C[0]);
		},
		//Cambia el orden de la matriz modificando el orden de las filas asignadas por el usuario, si no es correcto los indices retorna la misma matriz (Revisado)
		changeRow:function(A,I,J){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){				
				C[i]=A[i].slice();				
			}			
			if(A[I] && A[J]){
				C[I]=A[J];
				C[J]=A[I];
			}
			return C;
		},
		//Cambia el orden de la matriz modificando el orden de las columnas asignadas por el usuario, si no es correcto los indices retorna la misma matriz (Revisado)
		changeColumn:function(A,I,J){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				var p=A[i].length;				
				C[i]=new Float32Array(p);
				for(var j=0;j<p;j++){
					C[i][j]=(j==I) ? A[i][J] : ((j==J) ? A[i][I] : A[i][j]);					
				}	
			}
			return C;
		},
		//Modifica la fila de la matriz incrementando por el escalar asignado (Revisado)
		IncrementRow:function(A,I,ALPHA){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){				
				C[i]=A[i].slice();				
			}
			for(var i=0,n=C.length;i<n;i++){
				if(C[i][I]){
					C[i][I]*=ALPHA;
				}				
			}			
			return C;
		},
		//Modifica la fila I de la matriz sumando el incrementando por el escalar asignado en J (Revisado)
		IncrementToRow:function(A,I,J,ALPHA){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){				
				C[i]=A[i].slice();				
			}			
			for(var i=0,n=C.length;i<n;i++){
				if(C[i][I] && C[i][J]){
					C[i][I]+=C[i][J]*ALPHA;
				}
			}
			return C;
		},
		//Modifica la columna de la matriz incrementando por el escalar asignado(Revisado)
		IncrementColumn:function(A,I,ALPHA){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){				
				C[i]=A[i].slice();				
			}
			if(C[I]){
				for(var i=0,n=C[I].length;i<n;i++){
					C[I][i]*=ALPHA;
				}
			}
			return C;
		},
		//Modifica la columna I de la matriz sumando el incrementando por el escalar asignado en J (Revisado)
		IncrementToColumn:function(A,I,J,ALPHA){
			var C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){				
				C[i]=A[i].slice();				
			}
			if(C[I] && C[J]){
				for(var i=0,n=C[I].length;i<n;i++){
					C[I][i]+=C[J][i]*ALPHA;
				}
			}
			return C;
		},
		//Calcula la inversa de la matriz por el metodo de la determinante, en el cual retorna la inversa de la matriz manteniendo la propiedad de que A^-1*I=A
		Inverse:function(A){
			var C=new Array(A.length+2),sum1=0,sum2=0,det=0;
			for(var i=0,j=0,u=A.length,n=C.length;i<n;i++){
				C[i]=(A[i]) ? A[i] : A[j++];				
			}
			var sp=1;
			for(var i=0,u=A.length,n=C.length;i<n;i++){				
				for(var j=0,k=0,m=C[i].length,v=m-1;j<m;j++){
					var index=j+i;
					if(index<n){
						if(index>=u && j==0){												
							break;
						}					
						sp*=C[index][j];
						k++;						
						if(k>=m){
							sum1+=sp;
							sp=1;
						}							
					}					
				}
				sp=1;
				for(var v=C[i].length-1,j=v,k=0;j>=0;j--){
					var index=(-j+v)+i;
					if(index<n){
						if(index>=u && j==2){												
							break;
						}
						sp*=C[index][j];
						k++;						
						if(k>=m){
							sum2+=sp;
							sp=1;
						}							
					}					
				}
			}
			det=sum1-sum2;
			var att=Matrix.inmultiply(1/det,Matrix.Attached(A));	
			return att;
		},
		//Sustituye los terminos de la matriz por los cofactores de la matriz transpuesta
		Attached:function(A){
			var E=new Array(A.length),C=new Array(A.length);
			for(var i=0,n=A.length;i<n;i++){
				E[i]=new Array(A[i].length);
				C[i]=new Float32Array(A[i].length);
				for(var j=0,m=A[i].length;j<m;j++){
					var k=((j+i)%2==0) ? 1 : -1;
					E[i][j]=[];
					for(var u=0;u<n;u++){
						var row=[];
						for(var v=0;v<m;v++){
							if(u!=i && v!=j){
								row.push(k*A[u][v]);
							}
						}
						if(row.length>0){
							E[i][j].push(row);
						}
					}
				}
				for(var j=0,m=E[i].length;j<m;j++){
					var sum1=1,sum2=1;
					if(E[i][j].length>1){
						for(var k=0,p=E[i][j].length;k<p;k++){
							for(var l=0,q=E[i][j][k].length,c=q-1;l<q;l++){
								if(k==l){
									sum1*=E[i][j][k][l];
								}else if((-k+c)==l){
									sum2*=E[i][j][k][l];
								}
							}					
						}
						C[i][j]=sum1-sum2;
					}else if(E[i][j][0]){
						C[i][j]=E[i][j][0];
					}				
				}
			}
			return Matrix.Transposed(C);
		}
	},Step={
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
	},MFunction={
		Sigmoidea:function(X){			
			var result=NaN;
			if(!isNaN(X)){
				result=1/(1+Math.exp(-X));
			}else if(X.length>0){
				result=X.copyWithin();
				for(var i=0,m=result.length;i<m;i++){
					if(!isNaN(X[i])){
						result[i]=1/(1+Math.exp(-X[i]));
					}else{
						for(var j=0,p=result[i].length;j<p;j++){
							result[i][j]=1/(1+Math.exp(-X[i][j]));
						}						
					}
				}
			}
			return result;
		},
		Sinuisodal:function(X,K){
			return Math.sin(X+K);
		},
		Normalized:function(X,min,max){
			return (X-min)/(max-min);
		},
		Media:function(X){
			var n=X.length,sum=0;
			for(var i=0;i<n;i++){
				sum+=X[i];
			}
			return sum/n;
		},
		MediaDeviation:function(X,Md){
			var DM=0,n=X.length;
			for(var i=0;i<n;i++){
				DM+=Math.abs(X[i]-Md);
			}
			return DM/n;
		},
		StandarDeviation:function(X,Md){
			var S=0,n=X.length;
			for(var i=0;i<n;i++){
				S+=X[i]-Md;
			}
			return Math.sqrt(S/n);
		},
		CuadraticEq:function(A,B,C){
			return (-B+Math.sqrt((Math.pow(B,2)-(4*A*C))))/(2*A);
		}
	};
	Global.Matrix=Matrix;
	Global.MFunction=MFunction;
	//console.log(MFunction.Sigmoidea(0));
})(this);