var input=document.createElement("input");
input.type="file";
input.addEventListener("change",function(event){
	var file=event.target.files[0];
	var reader=new FileReader();
	reader.onload=function(e){
		var matrix=[];
		var STRING=e.target.result.split("\n");
		for(let i=0,n=STRING.length;i<n;i++){
			if(STRING[i].trim()!=""){
				var columns=STRING[i].split(" ");
				var row=[];
				for(let j in columns){
					if(columns[j].trim()!=""){					
						row.push(parseFloat(columns[j]));
					}
				}
				matrix.push(row);
			}
		}
		console.log(matrix);
		var file=new Blob([JSON.stringify(matrix,2,"\t")],{type:"application/json"});
		var url=window.URL.createObjectURL(file);
		var a=document.createElement("a");
		a.download="data.json";
		a.href=url;
		var clicEvent = new MouseEvent('click', {
    	 														'view': window,
    	 														'bubbles': true,
    	 														'cancelable': true
    														});
    														//Simulamos un clic del usuario
    														//no es necesario agregar el link al DOM.
    														a.dispatchEvent(clicEvent);
	}
	reader.readAsText(file);
});
input.click();