const httpClient = require('./httpclient.js').getInstance();

class SlackAlertClient {
  constructor(httpClient) {
    this.endpoint = "https://hooks.slack.com/services/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";
    this.voodooendpoint = 'https://hooks.slack.com/services/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';
    this.httpClient = httpClient;
  }

  sendTextUpdate({text}) {
    let payload = {
      channel: '#data-bots',
      username : "Arya-Scripts: Crawler",
      text : text,
      icon_emoji: ":blush:"
    };

    try {
      console.log('sending data to slack', JSON.stringify(payload));
      this.sendAlertToVoodoo(payload);
    } catch (err) {
      console.logger.error("Error sending to slack", payload, err);
    }

  }

  sendCrawlerUpdate({text}) {
    let payload = {
      channel: '#crawler-bot',
      username : "Arya-Scripts: Crawler",
      text : text,
      icon_emoji: ":blush:"
    };

    try {
      console.log('sending data to slack', JSON.stringify(payload));
      this.sendAlert(payload);
    } catch (err) {
      console.logger.error("Error sending to slack", payload, err);
    }

  }

  sendDataBotsUpdate({dataString, username, channel}) {
    try {
      // if(allowedDoctors.indexOf(doctorId) === -1) return;
      const payload = {
        username: username || "Update",
        "channel": channel || "#data-bots",
        text: dataString,
        icon_emoji: ":ghost:"
      };
      console.log('sending data to slack', JSON.stringify(payload));
      this.sendAlertToVoodoo(payload);
    } catch (err) {
      console.logger.error("Error sending to slack", err);
    }
  }

  sendAlert(payload) {
    console.log(":::::::::::::: Slack Notif :::::::::", payload);
    try {
      this.httpClient.postJSON(this.endpoint, payload).catch(err => {
        console.logger.error("Slack Notif ERROR1", payload, err);
      })
    } catch (err) {
      console.logger.error("Slack Notif ERROR2s", payload, err);
    }
  }

  sendAlertToVoodoo(payload) {
    console.log(":::::::::::::: Slack Notif :::::::::", payload);
    try {
      this.httpClient.postJSON(this.voodooendpoint, payload).catch(err => {
        console.logger.error("Slack Notif ERROR1", payload, err);
      })
    } catch (err) {
      console.logger.error("Slack Notif ERROR2s", payload, err);
    }
  }

}

let instance;
exports.getInstance = () => {
  if(!instance) {
    instance = new SlackAlertClient(httpClient);
  }
  return instance;
};
