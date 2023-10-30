const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getInputData() {
  rl.question(
    "Hello! Enter 10 words or digits dividing them in space:\n",
    (answer) => {
      if (answer.trim() === "") {
        rl.question("Your data is empty! Please enter data\n", (answer) =>
          selectSortMethod(answer)
        );
      } else {
        selectSortMethod(answer);
      }
    }
  );
}

function selectSortMethod(answer) {
  rl.question(
    "How would you like to sort values?\n 1. Sort words alphabetically\n 2. Show numbers from lesser to greater\n 3. Show numbers from bigger to smaller\n 4. Display words in ascending order by number of letters in the word\n 5. Show only unique words\n 6. Display only unique values from the set of words and numbers entered by the user\n Select (1-6) and press ENTER: ",
    (method) => {
      if (method.toLowerCase() === "exit") {
        console.log("Good bye! Come back again!");
        rl.close();
      } else {
        sortData(answer, method);
      }
    }
  );
}

function sortData(answer, method) {
  const answersArr = answer.split(/\s+/);
  let sorted = null;
  switch (method) {
    case "1":
      sorted = onlyWords(answersArr).sort();
      console.log(sorted);
      break;
    case "2":
      sorted = answersArr
        .filter((answer) => !isNaN(answer))
        .sort((a, b) => a - b);
      console.log(sorted);
      break;
    case "3":
      sorted = answersArr
        .filter((answer) => !isNaN(answer))
        .sort((a, b) => b - a);
      console.log(sorted);
      break;
    case "4":
      sorted = onlyWords(answersArr).sort((a, b) => a.length - b.length);
      console.log(sorted);
      break;
    case "5":
      const words = onlyWords(answersArr);
      sorted = new Set(words);
      console.log([...sorted]);
      break;
    case "6":
      sorted = new Set(answersArr);
      console.log([...sorted]);
      break;
    default:
      console.log("Wrong! Please select [1-6]");
      selectSortMethod(answer);
  }
  getInputData();
}

function onlyWords(answersArr) {
  return answersArr.filter((answer) => {
    const isWord = /^[A-Za-z]+$/.test(answer);
    const isNotNumber = isNaN(answer);
    return isWord && isNotNumber;
  });
}

getInputData();
