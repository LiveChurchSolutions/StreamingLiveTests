// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("adminLogin", () => {
    cy.visit(Cypress.env('adminUrl') + '/');
    cy.get('#email').type(Cypress.env('email'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#SigninButton').click();
    cy.get('body').should('contain', 'View your live site:');
});

Cypress.Commands.add("loadPublic", () => {
    cy.visit(Cypress.env('adminUrl') + '/');
    cy.get('#Email').type(Cypress.env('email'));
    cy.get('#Password').type(Cypress.env('password'));
    cy.get('#SigninButton').click();
    cy.get('body').should('contain', 'View your live site:');
});
