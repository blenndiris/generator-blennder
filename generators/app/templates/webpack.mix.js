let mix = require('laravel-mix');
let path = 'wp-content/themes/<%= theme %>/';

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.scss/,
                loader: 'import-glob-loader'
            },
            {
                test: /\.js/,
                loader: 'import-glob-loader'
            }
        ]
        }
    })
    .js(path + 'assets/js/scripts.js', path + 'dist/js')
    .sass(path + 'assets/scss/style.scss', path + 'dist/css', {
        implementation: require('node-sass')
    })
    .options({
        processCssUrls: false,
        postCss: [
            require('autoprefixer')
        ],
        autoprefixer: {
            options: {
                browsers: [
                    'defaults',
                ]
            }
        }
    })
    .setPublicPath(path + 'dist')
    .browserSync({
        proxy: '<%= url %>',
        files: [
            path + 'dist/css/{*,**/*}.css',
            path + 'dist/js/{*,**/*}.js',
            path + '**/*.php'
        ]
    });