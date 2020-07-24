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
			name: 'title',
			message: 'Project Title:'
		},
		{
			type: 'input',
			name: 'description',
			message: 'Project Description:'
		},
		{
			type: 'checkbox',
			name: 'languages',
			message: 'Languages Used:',
			choices: [
				'HTML', 
				'CSS', 
				'JavaScript', 
				'API',
				'Node.JS',
				'Express.JS',
				'MySQL'
			]
		},
		{
			type: 'input',
			name: 'projectimage',
			message: 'Project Image URL:'
		},
		{
			type: 'input',
			name: 'asa',
			prefix: 'User Story',
			message: 'AS A:'
		},	
		{
			type: 'input',
			name: 'iwant',
			prefix: 'User Story',
			message: 'I WANT:'
		},
		{
			type: 'input',
			name: 'sothat',
			prefix: 'User Story',
			message: 'SO THAT:'
		},
		{
			type: 'input',
			name: 'given',
			prefix: 'Functionality',
			message: 'GIVEN:'
		},
		{
			type: 'input',
			name: 'when',
			prefix: 'Functionality',
			message: 'WHEN:'
		},
		{
			type: 'input',
			name: 'then',
			prefix: 'Functionality',
			message: 'THEN:'
		},
		{
			type: 'input',
			name: 'installation',
			message: 'Installation Instructions:'
		},
		{
			type: 'input',
			name: 'usagepic',
			prefix: 'Usage',
			message: 'Image URL:'
		},
		{
			type: 'input',
			name: 'usagedesc',
			prefix: 'Usage',
			message: 'Image Description:'
		},
		{
			type: 'input',
			name: 'video',
			prefix: 'Walkthrough',
			message: 'Video Image URL:'
		},
		{
			type: 'input',
			name: 'videolink',
			prefix: 'Walkthrough',
			message: 'Video Link:'
		},
		{
			type: 'number',
			name: 'year',
			prefix: 'License',
			message: 'Year:'
		},
		{
			type: 'input',
			name: 'name',
			prefix: 'License',
			message: 'Your Name:'
		},
		{
			type: 'list',
			name: 'license',
			prefix: 'License',
			message: 'License Type:',
			choices: [
				'None',
				'Apache License 2.0', 
				'GNU General Public License v3.0', 
				'MIT License', 
				'BSD 2-Clause "Simplified" License',
				'BSD 3-Clause "New" or "Revised" License',
				'Boost Software License 1.0',
				'Creative Commons Zero v1.0 Universal',
				'Eclipse Public License 1.0',
				'GNU Affero General Public License v3.0',
				'GNU General Public License v2.0',
				'GNU Lesser General Public License v2.1',
				'Mozilla Public License 2.0',
				'The Unlicense'
			]
		}
	]);
}

// adding the file formatting
function generateFile({ title, description, languages, projectimage, asa, iwant, sothat, given, when, then, installation, usagepic, usagedesc, video, videolink, year, name, license }) {	
	
	// split languages results into array
	const langArray = [];
	const lang = `${languages}`.split(',');
	langArray.push(lang);
	
	// return badge if language is selected
	const html = (langArray[0].includes('HTML')) ? '![HTML Badge](https://img.shields.io/badge/-HTML-323795) ':'';
	const css = (langArray[0].includes('CSS')) ? '![CSS Badge](https://img.shields.io/badge/-CSS-01A990) ':'';
	const js = (langArray[0].includes('JavaScript')) ? '![JavaScript Badge](https://img.shields.io/badge/-JavaScript-539436) ':'';
	const api = (langArray[0].includes('API')) ? '![API Badge](https://img.shields.io/badge/-API-F58021) ':'';
	const nodejs = (langArray[0].includes('Node.JS')) ? '![Node.JS Badge](https://img.shields.io/badge/-Node.JS-CF1848) ':'';
	const express = (langArray[0].includes('Express.JS')) ? '![Express.JS Badge](https://img.shields.io/badge/-Express.JS-750460) ':'';
	const sql = (langArray[0].includes('MySQL')) ? '![MySQL Badge](https://img.shields.io/badge/-MySQL-61489C) ':'';
	
	const licenseText = (license === 'None') ? '':`Licensed under the ${license}`;
	
	return `# ${title}
${description}

${html}${css}${js}${api}${nodejs}${express}${sql}

![Application Screenshot](${projectimage})


## User Story` + 
'\n```\n' +
`As a ${asa}
I want ${iwant}
So that ${sothat}` +
'\n```' +
`


## Functionality` +
'\n```\n' +
`GIVEN ${given}
WHEN ${when}
THEN ${then}` +
'\n```' +
`


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Walkthrough](#walkthrough)
* [Contributing](#contributing)
* [Tests](#tests)
* [FAQ](#faq)
* [Credits](#credits)
* [Donate](#donate)
* [License](#license)


## Installation
${installation}


## Usage
![Application Screenshot](${usagepic})
${usagedesc}


## Walkthrough
[![Walkthrough Video Screenshot](${video})](${videolink})


## Contributing
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula elementum ex vel rutrum. Etiam auctor sem in ipsum luctus, non mollis lorem bibendum. Cras eget fermentum sapien.


## Tests
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula elementum ex vel rutrum. Etiam auctor sem in ipsum luctus, non mollis lorem bibendum. Cras eget fermentum sapien.


## FAQ
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula elementum ex vel rutrum. Etiam auctor sem in ipsum luctus, non mollis lorem bibendum. Cras eget fermentum sapien.


## Credits
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula elementum ex vel rutrum. Etiam auctor sem in ipsum luctus, non mollis lorem bibendum. Cras eget fermentum sapien.


## Donate
Appreciate this code? Say thanks with a coffee:

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/W7W21YVJJ)


## License
Copyright (c) ${year} ${name}. ${licenseText}`;
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