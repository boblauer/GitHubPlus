module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');

  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['chrome/js/jquery-1.9.1.js', 'chrome/js/jquery-ui-1.10.3.custom.js', 'chrome/js/main.js'],
        dest: 'chrome/js/ghplus.js',
      },
    },
  });

  grunt.registerTask('default', ['concat']);

};