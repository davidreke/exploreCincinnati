const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, required: false },
}); 


const Contact = mongoose.model('Contact', contactSchema);


module.exports = Contact;