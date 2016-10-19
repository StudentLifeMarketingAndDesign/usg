module.exports = function(grunt) {

  var globalConfig = {
    themeDir: 'themes/uisg'
  };

  // Project configuration.
  grunt.initConfig({

    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    
    //compile the sass

    sass: {
      dist: { 
        files: {
          '<%=globalConfig.themeDir %>/css/master.css' : '<%=globalConfig.themeDir %>/scss/master.scss',
          '<%=globalConfig.themeDir %>/css/editor.css' : 'division-project/scss/editor.scss'
        },                  // Target
        options: {              // Target options
          style: 'compressed',
          //sourcemap: 'true',
          loadPath: ['division-project/scss', 'division-bar/scss', 'division-project/bower_components/foundation/scss']
        }
      }
    },

    //concat all the files into the build folder

    concat: {
      js:{
        src: [
          'division-project/build/build.src.js',
          '<%=globalConfig.themeDir %>/js/*.js', 
          ],
        dest: '<%=globalConfig.themeDir %>/build/build-src.js'
      }
    },

    //minify those concated files
    //toggle mangle to leave variable names intact

    uglify: {
      options: {
        mangle: true
      },
      my_target:{
        files:{
        '<%=globalConfig.themeDir %>/build/build.js': ['<%=globalConfig.themeDir %>/build/build-src.js'],
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%=globalConfig.themeDir %>/js/*.js', '<%=globalConfig.themeDir %>/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: true,
        }
      },
      css: {
        files: ['<%=globalConfig.themeDir %>/scss/*.scss', '<%=globalConfig.themeDir %>/scss/**/*.scss', 'division-project/scss/*.scss','division-project/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: true,
        }
      },
    },
      criticalcss: {
            custom: {
                options: {
                    url: "http://localhost:8888/uisg-kit/",
                    width: 1200,
                    height: 900,
                    outputfile: "<%=globalConfig.themeDir %>/templates/Includes/CriticalCss.ss",
                    filename: "<%=globalConfig.themeDir %>/css/master.css", // Using path.resolve( path.join( ... ) ) is a good idea here
                    buffer: 800*1024,
                    ignoreConsole: false,
                    forceInclude: ['.img-container', 
                                  '.main-content', 
                                  '.sec-content', 
                                  '.sec-nav', 
                                  '.sec-nav ul', 
                                  '.sec-nav a', 
                                  '.section-title', 
                                  '.margin-top', 
                                  '.gradient', 
                                  '.img-fifty-top',
                                  '.breadcrumbs',
                                  '.breadcrumbs li',
                                  '.breadcrumbs li:after',
                                  '.row',
                                  '.staff-coin-list',
                                  '.large-block-grid-3',
                                  '.large-block-grid-4',
                                  '.large-block-grid-2',
                                  '.large-block-grid-2>li',
                                  '.initiatives-list'
                                  ]
                }
            }
        },

      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            '<%=globalConfig.themeDir %>/templates/Includes/CriticalCss.ss': ['<%=globalConfig.themeDir %>/templates/Includes/CriticalCss.ss']
          }
        }
      }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-watch');
  grunt.loadNpmTasks('grunt-criticalcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task(s).
  // Note: order of tasks is very important
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin', 'watch']);

};
