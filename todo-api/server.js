let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');
let _ = require('lodash');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');

let app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text,
  });

  todo.save().then(
      doc => res.send(doc)
  ).catch(
      e => res.status(400).send(e)
  )
});

app.get('/todos', (req, res) => {
  Todo.find().then(
      todos => res.send({todos})
  ).catch(
      e => res.status(400).send(e)
  )
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then(
      todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({todo});
      }
  ).catch(e => res.send(400).send(e));
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then(
      todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.status(204).send();
      }
  ).catch(e => res.send(400).send(e));
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch(e => res.status(400).send(e));
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
