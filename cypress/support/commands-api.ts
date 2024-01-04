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
Cypress.Commands.add('getOtp', (username: string, password: string) => {
  return cy
    .request({
      method: 'GET',
      url: `https://api.twilio.com/2010-04-01/Accounts/${username}/Messages.json`,
      auth: {
        username: username,
        password: password,
        AuthMethod: 'BasicAuth',
      },
    })
    .then(response => {
      expect(response.status).to.eq(200)
      return response.body.messages[0].body.substring(0, 6)
    })
})

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
