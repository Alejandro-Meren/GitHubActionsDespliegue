const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');

      
console.log('Starting the script...');
console.log('Mostrem el directori actual de treball:', process.cwd());

const readmePath = path.resolve('./README.md');
const resultats_test = core.getInput('resultats_test');

const img_error = 'https://img.shields.io/badge/test-failure-red';
const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';

var badge = resultats_test == "success" ? img_exit : img_error;

console.log(resultats_test);
console.log(badge);
fs.readFile(readmePath, 'utf8', function (err, data) {
    console.log("Entro funcion");
    if (err) throw err;
    let README = data.search(img_exit) !== -1 ? data.replace(img_exit, badge) : date.replace(img_error, badge);
    fs.writeFile(readmePath, README, function (err) {
        if (err) throw err;
        console.log("Bagde añadido correctamente");
        process.exit(0);
    });
});