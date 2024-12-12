const fs = require('fs');
const core = require('@actions/core');

async function run() {
  const cypressOutcome = core.getInput('cypress_outcome');
  const badgeUrl = cypressOutcome === 'success'
    ? 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg'
    : 'https://img.shields.io/badge/test-failure-red';

  const readmePath = './README.md';
  const oldReadmePath = './OldREADME.md'; // Copia de seguretat del README

  // Comprobar si el archivo OldREADME.md existe
  if (!fs.existsSync(oldReadmePath)) {
    // Si no existe, crear una copia de seguridad del README.md
    try {
      fs.copyFileSync(readmePath, oldReadmePath);
      core.info('Copia de seguridad del README.md creada como OldREADME.md');
    } catch (err) {
      core.setFailed(`Error al crear la copia de seguridad: ${err.message}`);
      return;
    }
  }

  // Leer el README original y la copia de seguridad
  let readmeContent;
  let oldReadmeContent;
  
  try {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
    oldReadmeContent = fs.readFileSync(oldReadmePath, 'utf8');
  } catch (err) {
    core.setFailed(`Error al leer los archivos: ${err.message}`);
    return;
  }

  // Comprobar si el texto "RESULTAT DELS ÚLTIMS TESTS" existe
  const resultText = 'RESULTAT DELS ÚLTIMS TESTS';
  const index = readmeContent.indexOf(resultText);

  if (index !== -1) {
    // Sustituir la sección de RESULTAT DELS ÚLTIMS TESTS con el badge
    const newReadmeContent = readmeContent.slice(0, index + resultText.length) +
      `\n![Test Badge](${badgeUrl})\n` +
      readmeContent.slice(index + resultText.length);

    // Escribir los cambios en README.md
    fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
    core.info('Badge añadido al README.md');
  } else {
    core.setFailed('No se ha encontrado la sección "RESULTAT DELS ÚLTIMS TESTS" en README.md');
  }
}

run().catch(error => {
  core.setFailed(error.message);
});
