const Word = require("./word.js");
const inquirer = require("inquirer");

// create an arry for letters
const letterArray = "abcdefghijklmnopqrstuvwxyz";

// create list of words to choose from
const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "novemver",
  "december",

];

let randomIndex = Math.floor(Math.random() * months.length);
let randomWord = months[randomIndex];

const computerWord = new Word(randomWord);

const requireNewWord = false;

const incorrectLetters = [];
const correctLetters = [];

// Guesses left
let guessesLeft = 10;

function logic() {
  if (requireNewWord) {
    let randomIndex = Math.floor(Math.random() * months.length);
    let randomWord = months[randomIndex];

    computerWord = new Word(randomWord);

    requireNewWord = false;
  }

  const wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function (input) {
        if (
          !letterArray.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log("\nWrong letter, guess again!\n");
          theLogic();
        }
        else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log("\nPreviously guessed letter\n");
            theLogic();
          }
          else {
            const wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            }
            else {
              console.log("\nCorrect!\n");

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            console.log("Guesses Left: " + guessesLeft + "\n");

            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            if (guessesLeft > 0) {
              logic();
            }
            else {
              console.log("Loser!\n");

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  }
  else {
    console.log("YOU WIN!\n");

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would like to do next?:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function (input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      }
      else {
        return;
      }
    });
}

logic();