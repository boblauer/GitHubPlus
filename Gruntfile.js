module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({

    browserify: {
      app: {
        src: ['src/js/app.js'],
        dest: 'src/_out/js/ghplus.max.js',
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
    concat: {
      css: {
        src: ['src/css/jquery-ui-1.10.3.custom.css', 'src/css/ghplus.css', 'src/css/tab.css'],
        dest: 'src/_out/css/ghplus.max.css',
      },
    },
    uglify: {
      app: {
        files: {
          'src/_out/js/ghplus.js': ['src/_out/js/ghplus.max.js']
        }
      }
    },
    cssmin: {
      app: {
        files: {
          'src/_out/css/ghplus.css': ['src/_out/css/ghplus.max.css']
        }
      }
    },
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/js', src: ['_inject.js'], dest: '_chrome/js' },
          { expand: true, cwd: 'src/css/images', src: ['*'], dest: '_chrome/css/images' },
          { expand: true, cwd: 'src/_out/css/', src: ['ghplus.css'], dest: '_chrome/css' },
          { expand: true, cwd: 'src/_out/js', src: ['ghplus.js'], dest: '_chrome/js' }
        ]
      }
    }
  });

  grunt.registerTask('default', ['browserify', 'concat', 'uglify', 'cssmin', 'copy']);
};
