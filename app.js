const express = require('express');
const app = express();
const mongoose = require('mongoose');
const contactsRouter = require('./routes/contacts');
const locationsRouter = require('./routes/addLocations');

const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const dbURI =
//   'mongodb+srv://capstone:12345@cluster0.gdfnt.mongodb.net/Capstone?retryWrites=true&w=majority';
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// .then((result) =>
//   console.log('MongoDB database connection established successfully')
// )
// .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.on('open', () => {
  console.log('MongoDB database connection established successfully');
});

// app.get('/', (req, res) => res.send('Api is live'));

app.use('/contacts', contactsRouter);
app.use('/all-locations', locationsRouter);
app.use(express.static('client/build'));

//this chunk of code gets from the database

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/client/build/index.html', function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
