!function(a){var b={Position:{get:function(a,b,c,d){return d*(a+b*c)},set:function(a,b,c){var d={x:0,y:Math.floor(a/(c*b))};return d.x=(a-c*d.y*b)/c,d},scale:function(a,b,c,d,e,f){var g={x:0,y:0};return g.x=Math.floor(a*e/c),g.y=Math.floor(b*f/d),g},getStep:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)if(0!=a[e]){var g=b.Position.set(e,c,1);g.index=e,g.rgbIndex=b.Position.get(g.x,g.y,c,4),d[d.length]=g}return d}},resize:function(a,c,d,e,f,g){for(var h=new ImageData(e,f),i=c+e,j=d+f,k=d,l=0;k<j;k++)for(var m=c;m<i;m++){var n=b.Position.get(m,k,g,4);h.data[l]=a[n],h.data[l+1]=a[n+1],h.data[l+2]=a[n+2],h.data[l+3]=a[n+3],l+=4}return h},scale:function(a,c,d,e,f){for(var g=new ImageData(e,f),h=0;h<f;h++)for(var i=0;i<e;i++){var j=b.Position.scale(i,h,e,f,c,d),k=b.Position.get(j.x,j.y,c,4),l=b.Position.get(i,h,e,4);g.data[l]=a[k],g.data[l+1]=a[k+1],g.data[l+2]=a[k+2],g.data[l+3]=a[k+3]}return g},resizeBin:function(a,c,d,e,f,g){for(var h=new BinaryObject(e,f),i=c+e,j=d+f,k=d,l=0;k<j;k++)for(var m=c;m<i;m++){var n=b.Position.get(m,k,g,1);h.bin[l]=a[n],l++}},Erosion:function(a,c,d,e,f){for(var g=new Uint8Array(a.length),h=[],i=0,j=c.length;i<j;i++){for(var k=b.Position.get(c[i].x,c[i].y,e,1),l=!1,m=0,n=d.length;m<n;m++){var o=c[i].x+d[m].x,p=c[i].y+d[m].y,q=o+p*e;if(0==a[q]){f instanceof Function&&f(k),h[h.length]={x:o,y:p,index:q,rgbIndex:4*q},l=!0;break}}0==l&&(g[k]=1,h[h.length]=c[i])}return[g,h]},Dilation:function(a,c,d,e,f){for(var g=new Uint8Array(a.length),h=[],i=0,j=c.length;i<j;i++){var k=b.Position.get(c[i].x,c[i].y,e,1);g[k]=1,h[h.length]=c[i];for(var l=0,m=d.length;l<m;l++){var n=c[i].x+d[l].x,o=c[i].y+d[l].y,p=n+o*e;0==a[p]&&(g[p]=1,h[h.length]={y:o,x:n,index:p,rgbIndex:4*p},f instanceof Function&&f(p))}}return[g,h]},inmultiply:function(a,b){for(var c=new Uint8ClampedArray(a.length),d=0,e=c.length;d<e;d++)c[d]=bin[d]*b[d];return c},translate:function(a,c,d,e,f,g){for(var h=new Uint8ClampedArray(a.length),i=g+d,j=b.Position.get(d,e,f,4),k=source.length;j<k;j+=4){var l=b.Position.set(j,f,4);h[j]=a[j],h[j+1]=a[j+1],h[j+2]=a[j+2],l.x<=i&&l.x>=d&&l.y>=e&&(h[j]=c[j],h[j+1]=c[j+1],h[j+2]=c[j+2])}return h},translateBin:function(a,c,d,e,f,g){for(var h=new Uint8ClampedArray(a.length),i=g+d,j=b.Position.get(d,e,f,1),k=source.length;j<k;j++){var l=b.Position.set(j,f,1);h[j]=a[j],l.x<=i&&l.x>=d&&l.y>=e&&(h[j]=c[j])}return h},complement:function(a){for(var b=new Uint8ClampedArray(a.length),c=(w2+x,0),d=a.length;c<d;c++)b[c]=1==a[c]?0:1;return object},intersection:function(a,b){for(var c=new Uint8ClampedArray(a.length),d=(w2+x,0),e=a.length;d<e;d++)a[d]==b[d]&&(c[d]=1);return c},different:function(a,b){for(var c=new Uint8ClampedArray(a.length),d=(w2+x,0),e=a.length;d<e;d++)a[d]!=b[d]&&(c[d]=1);return c},Conexa:function(a,c){console.time("Hola");for(var d={},e={},f={},g=1,h=0,i=a.length;h<i;h++)if(0!=a[h]){var j=b.Position.set(h,c,1),k=[{x:j.x-1,y:j.y-1,index:b.Position.get(j.x-1,j.y-1,c,1)},{x:j.x,y:j.y-1,index:b.Position.get(j.x,j.y-1,c,1)},{x:j.x+1,y:j.y-1,index:b.Position.get(j.x+1,j.y-1,c,1)},{x:j.x-1,y:j.y,index:b.Position.get(j.x-1,j.y,c,1)},{x:j.x+1,y:j.y,index:b.Position.get(j.x+1,j.y,c,1)}];k[3].x>=0&&a[k[3].index]!=g&&0!=a[k[3].index]&&(g=a[k[3].index]),a[h]=g,k[0].x>=0&&k[0].y>=0&&0!=a[k[0].index]&&(d[a[k[0].index]]=g),k[1].x>=0&&k[1].y>=0&&0!=a[k[1].index]&&(d[a[k[1].index]]=g),k[2].x<c&&k[2].y>=0&&0!=a[k[2].index]&&(d[a[k[2].index]]=g),g++}for(var h in d){var l,m=d[h];for(e[h]=[d[h]];l=d[m];)e[h].push(l),delete d[m],m=l;for(var n=0,i=e[h].length;n<i;n++)f[e[h][n]]=parseInt(h)}for(var h=0,i=a.length;h<i;h++)0!=a[h]&&f[a[h]]&&(a[h]=f[a[h]]);console.timeEnd("Hola")}};a.BinaryObject=function(a,c){this.bin=new Int8Array(a*c),this.width=a,this.height=c,this.step=[],this.resize=function(a,c,d,e){return b.resizeBin.apply(null,[this,a,c,this.width,this.height])},this.getStep=function(){return this.step=b.Position.getStep.apply(null,[this.bin,this.width]),this.step},this.Erosion=function(a,c){var d=b.Erosion.apply(null,[this.bin,this.step,a,this.width,c]);return this.bin=d[0],this.step=d[1],d},this.Dilation=function(a,c){var d=b.Dilation.apply(null,[this.bin,this.step,a,this.width,c]);return this.bin=d[0],this.step=d[1],d},this.Translate=function(a,c,d,e){var f=b.translateBin.apply(null,[this.bin,a,c,d,this.width,e]);return this.bin=f[0],this.step=f[1],f},this.Conexa=function(){b.Conexa.apply(null,[this.bin,this.width])},this.Threshold={Skin:function(a,b){switch(b){case"HSV":default:for(var c=0,d=a.length;c<d;c+=4){var e=Colors.RGB.parseToHSV(a[c],a[c+1],a[c+2]);1==Colors.HSV.isHuman(e.h,e.s,e.v)?this.bin[c/4]=1:this.bin[c/4]=0}break;case"YCrCb":for(var c=0,d=a.length;c<d;c+=4){var e=Colors.RGB.parseToYCrCb(a[c],a[c+1],a[c+2]);1==Colors.YCrCb.isHuman(e.Cr,e.Cb)?this.bin[c/4]=1:this.bin[c/4]=0}break;case"RGB":for(var c=0,d=a.length;c<d;c+=4)1==Colors.RGB.isHuman(a[c],a[c+1],a[c+2])?this.bin[c/4]=1:this.bin[c/4]=0}this.getStep()}.bind(this)}},ImageData.prototype.cloneImage=function(a,c,d,e){return b.resize.apply(null,[this.data,a,c,d,e,this.width])},ImageData.prototype.scale=function(a,c){return b.scale.apply(null,[this.data,this.width,this.height,a,c])},a.Morphology=b}(this);