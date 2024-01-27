/**
 *    CREATING SPLASH SCREEN
 */
document
  .querySelector(".splash-screen button")
  .addEventListener("click", () => {
    document.querySelector(".splash-screen").style.display = "none";
    let playerName = prompt("Enter Your Name");
    if (playerName === "" || playerName === null) {
      playerName = "Unknown";
    }
    document.querySelector(".header .name span").innerHTML =
      playerName.toUpperCase();
  });
/**
 *    CREATE SHUFFLED ARRAY OF 20;
 */

let trash = [];
for (let i = 0; i < 20; i++) {
  let randomIndex = Math.floor(Math.random() * 20);
  trash.includes(randomIndex) ? i-- : trash.push(randomIndex);
}
console.log(trash);
/**
 *    BUILD SHUFFLED CARDS BLOCKS IN GAME CONTAINER
 */
let gameContainer = document.querySelector(".game-container");
let dataArray = [
  "apple",
  "facebook",
  "google",
  "google-play",
  "instagram",
  "messanger",
  "microsoft",
  "snapchat",
  "twitter",
  "whatsapp",
];
for (let j = 0; j < trash.length; j++) {
  let blockDiv = document.createElement("div");
  let cardBack = document.createElement("div");
  let cardFace = document.createElement("div");
  blockDiv.className = "block";
  cardBack.className = "back";
  cardFace.className = "face";
  if (trash[j] >= 10) {
    trash[j] = trash[j] - 10;
  }
  let img = document.createElement("img");
  img.src = `./images/img-${trash[j] + 1}.svg`;
  cardFace.append(img);
  blockDiv.append(cardBack);
  blockDiv.append(cardFace);
  blockDiv.dataset.technology = `${dataArray[trash[j]]}`;
  gameContainer.append(blockDiv);
}

/**
 *    ADDING EVENT ARRAY TO ALL BLOCKS
 */
let blocksArr = document.querySelectorAll(".block");
let checkingArr = [];
blocksArr.forEach((element) => {
  element.addEventListener("click", (e) => {
    console.log(e.target);
    e.target.parentElement.classList.add("flipped");
    checkingArr.push(e.target.parentElement);
    checking(checkingArr);
  });
});
/**
 *    GAME LOGIC
 */
let wrongTries = document.querySelector(".wrong-tries span");
function checking(x) {
  if (x.length === 2) {
    console.log(x.length);
    console.log(x);
    blocksArr.forEach((e) => {
      e.parentElement.classList.add("forbid");
    });
    if (x[0].dataset.technology === x[1].dataset.technology) {
      setTimeout(() => {
        x.forEach((y) => {
          y.classList.add("correct");
          // y.classList.remove("forbid");
          document.querySelector(".game-container").classList.remove("forbid");
          checkingArr = [];
        });
      }, 1000);
      if (document.querySelectorAll(".correct").length === 20) {
        winMessage();
      }
    } else {
      wrongTries.innerHTML = parseInt(wrongTries.innerHTML) - 1;
      if (parseInt(wrongTries.innerHTML) === 0) {
        loseMessage();
      } else {
        setTimeout(() => {
          x.forEach((y) => {
            y.classList.remove("forbid");
            y.classList.remove("flipped");
            document
              .querySelector(".game-container")
              .classList.remove("forbid");
            checkingArr = [];
          });
        }, 1000);
      }
    }
  }
}

function winMessage() {
  let splashScreen = document.querySelector(".splash-screen");
  let correctBlocks = document.querySelectorAll(
    ".game-container .flipped.correct"
  );
  if (correctBlocks.length < blocksArr.length) {
    let messageP = document.createElement("p");
    messageP.innerHTML = `Congratulations!<br>You Win`;
    splashScreen.prepend(messageP);
    messageP.style.cssText =
      "font-size:50px;font-weight:bold; color:orange;align-text:center;";
    document.querySelector(".splash-screen button").style.display = "none";
    splashScreen.style.display = "block";
  }
}

function loseMessage() {
  setTimeout(() => {
    let splashScreen = document.querySelector(".splash-screen");
    let messageP = document.createElement("p");
    messageP.innerHTML = `Sorry!!<br>You Lost`;
    splashScreen.prepend(messageP);
    document.querySelector(".splash-screen button").style.display = "none";
    splashScreen.style.display = "block";
  }, 1000);
}
