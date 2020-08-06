const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();
exports.addAdminClaim = functions.https.onCall((email) =>
	admin
		.auth()
		.getUserByEmail(email)
		.then((user) => admin.auth().setCustomUserClaims(user.uid, { admin: true }))
		.then(() => ({ message: `success ${email} has been made an admin` }))
		.catch((err) => err)
);
exports.createUUID = functions.https.onCall(async () => {
	try {
		const uuidVal = uuidv4();
		await admin
			.firestore()
			.collection('wasteBagIds')
			.add({
				wasteBagId: uuidVal,
				createdAt: Date.now(),
				assStatus: 'unassigned',
				Billed: 'false',
				paymentStatus: 'unpaid'
			});
		return { status: `success`, message: `uuid was succesfullly generated `, val: uuidVal };
	} catch (err) {
		return err;
	}
});
