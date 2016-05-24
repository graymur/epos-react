var webpack = require('webpack');

var plugins = [];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }));

    plugins.push(
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
    );
}

module.exports = {
    entry: {
        'main': './_src/js/client/main.jsx'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['_src/js', 'node_modules']
    },
    output: {
        path: __dirname + '/js',
        publicPath: '/',
        filename: '[name].js'
    },
    plugins: plugins
};