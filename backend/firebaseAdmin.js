// const { initializeApp, cert } = require("firebase-admin/app");

// const serviceAccount = require("./serviceAccountKey.json");

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// module.exports = app;

const { initializeApp, cert, getApps } = require("firebase-admin/app");

let app;

if (getApps().length === 0) {
  if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    // Production: Firebase credentials from environment variables
    app = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    // Local development: Firebase service account file
    const serviceAccount = require("./serviceAccountKey.json");

    app = initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

module.exports = app;