Example of nextjs project using Cypress.io

<!---Start place for the badge -->
[![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

<!---End place for the badge -->
# GITHUB ACTIONS DESPLIEGUE

Descripció breu del projecte. Aquí pots incloure una explicació general sobre el que fa el projecte i quins són els seus objectius.

## Introducció a GitHub Actions

**GitHub Actions** és una eina d'automatització proporcionada per GitHub que permet crear fluxos de treball per a la integració contínua (CI) i el desplegament continu (CD). Amb les **GitHub Actions**, podem automatitzar tasques com la construcció de codi, proves automàtiques, i el desplegament d'aplicacions. Aquesta funcionalitat ens permet definir fluxos de treball en fitxers `.yml` dins del directori `.github/workflows`, on podem especificar els diferents passos a realitzar quan es produeixen esdeveniments com un *push*, una *pull request* o un *merge*.

Els fluxos de treball a **GitHub Actions** s'organitzen en **jobs**, que s'executen en màquines virtuals (anomenades *runners*). Aquests *jobs* poden executar-se de manera paral·lela o en sèrie, i poden tenir condicions específiques per a la seva execució.

En aquest projecte, hem utilitzat **GitHub Actions** per automatitzar diverses tasques, com ara la validació de codi amb linters, proves amb Cypress, el desplegament de l'aplicació i l'enviament de notificacions per correu electrònic amb l'estat dels jobs.

## Com funciona el flux de treball

El flux de treball principal es troba a la ruta `.github/workflows/workflow.yml`. Aquí es defineixen els següents **jobs**:

1. **linter_job**: Aquest job s'encarrega d'executar el linters per verificar la qualitat del codi. Si el codi compleix amb les normes establertes, el job es marca com a "èxit".
   
2. **cypress_job**: En aquest job s'executen les proves automàtiques mitjançant **Cypress** per assegurar-nos que l'aplicació funciona correctament. El resultat de les proves s'inclou com a part de la documentació del workflow.
   
3. **add_badge_job**: Aquest job afegeix un *badge* al README del projecte per mostrar l'estat actual del flux de treball de manera visual.

4. **deploy_job**: El job encarregat de desplegar l'aplicació a l'entorn de producció.

5. **notification_job**: Aquest job s'executa sempre, independentment del resultat dels altres jobs. S'encarrega d'enviar un correu electrònic amb els resultats de tots els jobs anteriors.

## Pasos realitzats en el flux de treball

### 1. Creació del Workflow

Primer, vam crear un fitxer de flux de treball anomenat `workflow.yml` a la carpeta `.github/workflows`. Aquest fitxer defineix els diferents **jobs** que es volen executar quan es fa un *push* a la branca `main`.

### 2. Configuració de cada Job

Cada job es va configurar per executar una tasca específica, com s'ha descrit anteriorment. També es va afegir la configuració de sortides (outputs) per obtenir els resultats de cada job, que es van utilitzar posteriorment en el job de notificació.

### 3. Implementació de la Notificació per Correu

El **notification_job** s'encarrega d'enviar un correu electrònic a l'adreça configurada a GitHub Secrets amb els resultats de tots els altres jobs. Aquesta tasca utilitza **Nodemailer** per enviar els correus, i el missatge inclou informació sobre els resultats dels **jobs** de linter, Cypress, badge i desplegament.

### 4. Afegir el Badge al README

En el **add_badge_job**, es va configurar l'acció que afegeix un *badge* dinàmic al fitxer `README.md`, el qual mostra l'estat del flux de treball en temps real. Aquest *badge* es mostra al començament del fitxer `README.md` per a que qualsevol persona que consulti el projecte pugui veure l'estat actual del workflow.

### 5. Configuració de Secrets

Els secrets com el correu electrònic del destinatari (`DESTINATARI_EMAIL`) i les credencials de correu electrònic es van configurar a la secció de Secrets de GitHub per garantir la seguretat.

## Enllaços rellevants

- Repositori GitHub: [(https://github.com/Alejandro-Meren/githubactionsdespliegue.git)](https://github.com/Alejandro-Meren/githubactionsdespliegue.git)
- Projecte desplegat a Vercel: [https://githubactionsdespliegue.vercel.app
](https://githubactionsdespliegue.vercel.app/)
## Conclusions

Amb GitHub Actions, hem aconseguit automatitzar la majoria de tasques relacionades amb la integració i el desplegament continu (CI/CD), com ara la validació del codi, l'execució de proves automàtiques, el desplegament a producció i l'enviament de notificacions. Aquest tipus d'automatització ajuda a millorar la qualitat del codi i a reduir els errors humans en les operacions repetitives, garantint un flux de treball més eficient i fiable.
