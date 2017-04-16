/*
	===== conditional =====  
	c1+<condition>+c3
		v1+c2+v1
		v1+c2+s1
		s1+c2+s1
		s1+c2+v1
	c1+(<condition>+c4+<condition>)*n+c3

*/
function getToken(str,lexicos){	
	var tokens=[];
	var keys=str.split(/\s+/ig);
	keys.forEach((key)=>{
		var add=false;
		for(var i in lexicos){
			var exp=new RegExp(i,"ig");
			if(exp.test(key)){
				var token={
					token:lexicos[i],
					value:key,
					monema:key.split(exp)
				};
				tokens.push(token);
				add=true;
				break;
			}
		}
		if(!add){
			var token={
					token:undefined,
					value:key,
					monema:[]
				};
				tokens.push(token);
		}

	});
	return tokens;	
}

function In(steps,comparation){
	for(var i in steps){
		if(typeof(steps[i])=="object" && In(steps[i],comparation)==true){
			return true;
		}
		if(steps[i]==comparation){
			return true;
		}
	}
	return false;
}
module.exports.In=In;
module.exports.getToken=getToken;