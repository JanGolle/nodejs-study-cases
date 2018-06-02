const fs = require('fs');
const _ = require('lodash');
const dataFile = 'notes-data.json';

let getAll = () => {
  return JSON.parse(fs.readFileSync(dataFile));
};

let add = (id, title) => {
  let notes = getAll();

  if (notes.filter(note => _.isEqual(note.id, id)).length === 0) {
    notes.push({id, title});
    saveAll(notes);
  }
};

let remove = id => {
  saveAll(getAll().filter(note => !_.isEqual(note.id, id)));
};

let get = id => {
  let notes = getAll();

  return _.head(notes.filter(note => _.isEqual(note.id, id)));
};

let saveAll = notes => {
  fs.writeFileSync(dataFile, JSON.stringify(notes));
};

let printOne = note => {
  if (_.isUndefined(note)) {
    console.log('Note does not exist.');
  } else {
    console.log(`=== NOTE ===`);
    console.log(`ID:\t${note.id}`);
    console.log(`Title:\t${note.title}`);
  }
};

module.exports = {
  getAll,
  add,
  get,
  remove,
  printOne,
};
