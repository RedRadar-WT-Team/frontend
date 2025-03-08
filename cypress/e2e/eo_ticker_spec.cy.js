describe('Homepage Ticker', () => {  
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/executive_orders/recent', {
      statusCode: 200, 
      fixture: 'all_eos.json'
    }).as('all_eos');

    cy.visit('http://localhost:5173/'); 
  });

  it('should render the ticker container and buttons to change slides', () => {
    cy.get('.ticker-container').should('exist')
    cy.get('.btn-slide.next').should('exist')
    cy.get('.btn-slide.prev').should('exist')
    cy.get('img').should('exist')
  });

  it('should render the eo details on the ticker for the eos', () => {
    cy.get('.eo-label').should('contain', '2025-03775')
    cy.get('p').should('contain', 'March 07, 2025')
    cy.get('h3').should('contain', "Further Amendment to Duties Addressing the Synthetic Opioid Supply Chain in the People's Republic of China")
  });
});