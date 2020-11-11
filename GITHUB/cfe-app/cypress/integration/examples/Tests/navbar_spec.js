describe('Navbar Test', function () {
    it('Checks navbar toggle functionality', function () {
        cy.visit('http://localhost:4200/')
        //initial check
        cy.get('.navbar-image')
          .should('be.visible')

        //closes navbar
        cy.get('.navbar-toggler').click()
        cy.contains('navbar-image')
          .should('not.be.visible')

        //reopens navbar
        cy.get('.navbar-toggler').click()
        cy.get('.navbar-image')
          .should('be.visible')
    })

    it('Checks singleplayer dropdown', function () {
        cy.visit('http://localhost:4200')
        //initial check
        cy.get('[href="#singleplayer"] > .navbar-image')
          .should('be.visible')

        //opens dropdown
        cy.get('[href="#singleplayer"] > .navbar-image').click()
        cy.get('.blackjack-button-sp > .navbar-drop-image')
          .should('be.visible')
          cy.get('.solitaire-button > .navbar-drop-image')
          .should('be.visible')

        //closes dropdown
        cy.get('[href="#singleplayer"] > .navbar-image').click()
        cy.get('.blackjack-button-sp > .navbar-drop-image')
          .should('not.be.visible')
          cy.get('.solitaire-button > .navbar-drop-image')
          .should('not.be.visible')
    })

    it('Checks multiplayer dropdown', function () {
        cy.visit('http://localhost:4200')
        //initial check
        cy.get('[href="#singleplayer"] > .navbar-image')
          .should('be.visible')

        //opens dropdown
        cy.get('[href="#multiplayer"] > .navbar-image').click()
        cy.get('.blackjack-button-mp > .navbar-drop-image')
          .should('be.visible')
          cy.get('.holdem-button > .navbar-drop-image')
          .should('be.visible')

        //closes dropdown
        cy.get('[href="#multiplayer"] > .navbar-image').click()
        cy.get('.blackjack-button-mp > .navbar-drop-image')
          .should('not.be.visible')
          cy.get('.holdem-button > .navbar-drop-image')
          .should('not.be.visible')
        
    })

    it('Validates navigation to Blackjack', function() {
        cy.visit('http://localhost:4200')
        cy.get('[href="#singleplayer"] > .navbar-image').click()
        //navigates to blackjack page
        cy.get('.blackjack-button-sp > .navbar-drop-image').click()
        cy.url().should('include', 'http://localhost:4200/blackjack')
    })
})