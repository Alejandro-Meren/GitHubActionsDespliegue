const core = require('@actions/core');
const fs = require('fs').promises;

async function main() {
    try {        
        console.log('Starting the script...');
        console.log('Mostrem el directori actual de treball:', process.cwd());

        //Obtinguem el resultat del test.
        const resultat_test = core.getInput('test_result');
        //Guardem l´insignia de error en cas de que el test falle.
        const img_error = 'https://img.shields.io/badge/test-failure-red';
        //Guardem l´insignia del test en cas de que el test resulte exitós.
        const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
        //Guardem l´insignia que mostrarem al readme depenent del resultat del test.
        const badge = resultat_test === 'success' ? img_exit : img_error;
        //Guardem el missatge que afegirem abans del l´insignia al readme.
        const missatge_badge = `RESULTAT DELS ÚLTIMS TESTS \n ![Test result badge](${badge})`;

        const oldReadmePath = './OldREADME.md';
        let oldReadmeContent = await fs.readFile(oldReadmePath, 'utf-8');
        let newReadmeContent = oldReadmeContent + "\n" + missatge_badge;
        const readmePath = './README.md';
        await fs.writeFile(readmePath, newReadmeContent);

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