if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'Sync') {
    exports.Sync = require('./funcs/Sync');
}
