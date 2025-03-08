describe('homepage view', () => {
  it('loads all components correctly', () => {
    cy.visit('http://localhost:5173')

    cy.get('header').should('be.visible')

    cy.get('.content').should('exist')

    cy.get('.searchbar-container').should('exist')

    cy.get('.ticker-container').should('exist')
  })

  it('displays serach components correctly', () => {
    cy.visit('http://localhost:5173')

    cy.get('.search_bar_container').should('exist')
    cy.get('.search_bar_container h2').should('contain', 'Find your local Representatives!')
    cy.get('.search_bar_container input').should('exist')
    cy.get('.search-button').should('exist')
    
  })
})
