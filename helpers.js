/*
 *
  This is a file of data and helper functions that we can expose and use in our templating function
*/

// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');

// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2);

// Making a static map is really long - this is a handy helper function to make one
// exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`;

// Inserting an SVG
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Check the current path
exports.addActiveByCurrentPath = (path, testValue) => path === testValue ? 'is-active' : '';

// Check if two values are equal
exports.equals = (valueOne, valueTwo) => valueOne === valueTwo ? true : false;

// Convert ObjectId to string
exports.getString = obj => obj.toString();

exports.compare = (first, second) => first > second ? true : false;

exports.addNumber = (target, number) => Number(target) + number;

exports.includes = (array, value) => array.indexOf(value) >= 0 ? true : false;

exports.repeat = (item, times, total) => {
	let output = '';
	let count = total ? Number(total) - Number(times) : times;
	for (let i = 0; i < count; i++) {
		output += item;
	}
	return output;
};

exports.arrayFive = [5, 4, 3, 2, 1];
exports.technologies = ['Vanilla', 'Node.js', 'React', 'Angular', 'Vue', 'TypeScript', 'PWA', 'Graphical/Visualization', 'Data-Driven', 'Paid Course'];

exports.siteName = 'JavaScriptBest';