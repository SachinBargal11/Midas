module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config: {
            srcLocation: 'src',
            compiledLocation: 'compiled',
            distLocation: 'app'
        }
    });

    grunt.registerTask('default', ['tslint', 'sass:development', 'postcss:development', 'copy:development', 'htmlbuild:development']);
	grunt.registerTask('teamcity-compile', ['teamcity', 'tslint', 'sass:development', 'postcss:development', 'copy:development', 'htmlbuild:development']);
    grunt.registerTask('dist', ['tslint', 'clean:dist', 'sass:dist', 'postcss:dist', 'systemjs:dist', 'copy:dist', 'htmlbuild:dist']);
	grunt.registerTask('teamcity-dist', ['teamcity', 'tslint', 'clean:dist', 'sass:dist', 'postcss:dist', 'systemjs:dist', 'copy:dist', 'htmlbuild:dist']);
};
