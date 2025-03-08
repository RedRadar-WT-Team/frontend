describe('Rep details view', () => {

  const validZip = '55448'

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.get('input').click()
    cy.get('input[type="text"]').type(validZip);
    cy.get('.search-button').click()
    cy.get('.search-card').first().click().click()
  });

  it('should render the image for the representative', () => {
    cy.get('.rep-card-img').should('have.attr', 'src').and('include', 'https://images.5calls.org/house/256/M001234.jpg')
  });

  it('should render the name of the representative', () => {
    cy.get('h1').should('contain', 'Kelly Morrison')
  });

  it('should render the area of the representative', () => {
    cy.get('h2').should('contain', 'US House')
  });

  it('should render the state of the representative', () => {
    cy.get('h2').should('contain', 'MN')
  });

  it('should render the location(zip code) of the representative', () => {
    cy.get('h2').should('contain', '55448')
  });

  it('should render the party of the representative', () => {
    cy.get('h2').should('contain', 'Democrat')
  });

  it('should render the phone number of the representative', () => {
    cy.get('h2').should('contain', '202-225-2871')
  });

  it('should render the reason of the representative', () => {
    cy.get('h2').should('contain', 'Democrat')
  });
});