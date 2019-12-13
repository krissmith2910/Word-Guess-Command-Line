const Letter = require("./letter.js");

function Word(answer) {
  this.objArray = [];

  for (let i = 0; i < answer.length; i++) {
    let letter = new Letter(answer[i]);
    this.objArray.push(letter);
  }
  this.log = function () {
    answerLog = "";
    for (let i = 0; i < this.objArray.length; i++) {
      answerLog += this.objArray[i] + " ";
    }
    console.log(answerLog + "\n========================\n");
  };
  this.userGuess = function (input) {
    for (let i = 0; i < this.objArray.length; i++) {
      this.objArray[i].guess(input);
    }
  };
}
module.exports = Word;