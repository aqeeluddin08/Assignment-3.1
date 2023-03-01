// Import necessary libraries and modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Set up middleware
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/mydb', { useNewUrlParser: true });

// Define schema and model for your data
const mySchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  email: String
});

const MyModel = mongoose.model('MyModel', mySchema);

// Define routes for your API
app.get('/api/mymodels', (req, res) => {
  MyModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
});

app.post('/api/mymodels', (req, res) => {
  const newMyModel = new MyModel(req.body);
  newMyModel.save((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
});

// Define tests to validate the behavior of your application
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('MyModel API', () => {
  it('should get all mymodels', (done) => {
    chai.request(app)
      .get('/api/mymodels')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new mymodel', (done) => {
    const newMyModel = { name: 'John', age: 25, email: 'john@gmail.com' };
    chai.request(app)
      .post('/api/mymodels')
      .send(newMyModel)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('John');
        expect(res.body.age).to.equal(25);
        expect(res.body.email).to.equal('john@gmail.com');
        done();
      });
  });
});

// Start server and listen for requests
app.listen(3000, () => console.log('Server started on port 3000'));
