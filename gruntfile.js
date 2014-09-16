module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['jq.js'],
        dest: 'bin/jade-query.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'bin/jade-query.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'jq.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['jq.js', 'jade.js', 'gruntfile.js'],
      tasks: ['jshint', 'concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('watch', ['watch']);

};
