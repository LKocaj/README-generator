// declare

const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/markdown")
const writeFileAsync = util.promisify(fs.writeFile);

//readme questions

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "projectName",
            message: "What is the title of the project?",
        },
        {
            type: "input",
            name: "summary",
            message: "Provide a project summary"
        },
        {
            type: "input",
            name: "installation",
            message: "How do you install this project? ",
        },
        {
            type: "input",
            name: "functionality",
            message: "What function does this project perform?"
        },
        {
            type: "input",
            name: "credits",
            message: "List your collaborators and any attributions that need to be made"
        },
        {
            type: "list",
            name: "license",
            message: "How do you want to license this project? ",
            choices: [
                "Apache",
                "Academic",
                "GNU",
                "ISC",
                "MIT",
                "Mozilla",
                "Open"
            ]
        },

        {
            type: "input",
            name: "testFunctions",
            message: "Is there a test function for the application? "
        },
        {
            type: "input",
            name: "user",
            message: "Please enter your GitHub username: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        }
    ]);
}

async function init() {
    try {
        const data = await promptUser();
        const generateContent = generateMarkdown(data);
        await writeFileAsync('./src/README.md', generateContent);
        console.log('README Generated!');
    } catch (err) {
        console.log(err);
    }
}

init();