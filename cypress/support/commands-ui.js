// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('clickOnElByText', text => {
  cy.contains(text).should('be.visible').click()
})

Cypress.Commands.add('checkEl', selector => {
  cy.get(selector).check({ force: true })
})

Cypress.Commands.add('inputText', (selector, text) => {
  cy.get(selector).should('be.visible').clear().type(text.toString())
})

Cypress.Commands.add('verifyTextOfEl', (selector, text) => {
  cy.get(selector).should('be.visible').and('contain.text', text)
})

Cypress.Commands.add('verifyUrl', endpoint => {
  cy.url().should('include', endpoint)
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
