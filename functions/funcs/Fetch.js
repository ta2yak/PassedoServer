const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = functions.https
                          .onCall((data, context) => {

    // 認証済みユーザからのリクエストかチェック
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'This function must be called while authenticated.');
    }

    let uid = context.auth.uid
    return admin.database().ref('users/' + uid).once('value').then((snapshot) => {
        return snapshot.val()
    })

});
