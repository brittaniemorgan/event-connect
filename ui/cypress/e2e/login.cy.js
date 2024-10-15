describe('LoginView', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
  });

  it('renders login form', () => {
    cy.get('h1').contains('Login');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button').contains('Login');
  });

  it('logs in successfully and redirects', () => {

    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('form').submit();

    cy.url().should('include', '/');
    cy.get('.flash-message').contains('Login successful.');
  });

  it('shows error message on login failure', () => {

    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('form').submit();

    cy.get('.flash-message').contains('Login failed');
  });

  it('allows navigation to sign up page', () => {
    cy.get('p')
      .contains('Don\'t have an account?')
      .find('a')
      .click();

    cy.url().should('include', '/signup');
  });
});
