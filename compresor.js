// Using YUI Compressor for JS 
new compressor.minify({
  type: 'yui-js',
  fileIn: 'src/*.js',
  fileOut: 'src/*.min.js',
  callback: function(err, min){
    console.log(err);
    //console.log(min); 
  }
});
