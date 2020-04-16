const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["wizard", "programmer", "country"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctWords = [];
const wrongLetters = [];

function display() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
        <span class='letters'> 
          ${correctWords.includes(letter) ? letter : ""}
        </span>
      `
      )
      .join("")}
      `;
  console.log(selectedWord);

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congragulation, You Won";
    popup.style.display = "flex";
  }
}

function keydownFunction(event) {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;

    if (selectedWord.includes(letter)) {
      if (!correctWords.includes(letter)) {
        correctWords.push(letter);
        display();
      } else {
        showNotification();
      }
    } else {
      if (wrongLetters.includes(letter)) {
        showNotification();
      } else {
        wrongLetters.push(letter);
        updateWrongLetters();
      }
    }
  } else {
    alert("You typed a wrong key");
  }
}

window.addEventListener("keydown", keydownFunction);

function updateWrongLetters() {
  wrongLettersEl.innerHTML = `
      ${wrongLetters.length > 0 ? `<p> Wrong </p>` : ''}
      ${wrongLetters.map((letter) => `<span> ${letter} </span>`)}
    `;

  // SHOW ALL PARTS OF MAN
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (errors > index) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // CHECK IF LOST
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "oh sorry, You Lost";
    popup.style.display = "flex";
    window.removeEventListener('keydown' , keydownFunction);
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

playAgainBtn.addEventListener("click", () => {
  wrongLetters.splice(0);
  correctWords.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  window.addEventListener('keydown' , keydownFunction)
  updateWrongLetters();

  popup.style.display = "none";
  display();
});

display();
