const Constants = {
  DEV: false,
  serverUrl: this.DEV ? 'http://localhost:7007' : 'http://arya.io/server',
  isProduction: (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'productionalt'),
  DigitizationStages: {
    ONE: 1,
    TWO: 2,
    THREE: 3,
  },
  AryaVersions: {
    STORAGE: 0,
    BASIC: 1,
    PRO: 2
  },
  digitizationStateField: 's',
  digitizationStateUserField: 'u',
  digitizationStateUserReviewField: 'ur',
  NewDigitizationStages: {
    mobileNumber: "a", // mobileNumber
    profileDetails: "b", // profile details of user
    profileDetailsReview: "br", // profile details of user
    medicines: 'c', // medicines details
    prescriptionSummary: 'd', // prescription summary
    diagnostics: 'e', // prescription summary
    review: 'r', // review stage
    messaging: 'wm', // messaging stage
    delivery: 'g', // delivery stage
    splitter: 'sp', // review stage
    autoDigitization: 'ad',
    oncoDetails: 'od',
    oncoDetailsView: 'odv',
    attachmentAddded: 'atd',
    dietChart: 'dc',
  },
  DigitizationStates: {
    NONE: 0,
    READY: 1,
    PROCESSING: 2,
    PRIORITY: 9,
    DONE: 3,
    REVIEW_READY: 4,
    REVIEW_PROCESSING: 5,
    REVIEW_DONE: 6,
    REDONE: 7,
    SKIPPED: 8,
    REVIEW_SKIPPED: 9,
  },
  automatedDoctors: ['varunarora'],
  selfDigitizers: ['vijaysimha'],
  salesDemo: ['sachin'],
  autoMessaging: ['sachin', 'nitinchaudhary', 'puneetsharma', 'mohitmittal', 'ftestdoctor1', 'ftestdoctor2', 'ftestdoctor3', 'ftestdoctor4', 'ftestdoctor5', 'ftestdoctor6', 'ftestdoctor7', 'ftestdoctor8', 'ftestdoctor9', 'ftestdoctor10', 'ftestdoctor11', 'ftestdoctor12'],
  autoMessagingForEveryone: true,
  messagingMerge: ['mayankshekhar', 'gauravpandey', 'sunilraj', 'mohitmittal', 'nitinchaudhary', 'puneetsharma', 'ftestdoctor1', 'ftestdoctor2', 'ftestdoctor3', 'ftestdoctor4', 'ftestdoctor5', 'ftestdoctor6', 'ftestdoctor7', 'ftestdoctor8', 'ftestdoctor9', 'ftestdoctor10', 'ftestdoctor11', 'ftestdoctor12', 'shoaibali', 'sachinchopra'],
  messagingMergeMainDoctor: 'sachin',
  yatharthMerge: ['kapiltyagi', 'manjutyagi', 'akjain', 'harshgoel', 'ankursethi'],
  yatharthMergeMainDoctor: 'yatharthadmin',
  newFCMMessagingDoctors: ['vijaysimhatest', 'rajashekharreddy', 'yatharthadmin', 'rajnihospital', 'medharbour', 'sapnacally'],
  splitClinicsToDoctorsExample: {'naman': ['sandhyabansal']},
  splitClinicsToDoctors: {},
  subDoctorEnabled: ['blessingspolyclinic', 'sanjayjain', 'sadhnasinghal', 'medharbour', 'anupamasingh', 'vikasthukral'],
  dietChartDoctors: ['sandeepkharb', 'vijaysimhatest', 'fajayagarwal'],
  isDoctorMultiple: ['sanjayjain', 'anupamasingh'],
  medicationMessageEnabled: ['fajayagarwal', 'vijaysimhatest', 'nikhilagrawal', 'ankurgupta'],
  deliveryEnabledDoctors: ['fajayagarwal', 'vijaysimhatest'],
  DataStoreEntities: {
    DIET_CHART: 'DietCharts',
    MEDICATION_MESSAGE: 'MedicationMessage',
    FCM_MESSAGES: 'FCMMessages'
  },
  featureTypes: {
    DIET_CHART: 'diet_chart',
    MEDICATION_MESSAGE: 'medication_message',
  },
  digitizedData: {
    "pId": "#prescriptionId",
    "date": "14566545346",
    "userId": "#userId",
    "data": {
      "diagnosis": "Some Diagnosis for the patient problem",
      "uInfo": {
        "userId": "#userId",
        "name": "Akhil",
        "age": 30,
        "sex": 1,
        "phoneNumber": "8308323403"
      },
      "prescriptionUrl": "http://arya.io/server/prescriptions/rajashekharreddy_1516617289608-0.png",
      "tmbImg": "http://arya.io/server/prescriptions/rajashekharreddy_1516617289608-0.png",
      "mInfo": [
        {
          "id": 1,
          "key": 2,
          "medicineName": "Mission HB Hemoglobin Testing System",
          "existingMedicine": true,
          "quantity": 1,
          "mealType": 1,
          "startDate": "2017-12-30",
          "frequency": "1010",
          "durationValue": 1,
          "durationType": "days",
          "tag": "",
          "selectedTimes": [
            "M", "N"
          ]
        },
        {
          "id": 2,
          "key": 2,
          "medicineName": "Mission HB Hemoglobin Testing System",
          "existingMedicine": true,
          "quantity": 1,
          "mealType": 1,
          "startDate": "2017-12-30",
          "frequency": "1010",
          "durationValue": 1,
          "durationType": "days",
          "tag": "",
          "selectedTimes": [
            "E"
          ]
        }
      ],
      "symptomsList": [
        {
          "name": "something",
          "id": "symptomId"
        }
      ],
      "vitals": [
        {
          "t": "Blood Pressure",
          "v": "114/79",
          "vt": "mmHg"
        },
        {
          "t": "SpO2",
          "v": "96",
          "vt": "percent"
        }
      ],
      "tests": [
        {
          "name": "Test Name",
          "id": "#testId"
        }
      ],
      "procedures": [
        {
          "name": "procedureName",
          "id": "procedureId"
        }
      ]
    }
  },
  vitals: {
    'BPM': {name: 'BPM', vt: 'bpm'},
    'SpO2': {name: 'SpO2', vt: 'percent'},
    'BP': {name: 'Blood Pressure', vt: 'mmHg'},
    'height': {name: "Height", vt: 'ft'},
    'weight': {name: 'Weight', vt: 'kg'},
    'BMI': {name: 'BMI', vt: ''},
    'Temp': {name: 'Temperature', vt: 'degrees'},
  },
  specialities: ["Allergist", "Andrologist", "Anesthesiologist", "Bariatric ", "Cardiologist", "Chiropractor", "Dentist", "Dermatologist", "Dietician", "Endocrinologist", "Gastroenterologist", "General Physician", "Geriatrician", "Gynecologist", "Hematologist", "Hepatologist", "Infertility specialist", "Neaonatologist", "Nephrologist", "Neurologist", "Neurosurgeon", "Obstetrician", "Oncologist", "Opthalmologist", "Orthopedist", "Otolaryngologist", "Pathologist", "Pediatrician", "Physiotherapist", "Plastic Surgeon", "Psychiatrist", "Pulmonologist", "Rheumatologist", "Urologist"],
  socketEvents: {
    NEW_PRESCRIPTION: 'new_prescription'
  },
  FlagReasons: {
    R1: 1, R2: 2, R3: 3, R4: 4,
    R5: 5, R6: 6, R7: 7,
  },
  FlagReasonsText: {
    R1: 'Mobile number is less than 10 digits',
    R2: 'Handwriting is not clear ',
    R3: 'Merged Prescription',
    R4: 'Not listed; “Add Comment”',
    R5: 'Contact details is not written',
    R6: 'Medicine not in the database',
    R7: 'Diagnostics Test not in the database',
  },
  ReminderTypes: {
    FOLLOWUP: 'f'
  },
  MessageTypes: {
    MESSAGE: 'm',
    PRESCRIPTION: 'p',
    FOLLOWUP: 'f',
    DIETCHART: 'd',
  },
  messagingUrl: 'http://35.198.236.68/server/messaging/v1/sendmessage',
  PUBSUB_TOPICS: {
    ANALYTICS_FLOW: 'analytics-flow',
    MESSAGING_FLOW: 'messaging-flow',
    REALMPUSH_FLOW: 'realmpush-flow',
    MIGRATE_TO_ES_FLOW: 'migrate-to-es-flow',
    MAIL_FLOW: 'mail-flow',
    NEW_PRESCRIPTION: 'new-prescription',
    GLOBAL_EVENTS: 'global-events',
  },
  GLOBAL_EVENTS_TYPES: {
    SEND_WA_MESSAGE: 'sendwamsg',
  },
  PUBSUB_SUBSCRIPTIONS: {
    NEW_PRESCRIPTION_RECEIVER: 'prescription-flow-receiver',
    MIGRATE_TO_ES_RECEIVER: 'migrate-to-es-flow-receiver',
    MAIL_FLOW_RECEIVER: 'mail-flow-receiver',
  },
  gcpProjects: {
    medtrailProjectId: 'medtrail-189112',
    aryaProjectId: 'arya-189513'
  },
  MESSAGING_FLOW_TYPES: {
    PACK: 'pack',
    MESSAGE: 'm',
    REALM_PUSH: 'rp',
    MAIL_SEND: 'ms',
  },
  PRESCRIPTION_FLOW_TYPES: {
    NEW_PRESCRIPTION: 'np',
    ATTACHMENT_ADDED: 'atd',
    MIGRATE_TO_ES_FLOW: 'mtes',
  },
  ELASTICSEARCH: {
    PRESCRIPTIONS_INDEX: 'prescriptions',
    PRESCRIPTIONS_TYPE: 'prescription',
    ANALYTICS_V3_INDEX: 'analytics_v3',
    WA_ANALYTICS: 'wa_analytics',
    EVENTS: 'events'

  },
  MONTH_TIME: (1000 * 60 * 60 * 24 * 30),

  ONE_SIGNAL_DAILY_ANALYTICS: {
    type: "analytics",
    subType: "medicine",
    duration: 1
  },

  ONE_SIGNAL_WEEKLY_ANALYTICS: {
    type: "analytics",
    subType: "medicine",
    duration: 7
  },
  ONE_SIGNAL_MONTHLY_ANALYTICS: {
    type: "analytics",
    subType: "medicine",
    duration: 30
  },
  LOCAL_TIME_ZONE: 'Asia/Kolkata',
  MQTT_CONNECTION_PARAMS: {
    BROKER_URL: 'tcp://35.194.118.121',
    PORT: '1883',
    USERNAME: 'medTrail',
    PASSWORD: 'medTrail_connect',
    CLEAN_SESSION: false,
    CLIENT_ID: `aryaScripts_${process.env.USER}_${(process.env.NODE_APP_INSTANCE || '0').toString()}`,
    WILL_MESSAGE: {
      topic: "medTrail/Stats",
      payload: `aryaScripts_${process.env.USER}_${(process.env.NODE_APP_INSTANCE || '0').toString()} got disconnected`,
      qos: 2
    }
  },
  DIGITIZATION_READY_STATE:1

};


module.exports = Constants;
