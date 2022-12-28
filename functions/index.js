const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.sumNumbers = functions.https.onCall((data, context) => {
  functions.logger.log(`${data.firstNumber} + ${data.secondNumber} = ${data.firstNumber + data.secondNumber}`);
  return (data.firstNumber + data.secondNumber);
});