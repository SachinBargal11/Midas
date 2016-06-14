module.exports = {
	development: {
        options: {
            data: {
                externalComponentsDirectory: '..'
            }
        },
		src: '<%= srcLocation %>/index.html',
		dest: '<%= compiledLocation %>/'
	},
	dist: {
        options: {
            data: {
                externalComponentsDirectory: '.'
            }
        },
		src: '<%= srcLocation %>/index.html',
		dest: '<%= distLocation %>/'
	}
};
