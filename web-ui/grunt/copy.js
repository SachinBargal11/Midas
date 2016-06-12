module.exports = {
	development: {
		files: [{
			cwd: '<%= srcLocation %>/templates/',
			src: [ '**/*.*' ],
			dest: '<%= compiledLocation %>/templates/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/styles/assets/',
			src: [ '**/*.*' ],
			dest: '<%= compiledLocation %>/styles/assets/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/theme/css/',
			src: [ '**/*.*' ],
			dest: '<%= compiledLocation %>/theme/css/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/theme/fonts/',
			src: [ '**/*.*' ],
			dest: '<%= compiledLocation %>/theme/fonts/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/theme/img/',
			src: [ '**/*.*' ],
			dest: '<%= compiledLocation %>/theme/img/',
			expand: true
    	}]
	},
	dist: {
		files: [{
			cwd: '<%= srcLocation %>/styles/assets/',
			src: [ '**/*.*' ],
			dest: '<%= distLocation %>/styles/assets/',
			expand: true
    	}, {
			cwd: 'node_modules/bootstrap/dist/',
			src: [ 'css/bootstrap.min.css', 'fonts/*.*' ],
			dest: '<%= distLocation %>/node_modules/bootstrap/dist/',
			expand: true
    	}, {
			cwd: 'node_modules/font-awesome/',
			src: [ 'css/font-awesome.min.css', 'fonts/*.*' ],
			dest: '<%= distLocation %>/node_modules/font-awesome/',
			expand: true
    	}]
	}
};
