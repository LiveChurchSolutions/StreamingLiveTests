context('Admin - Service Inactive', () => {
    Cypress.Cookies.defaults({ preserve: (cookie) => { return true } });
    it('Log into admin', () => { cy.adminLogin() });
    editService();
});

function editService() {
    it('Set Service for 1 hour later', () => {
        cy.wait(1750);
        var services = Cypress.$('#servicesBox .fa-pencil-alt');
        var id = services[services.length - 1].parentElement.id;
        cy.get('#' + id).click();
        cy.wait(500);
        var serviceTime = getCurrentMinute();
        serviceTime.setTime(serviceTime.getTime() + 60 * 60 * 1000); //1 hour

        cy.get('#CountdownTime')
            .should('exist')
            .type(formatDateTimeLocal(serviceTime));
        cy.get('#SaveServiceButton').click();
        cy.get('#PublishButton').click();
        cy.wait(2000);
    });
}


function getCurrentMinute() {
    var result = new Date();
    result.setTime(result.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    var ms = 1000 * 60;
    result = new Date(Math.round(result.getTime() / ms) * ms);
    return result;
}

function formatDateTimeLocal(dt) {
    var result = dt.toISOString().replace('Z', '').split('.')[0];
    result = result.substring(0, result.length - 3);
    return result;
}