module.exports = function(grunt)
{
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt, {
        config: {
            srcLocation: 'src',
            compiledLocation: 'compiled',
            distLocation: 'dist'
        }
    });

    grunt.registerTask('default', ['sass:development', 'postcss:development', 'eslint', 'copy:development', 'htmlbuild:development']);
    grunt.registerTask('dist', ['clean:dist', 'sass:dist', 'postcss:dist', 'eslint', 'ts:dist', 'uglify:dist', 'copy:dist', 'htmlbuild:dist']);
};
