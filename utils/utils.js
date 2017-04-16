const Matrix=require("../src/matrix.js");


module.exports.string2Array=function(text,colums,rows,dimension){
	var matrix=[];
	var matrix=text.trim().split("\n");
	matrix=matrix.map(function(row){		
		var values=row.trim().split(" ");
		values=values.map(function(row2){
			return parseFloat(row2);
		});
		if(values.length==1){
			return values[0];
		}
		if(values.length==0){
			return null;
		}
		return values;
	});
	if(dimension>1){
		matrix=matrix.map(function(row){
			var matrix2=Matrix.Reshape(row,colums,rows);
			return matrix2;
		});
	}	
	return matrix;
}