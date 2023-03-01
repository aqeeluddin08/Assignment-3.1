const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});
app.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});
app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});
