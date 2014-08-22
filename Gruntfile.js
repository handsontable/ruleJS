/**
 * Installation:
 * 1. Install Grunt CLI (`npm install -g grunt-cli`)
 * 1. Install Grunt 0.4.0 and other dependencies (`npm install`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where Gruntfile.js is)
 * To execute automatically after each change, execute `grunt --force default watch`
 * To execute build followed by the test run, execute `grunt test`
 *
 * See http://gruntjs.com/getting-started for more information about Grunt
 */
module.exports = function (grunt) {
  grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      inject: {
        single: {
          files: {
            'dist/index.html': 'src/index.html'
          }
        }
      },

      // GENERATED PARSER USING JISON LIBRARY
      jison: {
        target : {
          options: {moduleType: 'js', moduleName: 'Parser'},
          files: {'src/parser/parser.js': 'src/parser/parser.jison'}
        }
      },

      // COPY FILES FROM DESIGN DIRECTORY TO DIST DIRECTORY
      copy: {
        main: {
          files: [
            {
              src: 'src/index.html',
              dest: 'dist/index.html'
            },
            {
              src: 'lib/underscore.string/lib/underscore.string.js',
              dest: 'dist/lib/underscore.string/underscore.string.js'
            },
            {
              src: 'lib/moment/moment.js',
              dest: 'dist/lib/moment/moment.js'
            },
            {
              src: 'lib/lodash/dist/lodash.js',
              dest: 'dist/lib/lodash/lodash.js'
            },
            {
              src: 'lib/numeral/numeral.js',
              dest: 'dist/lib/numeral/numeral.js'
            },
            {
              src: 'lib/numericjs/src/numeric.js',
              dest: 'dist/lib/numericjs/numeric.js'
            },
            {
              src: 'lib/js-md5/js/md5.js',
              dest: 'dist/lib/js-md5/md5.js'
            },
            {
              src: 'lib/jstat/dist/jstat.js',
              dest: 'dist/lib/jstat/jstat.js'
            },
            {
              src: 'lib/formulajs/lib/formula.js',
              dest: 'dist/lib/formulajs/formula.js'
            },
            {
              src: 'src/js/ruleJS.js',
              dest: 'dist/js/ruleJS.js'
            },
            {
              src: 'src/parser/parser.js',
              dest: 'dist/js/parser.js'
            }
//            ,{
//              expand: true,
//              cwd: 'src/js/',
//              src: ['**'],
//              dest: 'dist/js/'
//            }
          ]
        }
      },

//			ruleJS: {
//        full: [
//          'src/parser/parser.js',
//          'src/js/ruleJS.js'
//        ]
//			},
//
//      // CONCAT FILES
//      concat: {
//        dist: {
//          files: {
//            'dist/js/ruleJS-full.js': [
//              '<%= ruleJS.full %>'
//            ]
//          }
//        }
//      },

      // WATCH CHANGES
      watch: {
        options: {
          livereload: true //works with Chrome LiveReload extension. See: https://github.com/gruntjs/grunt-contrib-watch
        },
        files: [
          'src/*.html',
          'src/js/*.js',
          'src/parsers/*.jison'
        ],
        tasks: ['build']
      },
      clean: {
        dist: ['tmp']
      },
      replace: {
        dist: {
          options: {
            variables: {
              version: '<%= pkg.version %>',
              timestamp: '<%= (new Date()).toString() %>'
            }
          }
        }
      },

      connect: {
        dev: {
          options: {
            port: 8080,
            hostname: "0.0.0.0",
            base: "dist",
            keepalive: true
          }
        }
      }
    }
  );

  // DEFAULT TASKS
  grunt.registerTask('default', ['jison', 'copy', 'replace:dist', 'clean']);
  grunt.registerTask('dev', ['config:dev', 'inject', 'replace:dist', 'clean', 'uglify']);
  grunt.registerTask('prod', ['config:prod', 'inject', 'replace:dist', 'clean', 'copy', 'uglify']);
  grunt.registerTask('uat', ['config:uat', 'inject', 'replace:dist', 'clean', 'copy', 'uglify']);

//  grunt.registerTask('default', ['jison', 'copy', 'replace:dist', 'concat', 'clean']);
//  grunt.registerTask('dev', ['config:dev', 'inject', 'replace:dist', 'concat', 'clean', 'uglify']);
//  grunt.registerTask('prod', ['config:prod', 'inject', 'replace:dist', 'concat', 'clean', 'copy', 'uglify']);
//  grunt.registerTask('uat', ['config:uat', 'inject', 'replace:dist', 'concat', 'clean', 'copy', 'uglify']);
  grunt.registerTask('build', ['default', 'copy']);
  grunt.registerTask('start', ['copy', 'connect']);

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-config');
  grunt.loadNpmTasks('grunt-inject');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jison');
};
