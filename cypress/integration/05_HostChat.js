context('Admin - Chat functions', () => {
    Cypress.Cookies.defaults({ preserve: (cookie) => { return true } });
    logIntoAdmin();
    checkCatchup();
    checkPrayerCatchup();
    sendPrayerResponse();
    deleteMessage()
    sendMessage();
    sendHostMessage();
    setCallout();
    removeCallout();
    setCallout();
});


function logIntoAdmin() {
    it('Log Into Admin', () => {
        cy.visit(Cypress.env('adminUrl') + '/cp/login');
        cy.get('#Email').type(Cypress.env('email'));
        cy.get('#Password').type(Cypress.env('password'));
        cy.get('#SigninButton').click();
        cy.wait(2000);
        cy.get('body').should('contain', 'Private Host Chat');

    });
}

function checkCatchup() {
    it('Check Catchup', () => {
        cy.get('#chatReceive').should('contain', 'Hello World');
        cy.get('#hostChatReceive').should('not.contain', 'Hello World');
    });


}

function checkPrayerCatchup() {
    it('Check Prayer Catchup', () => {
        cy.get('#prayerChat').should('not.be.visible');
        var requests = Cypress.$('#prayerRequests a');
        var id = requests[requests.length - 1].id;
        var name = requests[requests.length - 1].innerText;
        cy.get('#' + id)
            .should('exist')
            .click();
        cy.wait(500);
        cy.get('#prayerChat')
            .should('be.visible')
            .should('contain', name)
            .should('contain', 'pray for me');
    });
}

function sendPrayerResponse() {
    it('Send Prayer Response', () => {
        cy.get('#sendPrivateText').type('Prayer response from host');
        cy.get('#sendPrivateButton').click();
        cy.get('#sendPrivateText').should('have.value', '');
        cy.get('#prayerReceive').should('contain', 'Prayer response from host');
        cy.wait(500);
        cy.get('#hostChatReceive').should('not.contain', 'Prayer response from host');
        cy.get('#chatReceive').should('not.contain', 'Prayer response from host');
        cy.get('#prayerReceive .message').should('have.attr', 'id');
    });
}

function deleteMessage() {
    it('Delete Message', () => {
        var messages = Cypress.$('#chatReceive .message');
        var id = messages[messages.length - 1].id;
        cy.get('#' + id + ' a').click();
        cy.wait(750);
        cy.get('#chatReceive').should('not.contain', 'Testing 10');
        cy.get('#chatReceive').should('contain', 'Testing 9');
    });
}

function sendMessage() {
    it('Send a Message', () => {
        cy.get('#sendText').type('Hello from Host');
        cy.get('#sendMessageButton').click();
        cy.get('#sendText').should('have.value', '');
        cy.get('#chatReceive').should('contain', 'Hello from Host');
        cy.wait(500);
        cy.get('#hostChatReceive').should('not.contain', 'Hello from Host');
        cy.get('#chatReceive .message').should('have.attr', 'id');
    });
}

function sendHostMessage() {
    it('Send a Host Message', () => {
        cy.get('#hostSendText').type('Private chat from Host');
        cy.get('#sendHostMessageButton').click();
        cy.get('#hostSendText').should('have.value', '');
        cy.get('#hostChatReceive').should('contain', 'Private chat from Host');
        cy.wait(500);
        cy.get('#chatReceive').should('not.contain', 'Private chat from Host');
        cy.get('#hostChatReceive .message').should('have.attr', 'id');
    });
}

function setCallout() {
    it('Set Callout', () => {
        cy.get('#calloutText').type('Testing callouts');
        cy.get('#setCalloutButton').click();
        cy.get('#calloutText').should('have.value', '');
        cy.wait(500);
        cy.get('#callout').should('contain', 'Testing callouts');
    });

}

function removeCallout() {
    it('Remove Callout', () => {
        cy.get('#setCalloutButton').click();
        cy.wait(500);
        cy.get('#callout').should('contain', 'Testing callouts');
    });
}