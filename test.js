/* eslint-disable no-await-in-loop */
const mqttClient = require('./lib/clients/mqttClient').getInstance();

async function fun() {
  // const client = await mqttClient.subscribe({topicName: "admin_test", qos: 1, retain: true});
  for(let i = 0;i<100000;i++){
    await mqttClient.publish({topicName: "test", qos: 0, retain: false, data: `message ${i}`});
  }
  
  // client.on('message', function (topic, message) {
  //   // message is Buffer
  //   console.log(message.toString())
  //   // client.end()
  //   // client.reconnect()
  // })
}

fun();
