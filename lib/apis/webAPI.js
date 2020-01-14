const {mainDb} = require('../clients/mongoDbClient');
class WebAPI {

  async insertDataInDb(params) {
    const {post} = params;
    const {studentId, score1, score2, score3, score4, score5} = post;
    await mainDb.create({
      "studentId": studentId,
      "score1": score1,
      "score2": score2,
      "score3": score3,
      "score4": score4,
      "score5": score5
    });
  }

  async findDocById({post}) {

    const {id} = post;
    const query = {studentId: id}
    const res = await mainDb.findItem({query});

    if (!res) {
      return {msg: 'there is no doc'};
    }
    return res;
  }

  async updateDoc(params) {
    const {post} = params;
    const {query} = post;
    const {update} = post;
    const response = mainDb.updateData({query, update});
    return response;
  }

}

let instance;

function getInstance() {
  if (!instance) instance = new WebAPI();
  return instance;
}

exports.getInstance = getInstance;
