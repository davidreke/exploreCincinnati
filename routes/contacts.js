// const { default: contacts } = require('../../src/components/contacts');

const router = require('express').Router();
let Contact = require('../models/contacts.models');

// var jsonParser = bodyParser.json
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.use(bodyParser.urlencoded({
//     extended:true}));

// router.use(function(req, res, next) {
//     console.log(req.method + " " + req.path + " " + req.ip);
//     next();
// })

// router.get("/body-parsed-info")

router.get('/', (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const message = req.body.message;
  const date = Date.parse(req.body.date);

  const newContact = new Contact({
    name,
    email,
    phoneNumber,
    message,
    date,
  });

  newContact
    .save()
    .then(() => res.json('Contact added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => res.json(contact))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phoneNumber = req.body.phoneNumber;
      contact.message = req.body.message;
      contact.date = Date.parse(req.body.date);

      contact
        .save()
        .then(() => res.json('Contact updated!'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/contacts', (req, res) => {
  Contact.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
