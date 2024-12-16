const nodemailer = require('nodemailer');
const core = require('@actions/core');

async function run() {
  try {
    // Obtener los inputs proporcionados en el workflow
    const destinatari = core.getInput('destinatari_email');
    const workflow = core.getInput('nom_repositori_workflow');
    const resultatLinter = core.getInput('resultat_linter');
    const resultatCypress = core.getInput('resultat_cypress');
    const resultatBadge = core.getInput('resultat_badge');
    const resultatDeploy = core.getInput('resultat_deploy');

    // Crear el cuerpo del mensaje
    const asunto = `Resultat del workflow: ${workflow}`;
    const mensaje = `
    S'ha realitzat un push en la branca main que ha provocat l'execució del workflow ${workflow} amb els següents resultats:

    - linter_job: ${resultatLinter}
    - cypress_job: ${resultatCypress}
    - add_badge_job: ${resultatBadge}
    - deploy_job: ${resultatDeploy}
    `;

    // Configuración de Nodemailer para enviar el correo
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes cambiar el servicio si no usas Gmail
      auth: {
        user: process.env.EMAIL_SECRET, // Configurado como secret en GitHub
        pass: process.env.EMAIL_PASS,   // Configurado como secret en GitHub
      },
    });

    await transporter.sendMail({
      from: `"GitHub Actions" <${process.env.EMAIL_SECRET}>`,
      to: destinatari,
      subject: asunto,
      text: mensaje,
    });

    core.setOutput('msg', 'Correo enviado correctamente');
  } catch (error) {
    core.setFailed(`Error enviando correo: ${error.message}`);
  }
}

run();
