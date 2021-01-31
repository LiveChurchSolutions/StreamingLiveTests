/// <reference types="cypress" />
var userName = ''

context('User - Before Service Chat', () => {
    before(() => {
        cy.visit(Cypress.env('url'));
        userName = 'TestUser' + Math.floor(Math.random() * 1000000).toString();
        cy.wait(2000);
    })

    chatEnabled();
    showingCountdown();
    setDisplayName();
    testMessage();
    testPrayer();
    testCatchup();
    postSeveralMessages();
});

function chatEnabled() {
    it('Chat is enabled', () => {
        cy.get('#chatContainer')
            .should('not.have.class', 'chatDisabled');
    });
}

function showingCountdown() {
    it('Countdown is shown', () => {
        cy.get('#videoFrame')
            .should('not.be.visible');
        cy.get('#noVideoContent')
            .should('be.visible')
            .should('contain', 'Next Service Time');
    });
}


function postSeveralMessages() {
    it('Post Several Messages', () => {
        userName = userName + 'b';
        cy.get('#nameLink').click();
        cy.get('#nameText').type(userName, { delay: 50 })
        cy.get('#setNameButton').click();

        for (var i = 1; i < 11; i++) {
            cy.get('#sendText').type('Testing ' + i.toString());
            cy.get('#sendMessageButton').click();
        }
        cy.wait(500);
        for (var i = 1; i < 11; i++) {
            cy.get('#chatReceive').should('contain', 'Testing ' + i.toString());
        }
    });
}



function testCatchup() {
    it('Test Catchup', () => {
        cy.visit(Cypress.env('url'));
        cy.wait(500);
        cy.get('#chatReceive')
            .should('contain', userName)
            .should('contain', 'Hello World');
    });
}


function setDisplayName() {
    it('Set Display Name', () => {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('#chatContainer')
            .should('exist')
            .should('not.have.class', 'chatDisabled');
        cy.get('#nameLink').should('exist').click();
        cy.get('#nameText')
            .should('be.visible')
            .type(userName, { delay: 50 })
            .should('have.value', userName);
        cy.get('#setNameButton').click();
        cy.get('#nameLink').should('contain', userName);
    });
}

function testPrayer() {
    it('Request Prayer', () => {
        cy.get('.altTab').find('.fa-praying-hands').click();
        cy.get('#prayerNameText').should('not.be.visible');
        cy.get('#requestPrayerButton')
            .should('be.visible')
            .click()
            .should('not.exist');
        cy.get('#sendText')
            .should('be.visible')
            .type('Could you pray for me?', { delay: 50 })
            .should('have.value', 'Could you pray for me?');
        cy.get('#sendMessageButton').click();
        cy.get('#chatReceive')
            .should('contain', userName)
            .should('contain', 'Could you pray for me?');
        cy.wait(500);
        cy.get('#chatReceive .message').should('exist');
        //cy.get('#chatReceive').should('not.contain', 'Could you pray for me ?');
    });
}


function testMessage() {
    it('Send a Message', () => {
        cy.get('#nameText').should('not.be.visible');
        cy.get('#sendText')
            .should('be.visible')
            .type('Hello World', { delay: 50 })
            .should('have.value', 'Hello World');
        cy.get('#sendMessageButton').click();
        cy.get('#sendText')
            .should('have.value', '');
        cy.get('#chatReceive')
            .should('contain', userName)
            .should('contain', 'Hello World');
        cy.wait(500);
        //cy.get('#chatReceive .message').should('have.attr', 'id');
    });
}
