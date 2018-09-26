"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const webpush = require("web-push");
dotenv.config();
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true }); // To suppress the warning
const subscriptionsRef = db.collection('subscriptions');
const getAllSubscriptions = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const allSubscriptions = [];
        const snapshot = yield subscriptionsRef.get();
        snapshot.forEach(doc => allSubscriptions.push(doc.data()));
        return allSubscriptions;
    }
    catch (error) {
        console.log('Error fetching subscriptions from the DB', error);
        return [];
    }
});
const sendPushNotification = (subscription) => __awaiter(this, void 0, void 0, function* () {
    webpush.setVapidDetails('mailto:dummy@gmail.com', // Identifier
    process.env.VAPID_PUBLIC_KEY, // Public key
    process.env.VAPID_PRIVATE_KEY // Private key
    );
    const pushConfig = {
        endpoint: subscription.endpoint,
        keys: {
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh
        }
    };
    try {
        yield webpush.sendNotification(pushConfig, 'hi'); // TODO: Make the message a stringified object
    }
    catch (error) {
        console.log('Error sending notifications', error);
    }
});
exports.onHttpRequest = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    console.log('Received a request!');
    const allSubscriptions = yield getAllSubscriptions();
    console.log('allSubscriptions', allSubscriptions);
    for (const subscription of allSubscriptions) {
        console.log('Currently processed subscription', subscription);
        yield sendPushNotification(subscription);
    }
    response.status(200).send();
}));
//# sourceMappingURL=index.js.map