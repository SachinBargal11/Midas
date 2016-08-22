module.exports = {
    options: {
        sfx: true,
        minify: true,
        sourceMaps: false,
        build: {
            mangle: false
        },
        builder: {
            baseURL: '<%= compiledLocation %>',
			paths: {
				'node_modules/*': './node_modules/*'
			},
            map: {
                '@angular': 'node_modules/@angular',
                'rxjs': 'node_modules/rxjs',
                'reflect-metadata': 'node_modules/reflect-metadata/Reflect.js',
                'angular2-notifications': 'node_modules/angular2-notifications',
                'ng2-bootstrap': 'node_modules/ng2-bootstrap',
                'moment' : 'node_modules/moment/moment.js',
                'immutable' : 'node_modules/immutable/dist/immutable.js',
                'underscore' : 'node_modules/underscore/underscore.js',
                'jquery': 'node_modules/jquery/dist/jquery.min.js',
                'primeng': 'node_modules/primeng',
                'jquery.inputmask': 'node_modules/jquery.inputmask/dist/jquery.inputmask.bundle.js',
                'jquery.ui': '//code.jquery.com/ui/1.11.4/jquery-ui.min.js',                
                'jquery-ui-timepicker-addon': 'node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.js'                
            },
            meta: 
            {
                'primeng' : {
                    deps: [
                        'jquery.ui',
                        'jquery-ui-timepicker-addon',
                        'jquery.inputmask'
                    ]
                },
                'jquery-ui': {
                    deps: [
                        'jquery'
                    ]
                },
                'jquery.inputmask': {
                    deps: [
                        'jquery'
                    ]
                },
                'jquery-ui-timepicker-addon': {
                    deps: [
                        'jquery.ui'
                    ]
                }
            },
            packages: {
                'scripts': {
                    defaultExtension: 'js'
                },
                'services': {
                    defaultExtension: 'js'
                },
                'models': {
                    defaultExtension: 'js'
                },
                'stores': {
                    defaultExtension: 'js'
                },
                'pipes': {
                    defaultExtension: 'js'
                },
                'utils': {
                    defaultExtension: 'js'
                },
                'components': {
                    defaultExtension: 'js'
                },
                'routes': {
                    defaultExtension: 'js'
                },
                '@angular/common': {
                    main: 'bundles/common.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/forms': {
                    main: 'bundles/forms.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/compiler': {
                    main: 'bundles/compiler.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/core': {
                    main: 'bundles/core.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/http': {
                    main: 'bundles/http.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/platform-browser': {
                    main: 'bundles/platform-browser.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/platform-browser-dynamic': {
                    main: 'bundles/platform-browser-dynamic.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/router': {
                    main: 'index.js',
                    defaultExtension: 'js'
                },
                '@angular/router-deprecated': {
                    main: 'bundles/router-deprecated.umd.js',
                    defaultExtension: 'js'
                },
                '@angular/upgrade': {
                    main: 'bundles/upgrade.umd.js',
                    defaultExtension: 'js'
                },
                'rxjs': {
                    defaultExtension: 'js'
                },
                'angular2-notifications': { 
                    main: 'components.js', 
                    defaultExtension: 'js' 
                },
                'ng2-bootstrap': {
                    main: 'ng2-bootstrap.js',
                    defaultExtension: 'js'
                },
                'primeng': {
                    defaultExtension: 'js'
                }
            }
        }
    },
    dist: {
        files: [{
            src: 'scripts/bootstraper.js',
            dest: '<%= distLocation %>/scripts/bootstraper.js'
        }]
    }
};