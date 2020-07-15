const { Expo } = require("expo-server-sdk"); 

const expo = new Expo();
const Bluebird = require("bluebird");

module.exports = function sendNotification({ token }) {
  if (!Expo.isExpoPushToken(token)) {
    return new Error("pushToken invalido");
  }
  
  const messages = [
    {
      to: token,
      sound: 'default',
      title: 'Hola desde el back',
      body: 'This is a test notification',
      data: { withSome: 'data' },
    }
  ]

  const chunks = expo.chunkPushNotifications(messages);;

  return Bluebird.all(chunks.map(chunk => {
      console.log(chunk)
    console.log("Sent a chunk!");
    return expo.sendPushNotificationsAsync(chunk)
      .then(data => {
        console.log("Fullfiled a chunk!");
        return data;
      })
  }))

}