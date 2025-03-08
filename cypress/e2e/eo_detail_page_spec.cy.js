describe('Eos Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/executive_orders', {
      statusCode: 200, 
      fixture: 'all_eos.json'
    }).as('all_eos');


    cy.visit('http://localhost:5173/');
    cy.get('.burger-button').click()
    cy.get('.active').click()
    cy.get('.ExecutiveOrderCard').first().click()
  });

  it('displays title on page load', () => {
    cy.get('h1').contains('RepRadar')
  })

  it('displays title of EO', () => {
    cy.get('.EODetails')
    cy.get('h2').should('contain', "Further Amendment to Duties Addressing the Synthetic Opioid Supply Chain in the People's Republic of China")
  })

  it('displays the document number of EO', () => {
    cy.get('h3')
    .should('contain', "Document #: 2025-03775")
  })

  it('displays the publication date of EO', () => {
    cy.get('h3')
    .should('contain', "Published Date: March 07, 2025")
  })

  it('displays the link to the full EO', () => {
    cy.get('a')
    .should('have.attr', 'href')
  })
})
