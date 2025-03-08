describe('header functionality', () => {
    it('passes', () => {
    cy.visit('http://localhost:5173')

    cy.get('.logo').should('be.visible')

    cy.get('h1').contains('RepRadar')

    cy.get('.burger-button').click()

    cy.get('ul li').should('have.length', 4)

    cy.get('ul li:first').contains('About')
    cy.get('ul li:last').contains('Login')
        .click()

    cy.get('.logo').click()
    cy.url().should('not.include', '/login')
  })
})