/// <reference types="cypress" />
var userName = ''

context('User - Almost Over', () => {
    before(() => {
        cy.visit(Cypress.env('url'));
        cy.wait(2000);
    })

    chatEnabled();
    showingVideo();
});


function chatEnabled() {
    it('Chat is enabled', () => {
        cy.get('#chatContainer')
            .should('not.have.class', 'chatDisabled');
    });
}

function showingVideo() {
    it('Video is shown', () => {
        cy.get('#videoFrame')
            .should('be.visible');
        cy.get('#noVideoContent')
            .should('not.be.visible');
    });
}