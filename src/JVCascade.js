(function(Global){
	if(!Global.Matrix){
		throw new Error("Este objeto requiere la librería Matrix para continuar!");
	}
	Global.JVCascade={
		Weak:function(input,weight,T){
			if(!T){
				T=0.5;
			}
			var sum=0,m=weight.length;		
			for(var i=0;i<m;i++){			
				var h=MFunction.Sigmoidea(Matrix.inmultiply(input,weight[i]));
				sum+=h;
			}
			max=(1/m)*sum;
			if(max>=T){
				return false;
			}
			return true;
		},
		Strong:function(input,CASCADE,T){
			if(!T){
				T=0.5;
			}
			for(var i=0,n=CASCADE.length;i<n;i++){
				if(!JVCascade.Weak(input,CASCADE[i],T)){
					return false;
				}
			}
			return true;
		},
		OneVsAll:function(input,weight,T){
			if(!T){
				T=0.5;
			}
			for(var i=0,max=0,h=MFunction.Sigmoidea(Matrix.inmultiply(input,weight))[0],n=h.length;i<n;i++){						
				if(h[i]>max){
					max=h[i];
					value=i;
				}
			}
			if(max<T){
				return false;
			}
			return [value,max];
			/*if(value>-1){
				if(max<T){
					value=-1;
				}
			}		*/
			//return [value,max];
		}
	}
	Global.JV
})(this);