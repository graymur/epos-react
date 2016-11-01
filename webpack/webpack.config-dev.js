var Webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

const basePath = path.resolve(path.join(__dirname, '..'));

var config = {
    devtool: 'source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:3001',
        path.join(basePath, '_src/js/client/main.jsx')
    ],
    output: {
        path: path.join(basePath, 'public'),
        filename: 'main.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react', 'react-hmre']
            }
        }, {
            test: /\.(scss|sass)$/,
            loaders: [
                'style-loader',
                'css-loader?sourceMap',
                'postcss-loader',
                'sass-loader'
            ]
        }],
        preLoaders: [{
            test: /\.(js|jsx)$/,
            loader: 'eslint',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    postcss: function () {
        return [autoprefixer, precss];
    }
};

module.exports = config;