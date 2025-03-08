describe('All EOs Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/executive_orders', {
      statusCode: 200, 
      fixture: 'all_eos.json'
    });

    // cy.visit('http://localhost:5173/api/v1/executive_orders');
    cy.visit('http://localhost:5173/');
    cy.get('.burger-button').click()
    cy.get('.active').click()
    cy.get('.ExecutiveOrderCard') 

  })

  it('displays title on page load', () => {
    cy.get('h1')
    .contains('RepRadar')
  })

  it('displays title of EO', () => {
    // cy.get('.h2').first()
    cy.get('h2').first().should('contain', "Further Amendment to Duties Addressing the Synthetic Opioid Supply Chain in the People's Republic of China")
  })

  it('displays the publication date of EO', () => {
    cy.get('p').should('contain', "March 07, 2025")
  })

  it('displays the link to the EO details page', () => {
    cy.get('.ExecutiveOrderCard a')
    .should('have.attr', 'href')
  })

  it('displays a save button', () => {
    cy.get('button')
      .find('img.star')
      .should('exist') // Ensure the image exists
      .and('have.attr', 'src') // Check that it has a 'src' attribute
      .and('not.be.empty');
  })
})