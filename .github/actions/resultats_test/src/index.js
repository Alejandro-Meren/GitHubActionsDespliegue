const fs = require('fs');
const core = require('@actions/core');

async function run() {
  const cypressOutcome = core.getInput('cypress_outcome');
  const badgeUrl = cypressOutcome === 'success'
    ? 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg'
    : 'https://img.shields.io/badge/test-failure-red';

  const readmePath = './README.md';
  const oldReadmePath = './OldREADME.md'; // Copia de seguretat del README

  // Llegir el README original i la seva còpia de seguretat
  let readmeContent = fs.readFileSync(readmePath, 'utf8');
  const oldReadmeContent = fs.readFileSync(oldReadmePath, 'utf8');

  // Comprovar si el text "RESULTAT DELS ÚLTIMS TESTS" existeix
  const resultText = 'RESULTAT DELS ÚLTIMS TESTS';
  const index = readmeContent.indexOf(resultText);

  if (index !== -1) {
    // Substituir la secció de RESULTAT DELS ÚLTIMS TESTS amb el badge
    const newReadmeContent = readmeContent.slice(0, index + resultText.length) +
      `\n![Test Badge](${badgeUrl})\n` +
      readmeContent.slice(index + resultText.length);

    // Escriure els canvis al README.md
    fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
    core.info('Badge afegit al README.md');
  } else {
    core.setFailed('No s\'ha trobat la secció "RESULTAT DELS ÚLTIMS TESTS" al README.md');
  }
}

run().catch(error => {
  core.setFailed(error.message);
});

