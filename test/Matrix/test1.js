describe("Multiplicación de matrices 2-D", function() {
	var A=[
		[1,2],
		[4,5],
		[7,8]
	],B=[
		[10,11,12],
		[15,19,2],
		[3,6,9]
	];
	it("Multiplicando B*A valido!", function() {
		var c=Matrix.inmultiply(B,A);
		var multiply=[
			[138,171],
			[105,141],
			[90,108]
		];
		expect(c.length).toBe(3);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando A*B invalido! (probando no conmutatividad)", function() {
		try{
			var c=Matrix.inmultiply(A,B);
			throw new Error('Debe fallar esto no es valido!');
		}catch(error){
			expect(error.toString()).toBe("Error: La matriz A tiene una dimensión 3x2 y B tiene una dimensión 3x3 las dimensiones de una matriz multiplicada es mxp basadas en mxn y nxp");  		
		}
	});
	it("Multiplicando 1x1 vs 1x1 invalido!", function() {
		try{
			var c=Matrix.inmultiply(5,2);
		}catch(error){  
			expect(error.toString()).toBe("Error: No se aceptan matrices con dimensiones nulas!");  		
		}
	});
	it("Multiplicando 1xn vs nx1 valido!", function() {
		var C=[
			[1,2,3]
		],D=[
			[2],
			[3],
			[1]
		];
		var c=Matrix.inmultiply(C,D);
		expect(c).toBe(11);
	});
	it("Multiplicando mx1 vs 1xp valido!", function() {
		var C=[
			[1,2,3]
		],D=[
			[2],
			[3],
			[1]
		],multiply=[
			[2,4,6],
			[3,6,9],
			[1,2,3]
		];
		var c=Matrix.inmultiply(D,C);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando 1xn vs nx1 valido sin array columna!", function() {
		var C=[1,2,3],D=[
			[2,3,1]
		];
		var c=Matrix.inmultiply(D,C);
		expect(c).toBe(11);
	});
	it("Multiplicando mxp vs 1x1 valido escalar!", function() {
		var C=2,D=[
			[2,3,1]
		],multiply=[
			[4,6,2]
		];
		var c=Matrix.inmultiply(D,C);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando 1x1 vs nxp valido escalar!", function() {
		var C=[1,2,3],D=5,multiply=[
			[5],
			[10],
			[15]
		];
		var c=Matrix.inmultiply(D,C);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando mx1 vs 1xp valido sin array columna!", function() {
	  	var C=[1,2,3],D=[
	  		[2,3,1]
	  	],multiply=[
			[2,3,1],
			[4,6,2],
			[6,9,3]
		];
		var c=Matrix.inmultiply(C,D);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando mxn vs nx1 valido!", function() {
	  	var C=[
	  		[1,2,3],
	  		[2,3,4],
	  		[5,2,9]
	  	],D=[
	  		[2],
			[4],
			[6]
	  	],multiply=[
			[28],
			[40],
			[72]
		];
		var c=Matrix.inmultiply(C,D);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
	it("Multiplicando 3 matrices en orden!", function() {
	  	var C=[
	  		[1,2,3],
	  		[2,3,4],
	  		[5,2,9]
	  	],D=[
	  		[2],
			[4],
			[6]
	  	],multiply=[
			[28,56,84],
			[40,80,120],
			[72,144,216]
		];
		var v=Matrix.inmultiply(C,D);
		var c=Matrix.inmultiply(v,[
			[1,2,3]
		]);
		expect(c.length).toBe(multiply.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(multiply[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(multiply[i][j]);    		
			}
		}
	});
});
describe("Operaciones básicas de matrices 2-D", function() {
	var A=[
		[1,2],
		[4,5],
		[7,8]
	],B=[
		[10,11,12],
		[15,19,2],
		[3,6,9]
	];
	it("Transposición de matrices", function() {
		var result=[
			[1,4,7],
			[2,5,8]
		];
		var c=Matrix.Transposed(A);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}
	});
	it("Transposición de matrices 1 Array", function() {
		var D=[1,4,7];
		var result=[
			[1,4,7]
		];
		var c=Matrix.Transposed(D);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}
	});	
	it("Triangulo Inferior true", function() {
		var D=[
			[1,0,0],
			[2,8,0],
			[4,9,7]
		];	
		var c=Matrix.isUnderTriangle(D);
		expect(c).toBe(true);
	});
	it("Triangulo superior false", function() {
		var D=[
			[1,0,0],
			[2,8,0],
			[4,9,7]
		];	
		var c=Matrix.isOverTriangle(D);
		expect(c).toBe(false);
	});
	it("Triangulo superior true", function() {
		var D=[
			[1,4,2],
			[0,3,4],
			[0,0,1]
		];	
		var c=Matrix.isOverTriangle(D);
		expect(c).toBe(true);	
	});
	it("Triangulo Inferior false", function() {
		var D=[
			[1,4,2],
			[0,3,4],
			[0,0,1]
		];	
		var c=Matrix.isUnderTriangle(D);
		expect(c).toBe(false);	
	});
	it("Triangulo Diagonal false", function() {
		var D=[
			[1,4,2],
			[0,3,4],
			[0,0,1]
		];	
		var c=Matrix.isDiagonal(D);
		expect(c).toBe(false);	
	});
	it("Triangulo Diagonal true", function() {
		var D=[
			[1,0],
			[0,4]
		];	
		var c=Matrix.isDiagonal(D);
		expect(c).toBe(true);
	});
	it("Triangulo Diagonal escalar false", function() {
		var D=[
			[1,0],
			[0,4]
		];	
		var c=Matrix.isScalar(D);
		expect(c).toBe(false);
	});
	it("Triangulo Diagonal escalar true", function() {
		var D=[
			[2,0,0],
			[0,2,0],
			[0,0,2]
		];
		var c=Matrix.isScalar(D);
		expect(c).toBe(true);
	});
	it("matriz identidad 2x2", function() {		
		var c=Matrix.Identity(2);		
		var result=[
			[1,0],
			[0,1]
		];
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}
	});
	it("matriz identidad 3x3", function() {		
		var c=Matrix.Identity(3);		
		var result=[
			[1,0,0],
			[0,1,0],
			[0,0,1]
		];
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}
	});
	it("matriz Equal true", function() {		
		var c=Matrix.Equal(A,A);
		expect(c).toBe(true);		
	});
	it("matriz Equal false", function() {		
		var c=Matrix.Equal(A,B);
		expect(c).toBe(false);		
	});
	it("matriz simetrica false", function() {		
		var c=Matrix.isSimetry(A);
		expect(c).toBe(false);		
	});
	it("matriz simetrica true", function() {
		var D=[
			[-8,-1,3],
			[-1,7,4],
			[3,4,9]
		];
		var c=Matrix.isSimetry(D);
		expect(c).toBe(true);		
	});
	it("matriz antisimetrica false", function() {		
		var c=Matrix.isAsimetry(A);
		expect(c).toBe(false);		
	});
	it("matriz antisimetrica true", function() {
		var D=[
			[0,-2,4],
			[2,0,2],
			[-4,-2,0]
		];
		var c=Matrix.isAsimetry(D);
		expect(c).toBe(true);		
	});
	it("matriz nula true", function() {
		var D=[
			[0,0],
			[0,0]
		];
		var c=Matrix.isNull(D);
		expect(c).toBe(true);		
	});
	it("matriz nula false", function() {
		var D=[
			[1,0],
			[0,0]
		];
		var c=Matrix.isNull(D);
		expect(c).toBe(false);		
	});
	it("sumar A + B 2x2", function() {
		var D=[
			[1,2],
			[3,4]
		],E=[
			[2,6],
			[8,4]
		],result=[
			[3,8],
			[11,8]
		];
		var c=Matrix.Sum(D,E);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
	it("sumar A + B mxn pxn invalido", function() {
		var D=[
			[1,2],
			[3,4]
		],E=[
			[2,6],
			[8,4],
			[5,3]
		];
		try{
			var c=Matrix.Sum(D,E);
			throw new Error('Debe fallar esto no es valido!');
		}catch(error){
			expect(error.toString()).toBe("Error: Las dimensiones de las matrices no son iguales!");  		
		}		
	});
	it("Matriz elevada al cuadrado", function() {
		var D=[
			[1,2],
			[3,4]
		],result=[
			[1,4],
			[9,16]
		];
		var c=Matrix.pow(D,2);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
	it("Matriz exponencial", function() {
		var D=[
			[1,2],
			[3,4]
		],result=[
			[2.7182817459106445,7.389056205749512],
			[20.08553695678711,54.598148345947266]
		];
		var c=Matrix.exp(D);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
	it("Matriz absoluta", function() {
		var D=[
			[1,-2],
			[3,4]
		],result=[
			[1,2],
			[3,4]
		];
		var c=Matrix.abs(D);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
	it("Matriz coseno", function() {
		var D=[
			[1,-2],
			[3,4]
		],result=[
			[0.5403022766113281,-0.416146844625473],
			[-0.9899924993515015,-0.6536436080932617]
		];
		var c=Matrix.cos(D);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
	it("Matriz tangente", function() {
		var D=[
			[1,-2],
			[3,4]
		],result=[
			[0.7853981852531433,-1.1071487665176392],
			[1.249045729637146,1.3258177042007446]
		];
		var c=Matrix.atan(D);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				expect(c[i][j]).toBe(result[i][j]);    		
			}
		}	
	});
});