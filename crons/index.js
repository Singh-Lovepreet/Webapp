/* eslint-disable class-methods-use-this,no-new,global-require */
const {CronJob} = require('cron');

const Constants = require('../lib/Constants');
const oneSignalClient = require('../lib/clients/oneSignalClient').getInstance();
const {ONE_SIGNAL_MESSAGE} = require('../lib/clients/oneSignalClient');


// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

class MedTrailCron {
  constructor() {
    this.registeredTag = "CRON: REGISTERED: ";
  }

  async startCrons(crons) {
    crons.forEach((fnName) => {
      this[fnName]();
    });
  }

  async everySecondCron() {
    new CronJob('* * * * * *', async () => {
      console.log('You will see this message every second');
    }, null, true, 'Asia/Kolkata');
  }

  async followups() {
    const followupInstance = require('../scripts/reminders/followups').instance;
    new CronJob('0 0 19 * * *', async () => {
      followupInstance.startFollowupsForAllDoctors();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'followups');

  }

  async inactiveDoctorsNotifier() {
    const inactiveNotifierInstance = require('../scripts/analytics/inactivedoctors').getInstance();
    new CronJob('0 0 8 * * *', async () => {
      inactiveNotifierInstance.run();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'inactiveDoctorsNotifier');
  }

  async appAnalyticsExport() {
    const appAnalyticsExportInstance = require('../scripts/analytics/appAnalyticsExport').getInstance();
    new CronJob('0 0 10 * * *', async () => {
      appAnalyticsExportInstance.start();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'appAnalyticsExport');
  }


  async salesDemoStats() {
    const task = require('../scripts/analytics/salesTeamDemos').getInstance();
    new CronJob('0 0 23 * * *', async () => {
      task.start();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'salesDemoStats');
  }

  async varunarora() {
    const task = require('../scripts/analytics/varunarora').getInstance();
    new CronJob('0 0 23 * * *', async () => {
      task.start();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'VarunArora');
  }

  async monthlyAnalyticsNotif() {
    new CronJob('0 0 20 1 * *', async () => {
      const monthlyMessage = {
        contents: {"en": "Tap to view summary of last month's practice"},
        headings: {"en": "Monthly Practice Report"}
      };

      const message = {data: Constants.ONE_SIGNAL_MONTHLY_ANALYTICS, ...ONE_SIGNAL_MESSAGE, ...monthlyMessage};
      oneSignalClient.sendNotification({message});
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'monthlyAnalyticsNotif');
  }

  async dailyAnalyticsNotif() {

    new CronJob('0 30 22 * * *', async () => {
      const dailyMessage = {
        contents: {"en": "Tap to view summary of today's practice"},
        headings: {"en": "Daily Practice Report"}
      };
      const message = {data: Constants.ONE_SIGNAL_DAILY_ANALYTICS, ...ONE_SIGNAL_MESSAGE, ...dailyMessage};
      oneSignalClient.sendNotification({message})
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'dailyAnalyticsNotif');
  }

  async weeklyAnalyticsNotif() {
    new CronJob('0 0 20 * * 0', async () => {
      const weeklyMessage = {
        contents: {"en": "Tap to view summary of last week's practice"},
        headings: {"en": "Weekly Practice Report"}
      };
      const message = {data: Constants.ONE_SIGNAL_WEEKLY_ANALYTICS, ...ONE_SIGNAL_MESSAGE, ...weeklyMessage};
      oneSignalClient.sendNotification({message});
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'weeklyAnalyticsNotif');
  }

  async automaticSummaryReportPrintout(){
    const task = require('../lib/apis/dispensaryAPI').getInstance();
    new CronJob('0 30 10 * * *', async () => {
      // await task.dispensarySummaryReportPrintout();
    }, null, true, 'Asia/Kolkata');
    console.log(this.registeredTag, 'sendDispensaryReportInWhatsApp');
  }

}

let instance;

function getInstance() {
  if (!instance) instance = new MedTrailCron();
  return instance;
}

exports.getInstance = getInstance;
getInstance().startCrons(['monthlyAnalyticsNotif', 'dailyAnalyticsNotif', 'weeklyAnalyticsNotif','automaticSummaryReportPrintout']);
// getInstance().startCrons(['dailyAnalyticsNotif']);
