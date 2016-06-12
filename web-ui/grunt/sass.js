module.exports = {
    options: {
        includePaths: [
            'node_modules/bourbon/app/assets/stylesheets'
        ]
    },
    development: {
        options: {
            style: 'expanded',
            sourceMap: true
        },
        files: {
            '<%= compiledLocation %>/styles/styles.css': '<%= srcLocation %>/styles/styles.scss'
        }
    },
    dist: {
        options: {
            style: 'compressed'
        },
        files: {
            '<%= distLocation %>/styles/styles.css': '<%= srcLocation %>/styles/styles.scss'
        }
  }
};
