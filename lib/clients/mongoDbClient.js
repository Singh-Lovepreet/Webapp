const mongoose = require('mongoose');


const connection = mongoose.createConnection('mongodb+srv://admin:admin@cluster0-pksbq.mongodb.net/test?retryWrites=true&w=majority');

connection.on('error', err => {
  console.log('something is wrong : ', err);
});

connection.on('open', () => {
  console.log('successfully connected to mongodb: ');
});
const mainDb = connection.useDb('maindb');
const DbSchema = mongoose.Schema({}, {strict: false});

const mainDataModel = mainDb.model('webapp', DbSchema, 'webapp');

class MongoDbClient {
  constructor(model) {

    this.model = model;
  }

  create(params) {
    return this.model.create(params);
  }

   async  find({query}) {
    console.log(query);
    return this.model.findOne({query});
  }

  updateData({query, update, options = {}}) {
    return this.model.findOneAndUpdate(query, update, {new: true, ...options})
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  async findItem({query, projection = {}}) {
    return this.model.findOne(query, projection)
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  updatePlain({query, update, options}) {
    return this.model.findOneAndUpdate(query, update, {new: true, ...options})
      .then(result => result && JSON.parse(JSON.stringify(result)));
  }

  updateWithOptions({query, update, options}) {
    return this.model.update(query, update, {...options});
  }
}


const mainDbInstance = new MongoDbClient(mainDataModel);

exports.mainDb = mainDbInstance;
