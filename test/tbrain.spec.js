var TBrain=require("../src/tbrain.js");

describe("Regresion Linear", function() {
	var X=[
		[1,2,3],
		[3,2,1]
	], W=[
			[0.11467],
			[0.83728],
			[0.69884]
	];
	it("Propagacion hacia delante",function(){
		var Y=[ 
			[ 3.8857500553131104 ],
  			[ 2.71740984916687 ] 
  		];
		var H=TBrain.LinearRegression.Propagation(X,W);
		for(var i=0, n=H.length;i<n;i++){
			for(var j=0, m =H[i].length;j<m;j++){
				expect(H[i][j]).toBe(Y[i][j]);
			}
		}
	});
	it("Funcion de costo",function(){
		var Y=[ 
			[ 1 ],
  			[ 0 ] 
  		];
		var J=TBrain.LinearRegression.Cost(X,W,Y);		
		expect(J).toBe(3.927967417522183);		
	});
});
describe("Regresion Logistica", function() {
	var X=[
		[1,2,3],
		[3,2,1]
	], W=[
			[0.11467],
			[0.83728],
			[0.69884]
	];
	it("Propagacion hacia delante",function(){
		var Y=[ 
			[ 0.97988 ],
  			[ 0.93805 ] 
  		];
		var H=TBrain.LogisticRegression.Propagation(X,W);
		for(var i=0, n=H.length;i<n;i++){
			for(var j=0, m =H[i].length;j<m;j++){
				expect(H[i][j]).toBe(Y[i][j]);
			}
		}
	});
	it("Funcion de costo",function(){
		var Y=[ 
			1,
  			0 
  		];
		var J=TBrain.LogisticRegression.Cost(X,W,Y);		
		expect(J).toBe(0.7004226064463912);		
	});
});