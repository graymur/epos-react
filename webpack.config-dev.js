var path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

var validate = require('webpack-validator');
var pkg = require('./package.json');

const PATHS = {
    app: path.join(__dirname, '_src', 'js', 'client', 'main.jsx'),
    build: path.join(__dirname, 'public')
};

const sassLoaders = [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader'
];

var plugins = [];

var config = {
    entry: {
        main: PATHS.app
    },
    module: {
        loaders: [{
            test: /\.(scss|sass)$/,
            loaders: sassLoaders
        },{
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file?name=fonts/[name].[ext]&name=fonts/[name].[ext]'
        },{
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml&name=img/[name].[ext]'
        }]
    },
    output: {
        publicPath: '/',
        path: PATHS.build,
        filename: '[name].js'
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};

        var host = 'localhost';
        var port = 3000;
        var url = `http://${host}:${port}/`;

        config.module.loaders.unshift({
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        });

        config.devtool = 'eval-source-map';
        config.output.publicPath = url;

        config.devServer = {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: host,
            port: port,
            publicPath: config.output.publicPath
        };

        plugins.push(new ExtractTextPlugin('[name].css', {
            allChunks: true
        }));

        plugins.push(new webpack.HotModuleReplacementPlugin());

        config.entry.main.app = [
            `webpack-dev-server/client/?${url}`,
            'webpack/hot/dev-server',
            config.entry.main.app
        ];

        config.module.preLoaders = [{
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            exclude: /node_modules/
        }];

        config.eslint = {
            configFile: './.eslintrc',
            emitWarning: true
        };

plugins.push(new HtmlWebpackPlugin({
    template: './_src/js/server/layout.html'
}));

config.plugins = plugins;

module.exports = config;