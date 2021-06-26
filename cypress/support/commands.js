import uuid from 'uuid'

Cypress.Commands.add('runAndAwait', (callable, method='GET', addArtificialWait=false) => {
    const requestId = `apiRequest-${uuid()}`;

    cy.server();
    cy.route(method, '**').as(requestId);  // start recording requests
    callable();
    cy.wait(`@${requestId}`);
    cy.route(method, '**').as('untrackedRequest'); // stop recording requests

    // disable eslint warning because we're intentionally waiting
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    if (addArtificialWait) cy.wait(8000);
  });

Cypress.Commands.add('initiateExceptionsLogger', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
    	console.log(err);
    	return false;
    });
});

Cypress.Commands.add('loginToTheLocation', ( location ) => {
    cy.task('getProperty', 'webapp.url').then(baseUrl => {
        cy.visit(`${baseUrl}/login`);
        cy.get('#username').type('admin');
        cy.contains('Continue').click();
        cy.get('#password').type('Admin123');
        cy.contains('Log in').click();
        cy.contains(location).click();
        cy.get('button[type="submit"]').click();
    });
});