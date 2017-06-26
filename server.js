const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (e) => {
    if (e) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (s) => s.toUpperCase());

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Node Server Home',
    welcomeMessage: 'Welcome to Node Server'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handlerequest'
  });
});

app.listen(port, () => {
  console.log('Server running on port ', port)
});