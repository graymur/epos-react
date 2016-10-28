if (process.env.NODE_ENV === 'production') {
    module.exports = require('./App.prod.jsx');
} else {
    module.exports = require('./App.dev.jsx');
}