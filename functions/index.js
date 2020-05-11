const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addAdminClaim = functions.https.onCall((email) =>
	admin.auth().getUserByEmail(email).then((user) =>
		admin
			.auth()
			.setCustomUserClaims(user.uid, { admin: true })
			.then(() => {
				message: `success ${email} has been made an admin`;
			})
			.catch((err) => err)
	)
);
