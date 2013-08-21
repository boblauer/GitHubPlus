module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    browserify: {
      app: {
        src: ['src/js/app.js'],
        dest: 'src/js/out/ghplus.js',
        options: {
          alias: [
            'src/js/libs/jquery-shim.js:jquery',
            'src/js/libs/parse.js:parse',
            './config.js:config',
            'src/js/templates/field-types/datepicker.js:datepicker'
          ],
          shim: {
            jqueryui: {
              path: 'src/js/libs/jquery-ui-1.10.3.custom.js',
              exports: ''
            }
          }
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/css', src: ['**'], dest: 'chrome/css' },
          { expand: true, cwd: 'src/js/', src: ['_inject.js'], dest: 'chrome/js' },
          { expand: true, cwd: 'src/js/out', src: ['ghplus.js'], dest: 'chrome/js' }
        ]
      }
    }
  });

  grunt.registerTask('default', ['browserify', 'copy']);
};
