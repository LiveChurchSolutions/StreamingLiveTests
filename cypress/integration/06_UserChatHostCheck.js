/// <reference types="cypress" />
var userName = ''

context('User - Verify Callout and Delete', () => {
    before(() => {
        cy.visit(Cypress.env('url'));
        userName = 'TestUser' + Math.floor(Math.random() * 1000000).toString();
        cy.wait(500);
    })
        
    checkCallout();
    checkDelete();
});



function checkCallout() {
    it('Check callout', () => {
        cy.get('#callout').should('contain', 'Testing callouts');
    });
}

function checkDelete() {
    it('Check delete', () => {
        cy.get('#chatReceive')
            .should('contain', 'Testing 9')
            .should('not.contain', 'Testing 10');
    });
}
