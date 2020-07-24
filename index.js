const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');

// wfa = short for write file async
const wfa = util.promisify(fs.writeFile);

// creating our user generated prompts
function prompts() {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'input',
			message: 'Add Some Input Text:'
		},
		{
			type: 'number',
			name: 'number',
			message: 'Add a Number:'
		},
		{
			type: 'confirm',
			name: 'confirm',
			message: 'A Yes/No Question:'
		},
		{
			type: 'checkbox',
			name: 'checkbox',
			message: 'Check Some Boxes:',
			choices: [
				'Option 1', 
				'Option 2', 
				'Option 3', 
				'Option 4'
			]
		},
		{
			type: 'list',
			name: 'list',
			message: 'Select From the List:',
			choices: [
				'Option 1', 
				'Option 2', 
				'Option 3', 
				'Option 4'
			]
		}
		
	]);
}

// adding the file formatting
function generateFile({ input, number, confirm, checkbox, list }) {	
	return `
Input Example: ${input}
Number Example: ${number}
Confirm Example: ${confirm}
Checkbox Example: ${checkbox}
List Example: ${list}`;
}

// writes the file based on the users answers and file formatting
async function init() {
	try {
		const answers = await prompts();
		const file = generateFile(answers);		
		await wfa('readme.md', file);
		console.log('Success: New README file has been generated.');
	} catch (err) {
		console.log(err);
	}
}
init();