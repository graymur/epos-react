var webpack = require('webpack');

var plugins = [];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    }));
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