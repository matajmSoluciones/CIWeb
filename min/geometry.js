!function(a){a.Geometry={Polygons:{Rectangule:{isColision:function(a,b,c,d,e,f,g,h){return!(a+c<e)&&(!(a>e+g)&&!(b>f+h))},Overlap:function(b,c,d,e,f,g,h,i){var j=0;return a.Geometry.Polygons.Rectangule.isColision(b,c,d,e,f,g,h,i)&&(j=d*e-h*i/(d*e+h*i)),j},isContent:function(a,b,c,d,e,f,g,h){var i=!1;return a+c>=e+g&&b+d>=f+h&&(i=!0),i},Scale:{Proportion:function(a,b,c,d){var e={w:c,h:d};return c>=d&&(e.w=Math.round(d*a/b),e.w>c&&(e.w=c)),a>=b&&(e.h=Math.round(b*e.w/a)),e}}}}}}(this);