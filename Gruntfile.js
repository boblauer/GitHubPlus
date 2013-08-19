module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    browserify: {
      app: {
        src: ['chrome/js/app.js'],
        dest: 'chrome/js/out/ghplus.js',
        options: {
          alias: [
            'chrome/js/libs/jquery-shim.js:jquery',
            'chrome/js/libs/parse.js:parse'
          ],
          shim: {
            jqueryui: {
              path: 'chrome/js/libs/jquery-ui-1.10.3.custom.js',
              exports: ''
            }
          }
        }
      }
    }
  });

  grunt.registerTask('default', ['browserify']);

};