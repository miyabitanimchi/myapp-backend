"use strict";

class SimpleCrudDB {
  // store your records here
  inMemoryDatabase = [];
  // import this and begin to use it
  fs = require("fs");

  constructor(aFileName) {
    this.fileName = aFileName;
    // this is the filename you will save to add code below to create that file, or
    // open it when this class is instantiated, ie: your program start, it loads
    // the database from the file, into the this.inMemoryDatabase
  }

  Create(username, password) {
    // add code to store a record in your database
    // return true if success, false if not
    if (this.Read(username) === undefined) {
      let User = { loginName: username, loginPassword: password };
      this.inMemoryDatabase.push(User);
      return true;
    } else {
      return false;
    }
  }

  Read(username) {
    // add code to read record from database
    // return undefined if no record exists, otherwise, return the record
    for (let i = 0; i < this.inMemoryDatabase.length; i++) {
      if (this.inMemoryDatabase[i].loginName === username) {
        return this.inMemoryDatabase[i].loginName;
      } else {
        return undefined;
      }
    }
    // Or could write like this
    // return this.inMemoryDatabase[username];
  }

  Update(username, newRecordData) {
    // add code to update a record in the database
    // return true if success, false if not
    let recordWeWantToUpdate = this.Read(username);
    console.log("this is " + recordWeWantToUpdate);
    if (newRecordData === undefined) return false;
    if (recordWeWantToUpdate === undefined) {
      return false;
    } else {
      if (newRecordData.loginName !== recordWeWantToUpdate) return false;
      // recordWeWantToUpdate.email = newRecordData.email;
      // recordWeWantToUpdate.password = newRecordData.password;
      recordWeWantToUpdate = newRecordData;
      return true;
    }
  }

  Delete(username) {
    // add code to delete a user in the database
    // return true if success, false if not
    if (this.Read(username) === undefined) {
      console.log(`no username like ${username}`);
      return false;
    } else {
      // keep an empty value so the indices won't be changed
      for (let i = 0; i < this.inMemoryDatabase.length; i++) {
        if (this.inMemoryDatabase[i].loginName === username) {
          this.inMemoryDatabase[i] = {};
          return false;
        }
      }

      return true;
    }
  }

  flushDB() {
    // flush the inmemoryDatabase to disk (ie: save the database to disk)
    this.fs.writeFile(
      "./db.json",
      JSON.stringify(this.inMemoryDatabase),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("file written successfully!");
        }
      }
    );
  }

  reloadDB() {
    // relead the database from disk
  }
}

let db = new SimpleCrudDB("./db.json");

const registerUser = (username, password) => {
  db.Read(username);
  db.Create(username, password);
  db.flushDB();
};

const deleteUser = (username) => {
  db.Delete(username);
};

console.log(registerUser("superMiyabi", "supersecret"));
console.log(registerUser("miyabiii", "passwordyayyy"));

console.log(db.inMemoryDatabase);
console.log(deleteUser("superMiyabi"));
console.log(
  db.Update("miyabiii", {
    loginName: "miyabiii",
    loginPassword: "superdupersecret",
  })
);
console.log(db.inMemoryDatabase);
