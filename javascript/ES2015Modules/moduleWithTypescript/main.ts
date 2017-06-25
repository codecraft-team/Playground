import { showText, main } from './modul.js';

// run the function
showText("I am fom the main.js", 'app');

// now with class
const m = new main();
m.showText("I am from class main", 'class')
m.addText("This is a new div");