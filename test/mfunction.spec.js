var MFunction=require("../src/mfunction.js");
describe('Funciones Aritmeticas Matriciales',function(){
	it('Sigmoidal valor 0',function(){
		var a=MFunction.Sigmoidea(0);
		expect(a).toBe(0.5);
	});
	it('Sigmoidal valor 1',function(){
		var a=MFunction.Sigmoidea(1);
		expect(a).toBe(0.7310585786300049);
	});
	it('Sigmoidal matricial',function(){
		var A=[
			[1,2,3],
			[-1,0,5],
			[-2,-5,3]
		],result=[
			[0.7310585786300049,0.8807970779778823,0.9525741268224334],
			[0.2689414213699951,0.5,0.9933071490757153],
			[0.11920292202211755,0.0066928509242848554,0.9525741268224334]
		];
		var c=MFunction.Sigmoidea(A);
		expect(c.length).toBe(result.length);
		for(var i=0,n=c.length;i<n;i++){
			expect(c[i].length).toBe(result[i].length);
			for(var j=0,m=c[i].length;j<m;j++){
				var length=Math.abs(c[i][j]-result[i][j]);
				expect(length<0.05).toBe(true);    		
			}
		}
	});	
	it('Sinosuidal valor 1',function(){
		var a=MFunction.Sinuisodal(1);
		expect(a).toBe(0.8414709848078965);
	});	
	it('Sinosuidal valor 1 y 3',function(){
		var a=MFunction.Sinuisodal(1,3);
		expect(a).toBe(-0.7568024953079282);
	});
});