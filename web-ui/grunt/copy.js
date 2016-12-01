module.exports = {
	development: {
		files: [{
			cwd: '<%= srcLocation %>/templates/',
			src: ['**/*.*'],
			dest: '<%= compiledLocation %>/templates/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/styles/assets/',
			src: ['**/*.*'],
			dest: '<%= compiledLocation %>/styles/assets/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/theme/',
			src: ['css/main.css', 'fonts/**/*.*', 'img/**/*.*'],
			dest: '<%= compiledLocation %>/theme/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/external/',
			src: ['**/*.*'],
			dest: '<%= compiledLocation %>/external/',
			expand: true
    	}]
	},
	dist: {
		files: [{
			cwd: '<%= srcLocation %>/templates/',
			src: ['**/*.*'],
			dest: '<%= distLocation %>/templates/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/styles/assets/',
			src: ['**/*.*'],
			dest: '<%= distLocation %>/styles/assets/',
			expand: true
    	}, {
			cwd: '<%= srcLocation %>/theme/',
			src: ['css/main.css', 'fonts/**/*.*', 'img/**/*.*'],
			dest: '<%= distLocation %>/theme/',
			expand: true
    	}, {
			cwd: 'node_modules/es6-shim/',
			src: ['es6-shim.min.js'],
			dest: '<%= distLocation %>/node_modules/es6-shim/',
			expand: true
    	}, {
			cwd: 'node_modules/zone.js/dist/',
			src: ['zone.js'],
			dest: '<%= distLocation %>/node_modules/zone.js/dist/',
			expand: true
    	}, {
			cwd: 'node_modules/reflect-metadata/',
			src: ['Reflect.js'],
			dest: '<%= distLocation %>/node_modules/reflect-metadata/',
			expand: true
    	}, {
			cwd: 'node_modules/systemjs/dist/',
			src: ['system.src.js'],
			dest: '<%= distLocation %>/node_modules/systemjs/dist/',
			expand: true
    	}, {
			cwd: 'node_modules/bootstrap/dist/',
			src: ['css/bootstrap.min.css'],
			dest: '<%= distLocation %>/node_modules/bootstrap/dist/',
			expand: true
    	}, {
			cwd: 'node_modules/font-awesome/',
			src: ['css/font-awesome.min.css', 'fonts/**/*.*'],
			dest: '<%= distLocation %>/node_modules/font-awesome/',
			expand: true
    	}, {
			cwd: 'node_modules/primeui/',
			src: ['primeui-ng-all.min.css', 'images/**/*.*', 'themes/bootstrap/**/*.*'],
			dest: '<%= distLocation %>/node_modules/primeui/',
			expand: true
    	}, {
			cwd: 'node_modules/primeng/',
			src: ['resources/primeng.min.css'],
			dest: '<%= distLocation %>/node_modules/primeng/',
			expand: true
    	},{
			cwd: 'node_modules/jquery-ui-timepicker-addon/',
			src: ['dist/jquery-ui-timepicker-addon.min.js'],
			dest: '<%= distLocation %>/node_modules/jquery-ui-timepicker-addon/',
			expand: true
    	}, {
			cwd: 'node_modules/jquery.inputmask/',
			src: ['dist/jquery.inputmask.bundle.js'],
			dest: '<%= distLocation %>/node_modules/jquery.inputmask/',
			expand: true
    	}, {
			cwd: 'node_modules/jquery/',
			src: ['dist/jquery.min.js'],
			dest: '<%= distLocation %>/node_modules/jquery/',
			expand: true
    	},{
			cwd: 'node_modules/datatables/',
			src: ['media/js/jquery.dataTables.min.js', 'media/css/jquery.dataTables.min.css'],
			dest: '<%= distLocation %>/node_modules/datatables/',
			expand: true
    	},{
			cwd: 'node_modules/moment/',
			src: ['moment.js'],
			dest: '<%= distLocation %>/node_modules/moment/',
			expand: true
    	},{
			cwd: '<%= srcLocation %>/external/',
			src: ['**/*.*'],
			dest: '<%= distLocation %>/external/',
			expand: true
    	}]
	}
};
