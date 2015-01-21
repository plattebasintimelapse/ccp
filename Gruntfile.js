'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({

        config: config,
        aws: grunt.file.readJSON("secrets.json"),
        app: grunt.file.readJSON("app_config.json"),
        vigs: grunt.file.readJSON("app/content/vigs.json"),

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            bake: {
                files: ['<%= config.app %>/templates/**', '<%= config.app %>/content/content.json'],
                tasks: ['bake:build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.app %>/images/{,*/}*'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // for (var i=0; i < vigs.all.length; i++ ) {
        //     console.log(i);
        // }

        bake: {
            build: {
                options: {
                    content: '<%= config.app %>/content/content.json'
                },
                files: {
                    '<%= config.app %>/index.html': '<%= config.app %>/templates/intro.html',
                    '<%= config.app %>/history/index.html': '<%= config.app %>/templates/one.html',
                    '<%= config.app %>/problem/index.html': '<%= config.app %>/templates/two.html',
                    '<%= config.app %>/hope/index.html': '<%= config.app %>/templates/three.html',
                    '<%= config.app %>/vig-end/<%= vigs.all[2].single %>.html': '<%= config.app %>/vig-start/<%= vigs.all[0].single %>.html',
                }
            }
        },

        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        sass: {
            options: {
                loadPath: [
                    'bower_components'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.scss'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        bowerInstall: {
            app: {
                src: ['<%= config.app %>/templates/partials/footer.html']
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}']
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                         '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        '!templates/{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        'media/{,*/}*.*',
                        'images/{,*/}*.*',
                        'data/{,*/}*.*',
                        'content/{,*/}*.*' // CHANGE THIS LATER!!!
                    ]
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '.',
                    dest: '<%= config.dist %>/fonts',
                    src: ['bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*',
                        'bower_components/font-awesome/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '!<%= config.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        concurrent: {
            server: [
                'sass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'sass',
                'copy:styles',
                'svgmin'
            ]
        },

        aws_s3: {
            options: {
                accessKeyId: '<%= aws.accessKeyId %>',
                secretAccessKey: '<%= aws.secretAccessKey %>',
                region: '<%= aws.region %>',
                uploadConcurrency: 5
            },
            production: {
                options: {
                    bucket: 'projects.plattebasintimelapse.com'
                },
                files: [
                    {expand: true, cwd: 'dist/', src: ['**'], dest: '<%= app.PRODUCTION %>'}
                ]
            },
            staging: {
                options: {
                    bucket: 'staging.plattebasintimelapse.com'
                },
                files: [
                    {expand: true, cwd: 'dist/', src: ['**'], dest: '<%= app.STAGING %>'}
                ]
            }
        }
    });



    grunt.registerTask('ysha', function (target) {
        grunt.log.writeln( '*****************');
        grunt.log.writeln( '*****************');
        grunt.log.writeln( '** Ysha rules! **');
        grunt.log.writeln( '*****************');
        grunt.log.writeln( '*****************');
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'bake',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('stage', [
        'build',
        'aws_s3:staging'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'aws_s3:production'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
