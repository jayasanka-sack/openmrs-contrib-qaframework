import {Given} from 'cypress-cucumber-preprocessor/steps';

Given('user login to the Registration Desk', () => {
    cy.loginToTheLocation("Registration Desk")
})

When('user arrives at the home page', () => {
    // cy.task('getProperty', 'webapp.url').then(baseUrl => {
    //     cy.visit(`${baseUrl}/home`);
    //     cy.wait(2000)
    // });
})

When('the user search for {string}', (patientName) => {
    cy.get('button[name=SearchPatientIcon]').click();
    cy.get("input[role=searchbox]").type(patientName);
})

Then('the patient should be there', () => {
    cy.contains('Found 1 patient');
});
