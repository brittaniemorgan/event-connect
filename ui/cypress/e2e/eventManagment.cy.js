describe('Organizer Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login');
    cy.get('input[type="email"]').type('admin@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('form').submit();
    cy.url().should('include', '/');
    cy.wait(1000);
    cy.get('.nav-link').contains('Organizer Dashboard').click();
    cy.get('.nav-button').contains('Manage Events').click();
  });

  it('should allow adding a new event and display its details', () => {
    cy.get('button').contains('Create Event').click();
    cy.get('input#title').type('Test Event');
    cy.get('input#date').type('2024-12-31');
    cy.get('input#location').type('123 Event St, City, Country');
    cy.get('select#category').select('Technology');
    cy.get('textarea#description').type('This is a description of the new event.');
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:8080/events');
    cy.get('.event-card').last().within(() => {
      cy.get('.btn-details').click();
    });

    cy.get('.event-title').should('contain.text', 'Test Event');
    cy.get('.event-content').within(() => {
      cy.contains('Date:').next().should('contain.text', 'December 31, 2024');
      cy.contains('Location:').next().should('contain.text', '123 Event St, City, Country');
      cy.contains('Category:').next().should('contain.text', 'Technology');
      cy.contains('Description:').next().should('contain.text', 'This is a description of the new event.');
    });

    cy.contains('Status:').next().should('have.class', 'status-upcoming');
    cy.contains('Purchase Ticket').should('be.visible');
  });

  it('should create an event and redirect to tickets page', () => {
    cy.get('button').contains('Create Event').click();
    cy.get('input#title').type('Test Event');
    cy.get('input#date').type('2024-12-31');
    cy.get('input#location').type('123 Event St, City, Country');
    cy.get('select#category').select('Technology');
    cy.get('textarea#description').type('This is a description of the new event.');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '?tickets=true');
    cy.get('select#event').should('contain', 'Test Event');
  });

  it('should edit an event and update its details', () => {
    cy.get('.event-card').first().find('button').contains('Edit').click();
    cy.get('input#title').clear().type('Updated Event Title');
    cy.get('input#date').type('2024-12-24');
    cy.get('input#location').clear().type('456 New Location, City, Country');
    cy.get('textarea#description').type('This is a description of the updated event.');
    cy.get('button[type="submit"]').click();
    cy.get('.event-card').should('contain', 'Updated Event Title');
    cy.get('.event-card').should('contain', '456 New Location, City, Country');
  });

  it('should cancel an event and verify it is marked as cancelled', () => {
    cy.get('.event-card').first().find('button').contains('Cancel').click();
    cy.get('input#cancellationReason').clear().type('Testing out cancelled event functionality');
    cy.get('button').contains('Confirm Cancellation').click();
    cy.get('.event-card').should('contain', 'Status: Cancelled');
  });
});
