'use strict';

var MFunction={
		Sigmoidea:function(X){			
			var result=NaN;
			if(!isNaN(X)){
				result=1/(1+Math.exp(-X));
			}else if(X.length>0){
				result=X.copyWithin();
				for(var i=0,m=result.length;i<m;i++){
					if(!isNaN(X[i])){
						result[i]=1/(1+Math.exp(-X[i]));
					}else{
						for(var j=0,p=result[i].length;j<p;j++){
							result[i][j]=1/(1+Math.exp(-X[i][j]));
						}						
					}
				}
			}
			return result;
		},
		Sinuisodal:function(X,K){
			return Math.sin(X+K);
		},
		Normalized:function(X,min,max){
			return (X-min)/(max-min);
		},
		Media:function(X){
			var n=X.length,sum=0;
			for(var i=0;i<n;i++){
				sum+=X[i];
			}
			return sum/n;
		},
		MediaDeviation:function(X,Md){
			var DM=0,n=X.length;
			for(var i=0;i<n;i++){
				DM+=Math.abs(X[i]-Md);
			}
			return DM/n;
		},
		StandarDeviation:function(X,Md){
			var S=0,n=X.length;
			for(var i=0;i<n;i++){
				S+=X[i]-Md;
			}
			return Math.sqrt(S/n);
		},
		CuadraticEq:function(A,B,C){
			return (-B+Math.sqrt((Math.pow(B,2)-(4*A*C))))/(2*A);
		}
	};
module.exports=MFunction;