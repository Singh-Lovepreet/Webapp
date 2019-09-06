## ARYA SCRIPTS

#### Subscribers

##### 1. Prescription Updates Subscriber 
_Production Deployment:_

```
NODE_ENV=productionalt pm2 start lib/gcp_subscriptions/prescriptionUpdateSubscriber.js --name prescription-update-flow-subscriber

Through Ecosystem:
pm2 startOrRestart --only PrescriptionUpdateSubscriber ecosystem.config.js --env production

```
