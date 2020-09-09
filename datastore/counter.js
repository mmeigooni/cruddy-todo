const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  //check to see if counter exists as a text file (readFile)
  readCounter((err, fileData) => {

    var newCount = fileData + 1;
    writeCounter(newCount, (err, zeroPaddedNumber) => {
      callback(zeroPaddedNumber);
      console.log('Heres your ZPN:' + zeroPaddedNumber);
    });
  });



  //read the number in counter.txt
  //turn it into zero padded
  //return number



/*
    //if items exists already
      //turn value into integer
      //increment value
      //write id to same file
    //else
      //set counter to 1

  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
*/
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
