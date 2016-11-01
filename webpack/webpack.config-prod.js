var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var autoprefixer = require('autoprefixer');
var precss = require('precss');

const basePath = path.resolve(path.join(__dirname, '..'));

const config = {
    entry: {
        main: path.join(basePath, '_src/js/client/main.jsx')
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.(scss|sass)$/,
            loaders: [
                'style-loader',
                'css-loader?sourceMap',
                'postcss-loader',
                'sass-loader' //?outputStyle=expanded&includePaths[]=' + path.resolve('./node_modules/compass-mixins/lib')
            ]
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [path.join(basePath, '_src/js'), 'node_modules']
    },
    output: {
        path: path.join(basePath, 'public'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    postcss: function () {
        return [autoprefixer, precss/*, postcssMoveMedia*/];
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unsafe: true
            },
            output: {
                comments: function(node, comment) {
                    if (comment.type === 'comment2') {
                        return /@copyright/i.test(comment.value);
                    }
                }
            }
        })
    ]
};

config.module.loaders.filter(loader =>
    loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
).forEach(loader => {
    const [first, ...rest] = loader.loaders;
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
});

config.plugins.push(new ExtractTextPlugin('css/[name].css', {
    allChunks: true
}));

module.exports = config;