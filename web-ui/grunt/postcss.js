module.exports = {
    options: {
        processors: require('autoprefixer')({
            browsers: [
                'last 2 android versions',
                'last 2 ios versions',
                'last 2 versions'
            ]
        })
    },
    development: {
        options: {
            map: {
                inline: false,
                annotation: '<%= compiledLocation %>/styles/'
            }
        },
        files: {
            '<%= compiledLocation %>/styles/styles.css': '<%= compiledLocation %>/styles/styles.css'
        }
    },
    dist: {
        files: {
            '<%= distLocation %>/styles/styles.css': '<%= distLocation %>/styles/styles.css'
        }
  }
};
