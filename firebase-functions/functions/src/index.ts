import * as dotenv from 'dotenv';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as webpush from 'web-push';

dotenv.config();
admin.initializeApp();

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true }); // To suppress the warning

const subscriptionsRef = db.collection('subscriptions');

const getAllSubscriptions = async (): Promise<FirebaseFirestore.DocumentData[]> => {
  try {
    const allSubscriptions = [];
    const snapshot = await subscriptionsRef.get();
    snapshot.forEach(doc => allSubscriptions.push(doc.data()));
    return allSubscriptions;
  } catch (error) {
    console.log('Error fetching subscriptions from the DB', error);
    return [];
  }
};

const sendPushNotification = async (subscription: FirebaseFirestore.DocumentData) => {
  webpush.setVapidDetails(
    `mailto:${process.env.EMAIL}`, // Identifier
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
    await webpush.sendNotification(pushConfig, 'hi'); // TODO: Make the message a stringified object
  } catch (error) {
    console.log('Error sending notifications', error);
  }
};

export const onHttpRequest = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  console.log('Received a request!');
  
  const allSubscriptions = await getAllSubscriptions();
  console.log('allSubscriptions', allSubscriptions);
  
  for (const subscription of allSubscriptions) {
    console.log('Currently processed subscription', subscription);
    await sendPushNotification(subscription);
  }
  
  response.status(200).send();
});
