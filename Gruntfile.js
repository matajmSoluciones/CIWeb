module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
		    my_target: {
		      files: [{
		          expand: true,
		          cwd: './src',
		          src: '**/*.js',
		          dest: './min'
		      }]
		    }		  
		}		
	});
	// Load the plugin that provides the "uglify" task.
	  grunt.loadNpmTasks('grunt-contrib-uglify');

	  // Default task(s).
	  grunt.registerTask('default', ['uglify']);
}