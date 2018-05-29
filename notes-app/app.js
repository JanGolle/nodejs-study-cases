console.log('Starting app');


const fs = require('fs');
const os = require('os');
const notes = require('./notes');

let user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${user.username}!`, function (err) {
  if (err) {
    console.log('Unable write to file');
  }
});

console.log(`Answer is: ${notes.answer}`);
