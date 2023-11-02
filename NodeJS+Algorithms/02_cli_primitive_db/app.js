const inquirer = require("inquirer");
const fs = require("fs");

const ageRegExp = /^[0-9]+$/;
const questions = [
  {
    type: "input",
    name: "first_name",
    message: "Enter the Users name. To cancel press ENTER:",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose your gender:",
    choices: ["male", "female"],
    when: (answers) => answers.first_name !== "",
  },
  {
    type: "input",
    name: "age",
    message: "Enter your age:",
    when: (answers) => answers.first_name !== "",
    validate(value) {
      const age = value.match(ageRegExp);
      if (age) {
        return true;
      }

      return "Please enter a positive number";
    },
  },
  {
    type: "confirm",
    name: "search",
    message: "Would you to search values in DB?",
    when: (answers) => answers.first_name === "",
  },
];

function addUserToDb() {
  inquirer.prompt(questions).then((answers) => {
    if (answers.first_name !== "") {
      const newUser = JSON.stringify(answers);
      fs.appendFile("users.txt", newUser + "\n", function (error) {
        if (error) throw error;
      });
    }
    if (answers.search === true) {
      findUsersInDb();
    } else {
      addUserToDb();
    }
  });
}

function findUsersInDb() {
  fs.readFile("users.txt", "utf8", (error, data) => {
    if (error) throw error;

    const users = [];
    const userLines = data.split("\n");

    userLines.forEach((line) => {
      if (line.trim() !== "") {
        try {
          const user = JSON.parse(line);
          users.push(user);
        } catch (error) {
          console.log(error);
        }
      }
    });
    console.log(users);
    inquirer
      .prompt([
        {
          type: "input",
          name: "find_user",
          message: "Enter the Users name you wanna find in DB:",
        },
      ])
      .then((answer) => {
        findUserByNameInDb(users, answer.find_user);
      });
  });
}

function findUserByNameInDb(users, name) {
  const currentUser = users.find(
    (user) => user.first_name.toLowerCase() === name.toLowerCase()
  );
  if (currentUser) {
    console.log(`User ${name} was found.`);
    console.log(currentUser);
  } else {
    console.log(`User ${name} was not found.`);
  }
}

addUserToDb();
