var Lang =require("../src/lang.js");
var lexico =require("../data/sintax.json");

describe("Analizador lexico lenguaje condicional", function() {	
	it("IF condicional THEN", function() {
		var str="IF A EQUAL \"hola\" THEN \"es un saludo\"";
		var tokens=[
			"c1","v1","c2","s1","c3","s1","v1","s1"
		];
		var result=Lang.getToken(str,lexico);
		for(var i in result){
			expect(result[i].token).toBe(tokens[i]);
		}
	});
	it("IF condicional AND condicional THEN", function() {
		var str="IF A EQUAL b AND b EQUAL A \n THEN \"es un saludo\"";
		var tokens=[
			"c1","v1","c2","v1","c4","v1","c2","v1","c3", "s1","v1","s1"
		];
		var result=Lang.getToken(str,lexico);
		for(var i in result){
			expect(result[i].token).toBe(tokens[i]);
		}
	});
	it("IF condicional string OR condicional THEN", function() {
		var str="IF \"hola\" IS \"un saludo\" OR \"adios nos vemos\" IS \"despedida\" \n THEN DESCRIBE \"cortesia\"";
		var tokens=[
			"c1","s1","c2","s1","s1","c4","s1","v1","s1", "c2","s1","c3","t1","s1"
		];
		var result=Lang.getToken(str,lexico);
		console.log(result);
		for(var i in result){
			expect(result[i].token).toBe(tokens[i]);
		}
	});
});
