const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const nodemailer = require("nodemailer");
// const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// const accountSid = functions.config().twilio.sid;
// const authToken = functions.config().twilio.authtoken;

const client = require("twilio");


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
    await db.collection("Bags").add({
      BagId: uuidVal,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      assStatus: "unassigned",
      Billed: false,
      paymentStatus: "unpaid",
      userId: null,
    });
    await upDateBagsCount();
    return {
      status: `success`,
      message: `new Bag Id was succesfullly generated `,
      val: uuidVal,
    };
  } catch (err) {
    return err;
  }
});

function upDateBagsCount(val = 1) {
  const statsRef = db.collection("Bags").doc("--stats--");
  const changeVal = admin.firestore.FieldValue.increment(val);
  return statsRef.update({ numOfBags: changeVal });
}

exports.listenForPickups = functions.firestore
  .document("Pickups/{pickupId}")
  .onWrite(async (change, context) => {
    // If we set `/users/marie` to {name: "Marie"} then
    // context.params.userId == "marie"
    // ... and ...
   

    try {
	const newPickUpDetail = change.after.data();
	console.log(newPickUpDetail,111)
	const districtName = newPickUpDetail.districtName;
        const users = db.collection("users");
        const usersDistrictNameQuery = users.where(
          "districtName",
          "==",
          districtName
        );
        const usersDistrictNameQuerySnapshot = await usersDistrictNameQuery.get();

        if (!usersDistrictNameQuerySnapshot.empty) {
          usersDistrictNameQuerySnapshot.forEach((doc) => {
            if (doc.exists) {
              //send sms to the users phone number and email
              const userDetails = doc.data();

		const textM = `Hello ${
			userDetails.displayName
		     }, we would like to kindly inform you that the next pickup date for your waste is on ${moment(
			newPickUpDetail.dateAndTime
		     ).format(
			"LLL"
		     )} . Please kindly observe and follow all procedures.Thanks! `
		console.log(client,333)
		const twiloCLientCall = client(functions.config().twilio.sid, functions.config().twilio.authtoken)
              twiloCLientCall.messages.create({
                to: `+${userDetails.phoneNo}`,
                from: "+14692146589",
                body: textM,
              })
              // console.log(message.sid);

              //send email
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: `${functions.config().email.name}`,
                  pass: `${functions.config().email.password}`,
                },
              });

              const mailOptions = {
                from: "profkiti@gmail.com", // Something like: Jane Doe <janedoe@gmail.com>
                to: userDetails.email,
                subject: "Next Pickup Date", // email subject
                html: textM, // email content in HTML
              };

               transporter.sendMail(mailOptions, (e, info) => {
                if (e) {
                  console.log(e.toString());
                }
                console.log("Sended");
              });
            }
          });
        }
    } catch (error) {
      return error;
    }
  });
