const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');

async function main() {
    try {        
        console.log('Starting the script...');
        console.log('Mostrem el directori actual de treball:', process.cwd());

        // //Obtinguem el resultat del test.
        // const resultat_test = core.getInput('test_result');
        // //Guardem l´insignia de error en cas de que el test falle.
       
        // //Guardem l´insignia que mostrarem al readme depenent del resultat del test.
        // //Guardem el missatge que afegirem abans del l´insignia al readme.
        // const missatge_badge = `RESULTAT DELS ÚLTIMS TESTS \n ![Test result badge](${badge})`;

        // const oldReadmePath = './OldREADME.md';
        // let oldReadmeContent = await fs.readFile(oldReadmePath, 'utf-8');
        // let newReadmeContent = oldReadmeContent + "\n" + missatge_badge;
        const readmePath = path.resolve('./README.md');
        const resultats_test = core.getInput('resultats_test');

        const img_error = 'https://img.shields.io/badge/test-failure-red';
        //Guardem l´insignia del test en cas de que el test resulte exitós.
        const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';

        const badge = resultats_test == 'success' ? img_exit : img_error;

        console.log(resultats_test);
        console.log(badge);
        fs.readFile(readmePath, 'utf8', function (err, data) {
            if (err) throw err;
            let README = data.search(img_exit) !== -1 ? data.replace(img_exit, badge) : date.replace(img_error, badge);
            fs.writeFile(readmePath, README, function (err) {
                if (err) throw err;
                console.log('Bagde añadido correctamente');
                process.exit(0);
            });
                
            
        });



        // console.log(`Attempting to read: ${oldReadmePath}`);
        // console.log('Successfully read OldREADME.md');
        // console.log(`Old README content:\n${oldReadmeContent}`);
        // console.log(`New README content:\n${newReadmeContent}`);
        // console.log(`Attempting to write to: ${readmePath}`);
        // console.log('Successfully wrote to README.md');

        process.exit(0);
    } catch (e) {
        console.error(e);
        core.setFailed(e.message);
    }

};

main();