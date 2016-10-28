var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config-dev.js');
var path = require('path');
var fs = require('fs');
var mainPath = path.resolve(__dirname, '..', 'app', 'main.js');

module.exports = function (host = 'localhost', port = 3001) {
    var bundleStart = null;
    var compiler = Webpack(webpackConfig);

    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    var bundler = new WebpackDevServer(compiler, {
        publicPath: `http://${host}:${port}/js/`,
        hot: true,
        quiet: false,
        inline: true,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    bundler.listen(port, host, function () {
        console.log('Bundling project, please wait...');
    });
};