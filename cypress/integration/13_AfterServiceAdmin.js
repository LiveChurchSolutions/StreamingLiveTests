context('Admin - Post Service Chat', () => {
    Cypress.Cookies.defaults({ preserve: (cookie) => { return true } });
    logIntoAdmin();
    editService();
});

function logIntoAdmin() {
    it('Log Into Admin', () => {
        cy.visit(Cypress.env('adminUrl') + '/cp/login?ReturnUrl=%2Fcp%2Fsettings');
        cy.get('#Email').type(Cypress.env('email'));
        cy.get('#Password').type(Cypress.env('password'));
        cy.get('#SigninButton').click();
        cy.get('body').should('contain', 'View your live site:')
    });
}


function editService() {
    it('Set service has ended', () => {
        cy.wait(750);
        var services = Cypress.$('#servicesBox .fa-pencil-alt');
        var id = services[services.length - 1].parentElement.id;
        console.log(id);
        cy.get('#' + id).click();

        var serviceTime = getCurrentMinute();
        serviceTime.setTime(serviceTime.getTime() - 90 * 60 * 1000);

        cy.get('#CountdownTime')
            .should('exist')
            .type(formatDateTimeLocal(serviceTime));
        cy.get('#SaveServiceButton').click();
        cy.get('#PublishButton').click();
        cy.wait(1000);
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