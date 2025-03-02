describe('Header functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('passes', () => {
    cy.get('.logo').should('be.visible')

    cy.get('h1').contains('RepRadar')

    cy.get('.burger-button').click()

    cy.get('ul li').should('have.length', 4)

    cy.get('ul li:first').contains('About')
    cy.get('ul li:last').contains('Logout')

    cy.get('ul li:last').click()
    cy.url().should('include', '/logout')

    cy.get('.logo').click()
    cy.url().should('include', '/')
  })
})
