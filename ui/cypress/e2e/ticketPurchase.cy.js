describe('Ticket Purchase', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/events');
    cy.get('.event-card').contains('Christmas Concert').get('.btn-details').last().click();
    cy.get('button').contains('Purchase Ticket').click();
  });  

  it('should fill out the ticket purchase form and submit', () => {
    cy.get('.modal-overlay').should('be.visible');  
    cy.get('select#ticketId').select('VIP');
    cy.get('#quantity').clear().type('2');
    cy.get('#name').clear().type('John Doe');
    cy.get('#email').clear().type('johndoe@example.com');
    cy.get('#paymentMethod').select('creditCard');

    cy.get('form').submit();

    cy.get('.flash-message').should('contain', 'Ticket purchased successfully.');
    cy.get('.modal-overlay').should('not.exist');
  });
});
