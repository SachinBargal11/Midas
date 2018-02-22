module.exports = {
	development: {
        options: {
            data: {
                externalComponentsDirectory: '..',
                base: '<%= compiledLocation %>'
            }
        },
		src: '<%= srcLocation %>/index.html',
		dest: '<%= compiledLocation %>/'
	},
	dist: {
        options: {
            data: {
                externalComponentsDirectory: '.',
                base: '<%= distLocation %>'
            }
        },
		src: '<%= srcLocation %>/index.html',
		dest: '<%= distLocation %>/'
	}
};
