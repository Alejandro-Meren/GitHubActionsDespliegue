const fs = require('fs');
const core = require('@actions/core');

async function run() {
  // Obtener el resultado de Cypress desde los inputs
  const cypressOutcome = core.getInput('cypress_outcome');
  const badgeUrl = cypressOutcome === 'success'
    ? 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg'
    : 'https://img.shields.io/badge/test-failure-red';

  const readmePath = './README.md';
  const oldReadmePath = './OldREADME.md'; // Copia de seguridad del README

  // Imprimir el contenido del README para comprobar que se lee correctamente
  let readmeContent;
  try {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
    core.info('Contenido del README.md:\n' + readmeContent); // Depuración
  } catch (err) {
    core.setFailed(`Error al leer el archivo README.md: ${err.message}`);
    return;
  }

  // Comprobar si el texto "RESULTAT DELS ÚLTIMS TESTS" existe en el README
  const resultText = 'RESULTAT DELS ÚLTIMS TESTS'; // Puedes modificar esto si el texto cambia
  const index = readmeContent.indexOf(resultText);

  if (index !== -1) {
    // Si se encuentra la sección, insertar el badge
    const newReadmeContent = readmeContent.slice(0, index + resultText.length) +
      `\n![Test Badge](${badgeUrl})\n` +
      readmeContent.slice(index + resultText.length);

    // Escribir los cambios en README.md
    try {
      fs.writeFileSync(readmePath, newReadmeContent, 'utf8');
      core.info('Badge añadido al README.md');
    } catch (err) {
      core.setFailed(`Error al escribir en el archivo README.md: ${err.message}`);
    }
  } else {
    core.setFailed('No se ha encontrado la sección "RESULTAT DELS ÚLTIMS TESTS" en README.md');
  }
}

run().catch(error => {
  core.setFailed(error.message);
});
