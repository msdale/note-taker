const fs = require('fs-extra');
const path = require('path');
const ShortUniqueId = require('short-unique-id');
const uid = new ShortUniqueId();


function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, notesArray) {
  const id = { id: uid() };
  const note = Object.assign(id, body);
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function deleteNote(body, notesArray) {
  const note = body;
  for (let i = 0; i < notesArray.length; i++) {
    if (notesArray[i].id === note.id) {
      notesArray.splice(i, 1);
      break;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return notesArray;
}

module.exports = { findById, createNewNote, deleteNote };