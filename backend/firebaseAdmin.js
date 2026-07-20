// // const admin = require("firebase-admin");
// // const serviceAccount = require("./serviceAccountKey.json");

// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// // });

// // module.exports = admin;
// const admin = require("firebase-admin");

// console.log("Firebase Admin:");
// console.log(admin);

// module.exports = admin;
const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("./serviceAccountKey.json");

const app = initializeApp({
  credential: cert(serviceAccount),
});

module.exports = app;