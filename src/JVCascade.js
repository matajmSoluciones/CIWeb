(function(Global){
	if(!Global.Matrix){
		throw new Error("Este objeto requiere la librería Matrix para continuar!");
	}
	Global.JVCascade=function(input,weight,T){
		if(!T){
			T=0.5;
		}
		var value=-1,sum=0,max=0,n=weight.length,m=n-1;
		for(var i=0;i<m;i++){			
			var h=MFunction.Sigmoidea(Matrix.inmultiply(input,weight[i]));
			sum+=h;
		}
		if((1/n)*sum<T && weight[m]){			
			for(var i=0,h=MFunction.Sigmoidea(Matrix.inmultiply(input,weight[m]))[0],n=h.length;i<n;i++){						
				if(h[i]>max){
					max=h[i];
					value=i;
				}				
			}
			if(max<T){
				value=-1;
			}
		}		
		return [value,max];
	}
})(this);