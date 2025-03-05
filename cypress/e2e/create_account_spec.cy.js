describe('Create Account Form', () => {
  const validEmail = 'cypresstest@email.com';
  const validZip = '12345'

  const invalidEmail = 'invalidemail';
  const invalidZip = '12';

  beforeEach(() => {
    cy.visit('/create_account'); 
  });

  it('should render the form inputs and submit button', () => {
    cy.get('h2').should('contain', 'Create account'); 

    cy.get('input[type="email"]').should('exist');
    cy.get('.form-input-state').should('exist');
    cy.get('input[type="text"]').should('exist');  
    cy.get('button[type="submit"]').should('exist');
  });

  it('should display error when email is not valid', () => {
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('select').select('California');
    cy.get('input[type="text"]').type(validZip);  

    cy.get('button[type="submit"]').click();

    cy.get('p').should('contain', 'Email is not a valid email format');
  });

  it('should display error when zip code is not valid', () => {
    cy.get('input[type="email"]').type(validEmail);
    cy.get('select').select('California');
    cy.get('input[type="text"]').type(invalidZip);  

    cy.get('button[type="submit"]').click();

    cy.get('p').should('contain', 'Zip must be a valid 5-digit zip code'); 
  });

  it('should display error when state is blank', () => {
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="text"]').type(validZip);  

    cy.get('button[type="submit"]').click();

    cy.get('p').should('contain', `State can't be blank`); 
  });

  it('should display success message when account is created', () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/users', {
      statusCode: 201,
      body: { message: 'Account created successfully!' },
    }).as('postUser');

    cy.get('input[type="email"]').type(validEmail);
    cy.get('select').select('California');
    cy.get('input[type="text"]').type(validZip); 
    cy.get('button[type="submit"]').click();

    cy.wait('@postUser');

    cy.get('p').should('contain', 'Your account has been created successfully!');
  });

  it('should reset the form after successful submission', () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/users', {
      statusCode: 201,
      body: { message: 'Account created successfully!' },
    }).as('postUser');

    cy.get('input[type="email"]').type('anotheruser@email.com');
    cy.get('select').select('California');
    cy.get('input[type="text"]').type(validZip);
    cy.get('button[type="submit"]').click();

    cy.wait('@postUser');

    cy.get('input[type="email"]').should('have.value', '');
    cy.get('select').should('contain', 'Select a state');
    cy.get('input[type="text"]').should('have.value', '');
  });

  it('should display error if email is not unique to database', () => {
    cy.intercept('POST', 'http://localhost:3000/api/v1/users', {
      statusCode: 422,
      body: { errors: 'Email is already taken' },
    }).as('postUser');

    cy.get('input[type="email"]').type('user@domain.com');
    cy.get('input[type="text"]').type('123'); 
    cy.get('button[type="submit"]').click();

    cy.wait('@postUser');

    cy.get('p').should('contain', 'Email is already taken');
  });
});