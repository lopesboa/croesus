const mongoose = require('mongoose');
const respond = require('./respond');

module.exports = class Controller {
  constructor(collectionName, model) {
    this.collectionName = collectionName;
    this.Model = mongoose.model(this.collectionName, model);
    this.respond = respond.apply(this);
  }

  async create(event, context, callback) {
    const requestBody = event.body;
    const instance = new this.Model(requestBody);

    await this.validate(instance, callback);

    let document;
    try {
      document = await instance.save();
    } catch (error) {
      console.error(error);
      return this.respond.with.error.creation.db(document, callback);
    }
    return this.respond.with.success.creation(document, callback);
  }

  async update(event, context, callback) {
    const requestBody = event.body;

    const instance = new this.Model(requestBody);

    await this.validate(instance, callback);

    let document;
    try {
      document = this.Model.findByIdAndUpdate(instance._id, instance);
    } catch (error) {
      console.error(error);
      return this.respond.with.error.update.db(document, callback);
    }
    return this.respond.with.success.create(document, callback);
  }

  async validate(instance, callback) {
    try {
      await instance.validate();
    } catch (error) {
      this.respond.with.error.common.invalidData(instance, callback);
    }
  }

  async list(event, context, callback) {
    try {
      const documents = await this.Model.find().sort({ createdAt: 'desc' });
      return callback(null, {
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        },
        statusCode: 200,
        body: JSON.stringify({
          documents,
        }),
      });
    } catch (err) {
      console.error('Error while getting mongodb data:', JSON.stringify(err, null, 2));
      return this.respond.with.error.common.db(callback);
    }
  }

  async delete(event, context, callback) {
    const document = await this.checkIfDocumentExistsInDb('_id', event.pathParameters.id, callback);
    try {
      await document.delete();
    } catch (error) {
      console.error('Error while deleting document', JSON.stringify(error));
      return this.respond.with.error.common.db(callback);
    }
    return this.respond.with.success.deletion(callback);
  }

  async findDocumentInDb(key, value) {
    const query = { [key]: value };
    const document = this.Model.findOne(query);
    return document;
  }

  async checkIfDocumentExistsInDb(key, value, callback) {
    const document = await this.findDocumentInDb(key, value);
    if (!document) {
      return this.respond.with.error.common.notFound(value, callback);
    }
    return document;
  }
};
