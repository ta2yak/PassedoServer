const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://passedo-app.firebaseio.com'
});

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'Sync') {
    exports.Sync = require('./funcs/Sync');
}

if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'Fetch') {
    exports.Fetch = require('./funcs/Fetch');
}
