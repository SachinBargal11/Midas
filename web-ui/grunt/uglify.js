module.exports = {
    options: {
        mangle: false
    },
    dist: {
        files: {
            '<%= distLocation %>/bower_components/requirejs/require.js': ['bower_components/requirejs/require.js']
        }
    }
};
