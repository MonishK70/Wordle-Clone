// Creates vars. for HTML ID's
const input = document.getElementById("wordInput");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const error = document.getElementById("error");
const answerOutput = document.getElementById("answer");
const guessesDiv = document.getElementById("guesses");


// Creates guessCounter var.
let guessCounter = 0;

// Creates wordleWords array
let wordleWords = [];
// Creates answer var.
let answer = "";

// Crates wordle_words array out of wordle answers JSON file and assigns one to answer var.
function chooseRandomWord(){
    fetch("wordle-answers-alphabetical.json")
        .then(response => response.json())
        .then(data => {
            wordleWords = data;

            const randomIndex = Math.floor(Math.random() * wordleWords.length);
            answer = wordleWords[randomIndex];

        });
}

// Returns array of length 5 filled with color coorsponding to user_word and answer
function checkWord(userWord){
    arr = [];
    for(i = 0; i < 5; i++){
        let ithLetter = userWord[i];
        if (answer[i] === ithLetter){
            arr[i] = "GREEN"; 
        }else if(answer.includes(ithLetter)){
            arr[i] = "YELLOW"; 
        }else{
            arr[i] = "RED";
        }
    }
    return arr;
}

// Main game loop
function mainGameLoop(userWord){
    if(userWord.length === 5){
        // Gets color array connecting userWord and answer
        let placementArray = checkWord(userWord);
        // Checks if all indexes in placementArray are GREEN, Win clause
        if(placementArray.every(item => item === "GREEN")){
            const userOutput = document.createElement("p");
            for(let i=0;i<userWord.length;i++){
                letter = document.createElement("span");
                letter.textContent = userWord[i];
                letter.classList.add("green");
                userOutput.appendChild(letter);
            }
            userOutput.id = "userOutput";
            guessesDiv.appendChild(userOutput);
            submitBtn.classList = "gray";
            submitBtn.disabled = true;
            error.classList = "";
            error.classList.add("green2");
            error.textContent = "You Win!!!!";
        // Otherwise if indexes aren't GREEN
        }else{
            const userOutput = document.createElement("p");
            for(let i=0;i<userWord.length;i++){
                letter = document.createElement("span");
                if(placementArray[i] === "GREEN"){
                    letter.textContent = userWord[i];
                    letter.classList.add("green");
                    userOutput.appendChild(letter);
                }else if(placementArray[i] === "YELLOW"){
                    letter.textContent = userWord[i];
                    letter.classList.add("yellow");
                    userOutput.appendChild(letter);
                }else{
                    letter.textContent = userWord[i];
                    letter.classList.add("red");
                    userOutput.appendChild(letter);
                }
            }
            guessesDiv.appendChild(userOutput);
        }
    }else{
        error.textContent = "Word Must be 5 Letters Long";
    }
    // Checks if player is out of guesses
    if(guessCounter >= 6){
        error.classList.add("red2");
        error.textContent = "Sorry You Are Out of Guesses";
        answerOutput.textContent = " The Word Was: "+ answer;
        submitBtn.classList = "gray";
        submitBtn.disabled = true;
        submitBtn.textContent = "No Guesses Left";
    }
}
// Chooses words if guessCounter = 0
if(guessCounter === 0){
    chooseRandomWord();
}

// Listens for submit button click 
submitBtn.addEventListener("click", function () {
    // Checks if user input is equal to 5
    if(input.value.length === 5){
        const userWord = input.value;
        input.value = "";
        guessCounter++;
        mainGameLoop(userWord);
    // Otherwise tells user to Pleae Enter a Word With Length Equal to 5
    }else{
        error.classList = "";
        error.classList.add("red2");
        error.textContent = "Pleae Enter a Word With Length Equal to 5"
    }
});

// Listens for reset button click 
resetBtn.addEventListener("click", function (){
    // Resets guessCounter
    guessCounter = 0;

    // Resets HTML tags 
    input.value = "";
    guessesDiv.innerHTML = "";
    submitBtn.disabled = false;
    submitBtn.classList = "";
    submitBtn.textContent = "Submit"
    error.classList = "";
    error.textContent = "";
});