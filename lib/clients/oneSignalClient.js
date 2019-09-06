const httpClient = require('./httpclient').getInstance();
let message = {
  app_id: "97206b47-6eca-4def-9eb9-be44cd77ff42",
  included_segments: ["All"],
  large_icon : 'report_notif',
  small_icon :'medtrail_notif'
};

let instance;

class OneSignalClient {

  async sendNotification({message}) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic MGVjYzZiMjktZTM3Mi00NzZjLWI1M2UtZjgzZjA0NTA4NGRh"
    };
    const url = "https://onesignal.com/api/v1/notifications";
    const response = await httpClient.postJSON(url, message, {headers});
    console.log('reponse from api call: ', response);
  };
}


function getInstance() {
  if (!instance) instance = new OneSignalClient();
  return instance;
}

exports.getInstance = getInstance;

exports.ONE_SIGNAL_MESSAGE = message
// getInstance().sendNotification(message)
