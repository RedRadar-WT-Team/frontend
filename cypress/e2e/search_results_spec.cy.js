describe('Search Results', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/executive_orders/recent', {
      statusCode: 200,
      fixture: 'reps.json'
    });

    cy.visit('http://localhost:5173/');
  });

  it('should intercept the GET request and dispay the mock data', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/representatives/search?db=false&query=20854', {
      statusCode: 200,
      fixture: 'reps.json'
    }).as('searchRequest');

    cy.get('input[name="searchInput"]').type('20854');
    cy.get('.search_bar button').click();

    cy.wait('@searchRequest');

    cy.get('.results_container .search-card').should('have.length', 3);

    cy.get('.results_container .search-card').first().within(() => {
      cy.get('.search-card-name').should('contain', 'Steven Horsford');
      cy.get('.search-card-area').should('contain', 'US House');
      cy.get('.search-card-party').should('contain', 'Democrat');
      cy.get('.search-card-state').should('contain', 'NV');
    });

    cy.get('.results_container .search-card').last().within(() => {
      cy.get('.search-card-name').should('contain', 'Jacky Rosen');
      cy.get('.search-card-area').should('contain', 'US Senate');
      cy.get('.search-card-party').should('contain', 'Democrat');
      cy.get('.search-card-state').should('contain', 'NV');
    });
  });
});
