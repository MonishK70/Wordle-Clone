// Fix letter getting colored yellow when green version has already been guessed, should show yellow again only if letter shows twice if more in word.
// Add html 

const prompt = require("prompt-sync")();
const fs = require("fs");

// Colors for coloring termanal outputs
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

// Crates wordle_words array out of wordle answers JSON file
const wordle_words = JSON.parse(fs.readFileSync("wordle-answers-alphabetical.json", "utf8"));
// Chooses random word from wordle_words array
const word = wordle_words[Math.floor(Math.random() * wordle_words.length)]

// Returns array of length 5 filled with color coorsponding to user_word and word
function check_word(user_word){
    arr = [];
    for(i = 0; i < 5; i++){
        let ith_letter = user_word[i];
        if (word.includes(ith_letter) && word.indexOf(ith_letter) == i){
            arr[i] = GREEN; 
        }else if(word.includes(ith_letter)){
            arr[i] = YELLOW; 
        }else{
            arr[i] = RED;
        }
    }
    return arr;
}

// Main game loop
function main(){
    let tries = 1;
    while(tries <= 6){
        let user_word = prompt("Enter word: ").toLowerCase();
        if(user_word.length === 5){
            let placement_array = check_word(user_word);
            if(placement_array.every(item => item === GREEN)){
                console.log("YOU WIN!!!")
                break;
            }else{
                for(i = 0; i<=4; i++){
                process.stdout.write(placement_array[i] + user_word[i] + RESET);
                }
            console.log();
            }
            tries++;
        }else{
            console.log("Word must be 5 letters long");
        }
    }
    console.log("Sorry you are out of guesses, the word was: " + word);
}

main();