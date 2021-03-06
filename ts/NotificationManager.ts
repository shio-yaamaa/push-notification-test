export const NOTIFICATION_TITLE = 'Notification Test';
export const NOTIFICATION_TAG = 'notification-test';
export const DESTINATION_URL = 'https://www.google.com/';

class NotificationManager {
  get bodyText(): string {
    return 'Hi';
  }
  
  // Create a set of options to pass in to showNotification()
  get options(): NotificationOptions {
    return {
      tag: NOTIFICATION_TAG,
      body: this.bodyText,
      // icon
      // image
    };
  }
  
  showNotification(registration: ServiceWorkerRegistration) {
    registration.showNotification(NOTIFICATION_TITLE, this.options);
  }
  
  handleClick(event: NotificationEvent, clients: Clients) {
    clients.openWindow(DESTINATION_URL);
    event.notification.close();
  }
}

const notificationManager = new NotificationManager();
export { notificationManager as NotificationManager };