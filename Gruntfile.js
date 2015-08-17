module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    sass: {
      options: {
        sourceMap: false,
        style : 'expanded',
        require: 'susy'
      },
      dist: {
        files: {
          'public/stylesheets/style.css': 'src/scss/style.scss'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'public/stylesheets/style.min.css': ['public/stylesheets/style.css']
        }
      }
    },

    uglify: {
      dist : {
        options: {
          sourceMap: true,
          sourceMapName: 'public/javascript/scripts.js.map',
        },
        files : {
          'public/javascript/scripts.min.js' : [
            'src/vendors/jquery.js',
            'src/vendors/bootstrap.js',
            'src/js/*.js'
          ]
        }
      }
    },

    compass: {
      options: {
        require: 'susy'
      }
    },

    nodemon: {
      dev: {
        script: './bin/www'
      }
    },

    concurrent: {
        target: {
            tasks: ['nodemon', 'watch:dev'],
            options: {
                logConcurrentOutput: true
            }
        }
    },

    watch: {
      build : {
        files : ['src/js/*.js','src/scss/*.scss'],
        tasks : ['uglify','sass','cssmin']
      },
      dev: {
        files : ['src/scss/*.scss'],
        tasks : ['sass']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // Default task(s).
  grunt.registerTask('default', ['sass','concurrent']);
  grunt.registerTask('build', ['sass','cssmin','uglify','concurrent']);

};