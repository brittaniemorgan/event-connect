describe('Ticket Management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/');
    cy.wait(1000);
    cy.get('.nav-link').contains('Organizer Dashboard').click();
    cy.get('.nav-button').contains('Ticket Management').click();
    cy.get('#event').select('Christmas Concert');
  });

  it('should allow a user to select an event and add a ticket type', () => {
    cy.get('input[placeholder="Ticket Type"]').type('Student');
    cy.get('input[placeholder="Price"]').type('1000');
    cy.get('input[placeholder="Quantity"]').type('150');
    cy.get('form').submit();
    cy.contains('Current Ticket Types').should('exist');
    cy.contains('VIP Ticket').should('exist');
    cy.contains('Price: $100').should('exist');
    cy.contains('Remaining: 50 / 50').should('exist');
  });

  it('should allow a user to edit a ticket type', () => {
    cy.get('input[placeholder="Ticket Type"]').type('Student');
    cy.get('input[placeholder="Price"]').type('500');
    cy.get('input[placeholder="Quantity"]').type('100');
    cy.get('button.btn-primary').contains('Add Ticket Type').click();
    cy.get('button.btn-primary').contains('Edit').first().click();
    cy.get('input#edit-type').clear().type('Updated Student');
    cy.get('input#edit-cost').clear().type('75');
    cy.get('input#edit-quantity').clear().type('90');
    cy.get('.edit-modal form').submit();
    cy.contains('Updated Student').should('exist');
    cy.contains('Price: $75').should('exist');
    cy.contains('Remaining: 90 / 90').should('exist');
  });
});
