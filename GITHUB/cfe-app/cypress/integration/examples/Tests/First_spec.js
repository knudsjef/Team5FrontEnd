describe('Health Test', function () {
    it('Checks health of the homepage', function () {
        cy.visit('http://localhost:4200/')
        cy.get('.navbar-image')
        .should('be.visible')
    })
})