importScripts('/src/Matrix.js');
self.addEventListener("message",function(event){
	var data=string2Array(event.data.text,event.data.column,event.data.row,event.data.dimension);
	var result=JSON.stringify(data,2,"\t");
	self.postMessage(result);
});
function string2Array(text,colums,rows,dimension){
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