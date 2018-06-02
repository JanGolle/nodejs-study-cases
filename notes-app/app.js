const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs
  .command('add', 'Add a new note', {
    id: {
      describe: 'Note ID',
      demand: true,
      alias: 'i'
    },
    title: {
      describe: 'Title of the note',
      demand: true,
      alias: 't'
    },
  })
  .command('list', 'List all notes')
  .command('get', 'Show note by ID', {
    id: {
      describe: 'Note ID',
      demand: true,
      alias: 'i'
    }
  })
  .command('remove', 'Remove note by ID', {
    id: {
      describe: 'Note ID',
      demand: true,
      alias: 'i'
    }
  })
  .help()
  .argv;

const command = argv._[0];

switch (command) {
  case 'list':
    _.map(notes.getAll(), note => {
      notes.printOne(note);
    });
    break;
  case 'add':
    notes.add(argv.id, argv.title);
    break;
  case 'get':
    notes.printOne(notes.get(argv.id));
    break;
  case 'remove':
    notes.remove(argv.id);
    break;
  default:
    console.log('use --help for list commands');
}
