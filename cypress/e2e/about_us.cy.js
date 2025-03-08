describe('About Us Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/about');
  });
  
  it('displays correct page title', () => {
    cy.get('h1').should('exist');
    cy.get('h1').should('be.visible');
  });

  it('displays the About Us heading', () => {
    cy.get('h1').should('contain', 'About Us');
  });

  it('displays company name somewhere on the page', () => {
    cy.contains('RepRadar').should('exist');
  });

  it('displays a Mission section heading with the correct titles', () => {
    cy.get('h2').eq(0).should('contain', 'Our Mission');
  });

  it('displays paragraph content under each section heading', () => {
    cy.contains('h2', 'Our Mission').next('p').should('exist');
  });  
})
