const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// const { choices } = require("yargs");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const questions = [{
    name: "member",
    type: "list",
    message: "Would you like to add a [Manager], [Engineer], or [Intern] to your project?",
    choices: ["Manager", "Engineer", "Intern"]
    },
    {
    name: "name",
    type: "input",
    message: "What is the employee's name?"
    },
    {
    name: "id",
    type: "input",
    message: "What is the employee's id?"
    },
    {
    name: "email",
    type: "input",
    message: "What is the employee's email?"
    }];

const addEmployee = {
    name: "add",
    type: "list",
    message: "Would you like to add another Employee to your project?",
    choices: ["YES", "NO"]
};

const ifManager = {
    name: "officeNumber",
    type: "input",
    message: "What is the Manager's office number?"
};

const ifEngineer = {
    name: "github",
    type: "input",
    message: "What is the engineer's github?"
};

const ifIntern = {
    name: "school",
    type: "input",
    message: "What school does the intern attend?"
};

const employees = [];

function writeToHTML() { 
    let html = render(employees);
    fs.writeFile(outputPath, html, () => console.log("Wrote to file."));
};

function start() {
    inquirer.prompt(questions)
        .then(function(answers) {
            if (answers.member === "Manager") {
                inquirer.prompt([ifManager, addEmployee])
                .then(function(data) {
                    employees.push(new Manager(answers.name, answers.id, answers.email, data.officeNumber));
                    if (data.add === "YES") {
                        console.log(employees);
                        writeToHTML() 
                        start();
                    } else {
                        writeToHTML() 
                        return;
                    }
                });
            } else if (answers.member === "Engineer") {
                inquirer.prompt([ifEngineer, addEmployee])
                .then(function(data) {
                    employees.push(new Engineer(answers.name, answers.id, answers.email, data.github));
                    if (data.add === "YES") {
                        console.log(employees);
                        writeToHTML() 
                        start();
                    } else {
                        writeToHTML() 
                        return;
                    }
                });
            } else if (answers.member === "Intern") {
                inquirer.prompt([ifIntern, addEmployee])
                .then(function(data) {
                    employees.push(new Intern(answers.name, answers.id, answers.email, data.school));
                    if (data.add === "YES") {
                        console.log(employees);
                        writeToHTML() 
                        start();
                    } else {
                        writeToHTML() 
                        return;
                    }
                });
            }
        })
    };

start();

// use node app.js to run this app.