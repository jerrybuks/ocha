const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();
const db = admin.firestore();

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
		await db.collection('Bags').add({
			BagId: uuidVal,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			assStatus: 'unassigned',
			Billed: 'false',
			paymentStatus: 'unpaid'
		});
		await upDateBagsCount()
		return { status: `success`, message: `new Bag Id was succesfullly generated `, val: uuidVal };
	} catch (err) {
		return err;
	}
});

function upDateBagsCount(val=1){
	const statsRef =  db.collection('Bags').doc('--stats--');
	const changeVal =   admin.firestore.FieldValue.increment(val);
	return statsRef.update({ numOfBags: changeVal });
}
