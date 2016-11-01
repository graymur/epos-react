var nodeExternals = require('webpack-node-externals');
var path = require('path');

const basePath = path.resolve(path.join(__dirname, '..'));

module.exports = {
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
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [path.join(basePath, '_src/js'), 'node_modules']
    },
    target: 'node',
    externals: [nodeExternals()]
};