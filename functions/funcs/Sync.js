const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://passedo-app.firebaseio.com'
});

module.exports = functions.https
                          .onCall((data, context) => {

    // 認証済みユーザからのリクエストかチェック
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'This function must be called while authenticated.');
    }

    let uid = context.auth.uid
    admin.database().ref('users/' + uid).set(data).catch((error) => {
        let errorMessage = error.message
        throw new functions.https.HttpsError('system error', errorMessage);
    })

});
