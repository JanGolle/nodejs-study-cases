const express = require('express');
const hbs = require('hbs');

let app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send({
    status: 'OK',
    data: {
      id: 42,
      title: 'Some useful data',
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear(),
  });
});

app.listen(3000, () => {
  console.log('Server is run on port 3000');
});
