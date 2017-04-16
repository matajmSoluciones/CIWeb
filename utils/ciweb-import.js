var Path= require('path'),
    fs  = require('fs');

var options={
	output:"",
	input:"",
	encode:'ascii',
	col:0,
	row:0,
	dimension:0
};

var args = process.argv.slice(2);

while(args.length){
  var arg = args.shift();
	switch(arg){
	    case '--version':
	      printVersion();
	    case '-o':
	    case '--output':
	        options.output = args.shift();        
	    break;
	    case '--col':
	        options.col = args.shift();        
	    break;
	    case '--row':
	        options.row = args.shift();        
	    break;
	    case '--d':
	        options.dimension = args.shift();        
	    break;
	    case "-i":
	    case "--input":
	    	options.input  = args.shift();
	    break;
	    case "--encode":
	    	options.encode=args.shift();
	    break;
	    case '--help':
	    case '-h':
        	help();
        break;

	  }
}
if(!fs.existsSync(options.input)){
	throw new Error("El archivo a importar no existe!");
}
fs.readFile(options.input, options.encode,(error,str)=>{
	if (error) throw error;
	const utils=require("./utils.js");
	var data=utils.string2Array(str,options.col,options.row,options.dimension);
	var result=JSON.stringify(data,2,"\t");
	fs.writeFile(options.output, result, (err) => {
		if (err) throw err;
		console.log('Cambios guardados satisfactoriamente...');
	});
});
function printVersion(){
  console.log("0.0.1");
  process.exit(0);
}

function help(){
  process.stdout.write([
    'USAGE: ciweb-import [--options]'
  , ''
  , 'Options:'
  , '  --output || -o FILENAME    - Indica la direccion del archivo de importacion'
  , '  --input || -i  PATH        - Indica la entrada del archivo a importar'
  , '  --encode                    - El formato de entrada del archivo'
  , '  -h, --help                 - display this help and exit'
  , '  --col                      - Numero de columnas'
  , '  --row                      - Numero de filas'
  , '  --d                        - dimension de la matriz'
  , ''
  ].join("\n"));

  process.exit(-1);
}