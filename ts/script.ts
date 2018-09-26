import { setupFirebase } from './setupFirebase';
import { SubscriptionManager } from './SubscriptionManager';

setupFirebase();

document.getElementById('receive-notification').addEventListener('click', () => {
  // Check for the availability
  if (!('Notification' in window)) {
    console.log('This browser doesn\'t support push notifications');
    return;
  }
  
  // Check for the permission
  switch (Notification.permission) {
  case 'granted':
    onNotificationGranted();
    break;
  case 'denied':
    onNotificationDenied();
    break;
  default: // 'default' or not set
    Notification.requestPermission((permission: string) => {
      if (permission === "granted") {
        onNotificationGranted();
      } else {
        onNotificationDenied();
      }
    });
  }
});

const onNotificationDenied = () => {
  console.log('Permission denied; Cannot send push notifications');
};

const onNotificationGranted = () => {
  console.log('You\'ll receive push notifications!');
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        console.log('Service worker registered');
        SubscriptionManager.subscribe();
      })
      .catch(error => console.log(error));
  } else {
    console.log('This browser doesn\'t support service worker');
  }
};