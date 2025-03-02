describe('homepage view', () => {
  it('loads all components correctly', () => {
    cy.visit('http://localhost:5173')

    cy.get('header').should('be.visible')

    cy.get('.main-content').should('exist')

    cy.get('.searchbar-container').should('exist')

    cy.get('.ticker-container').should('exist')
  })
})