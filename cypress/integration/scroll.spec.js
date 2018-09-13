beforeEach(function () {
  cy.visit('http://localhost:8080')
})
describe('E2E testing', function() {

  it('Applies Transition class!', function() {
    cy.get('[data-testid="react-scroll-up-button"]')
      .should('have.class', 'ScrollUpButton__Container')
    cy.get('[data-testid="react-scroll-up-button"]')
      .should('not.have.class', 'ScrollUpButton__Toggled')
    cy.scrollTo('bottom')
    cy.get('[data-testid="react-scroll-up-button"]')
      .should('have.class', 'ScrollUpButton__Toggled')
  })

  it('can be clicked!', function() {
    cy.scrollTo('bottom')
    cy.get('[data-testid="react-scroll-up-button"]')
      .should('have.class', 'ScrollUpButton__Toggled')
    cy.get('[data-testid="react-scroll-up-button"]').click()
    cy.get('[data-testid="react-scroll-up-button"]')
    .should('not.have.class', 'ScrollUpButton__Toggled')
    cy.window().its('pageYOffset').should('eq',0)
  })

  it('Transitions to the top after clicking', function() {
    cy.window().its('pageYOffset').should('eq',0)
    cy.scrollTo('bottom')
    cy.window().its('pageYOffset').should('not.eq',0)
    cy.get('[data-testid="react-scroll-up-button"]').click()
    cy.window().its('pageYOffset').should('eq',0)
  })

  it('should be visible', function() {
    cy.get('[data-testid="react-scroll-up-button"]')
     .should('not.be.visible')
    cy.scrollTo('bottom')
    cy.get('[data-testid="react-scroll-up-button"]')
    .should('be.visible')
  })
})