const core = require('@actions/core');
const fs = require('fs').promises;
const path = require('path');

console.log('Starting the script...');
console.log('Mostrem el directori actual de treball:', process.cwd());

const readmePath = path.resolve('./README.md');
const resultats_test = core.getInput('resultats_test');

const img_error = 'https://img.shields.io/badge/test-failure-red';
const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
console.log(readmePath);

const badge = resultats_test === "success" ? img_exit : img_error;

console.log(resultats_test);
console.log(badge);

async function updateBadge() {
  try {
    const data = await fs.readFile(readmePath, 'utf8');
    console.log("Archivo README.md leído correctamente.");

    // Verificar y reemplazar la URL del badge
    let updatedReadme;
    if (data.includes(img_exit)) {
      updatedReadme = data.replace(img_exit, badge);
    } else if (data.includes(img_error)) {
      updatedReadme = data.replace(img_error, badge);
    } else {
      updatedReadme = `${data}\n![Badge](${badge})`; // Si no hay badge previo, añadir uno nuevo
    }

    // Escribir los cambios en el archivo README.md
    await fs.writeFile(readmePath, updatedReadme, 'utf8');
    console.log("Badge añadido correctamente.");
    process.exit(0);
  } catch (err) {
    console.error("Error al procesar el archivo README.md:", err.message);
    process.exit(1);
  }
}

updateBadge();
