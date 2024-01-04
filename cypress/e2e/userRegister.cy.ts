import { testUser } from '../helpers/testData'
import { buttons, itemNames, messages, urlEndPoints, headerText } from '../helpers/names'
import { signUpForm, errorEl, headers } from '../helpers/selectors'
import { apiUrl } from '../helpers/apiUrl'
import { ObjectOfStrings, User, SignUp } from '../helpers/interfaces'

const registerNewUser = (selector: SignUp, data: User): void => {
  let userCredentials: ObjectOfStrings = {}
  //filling out the user registration form
  for (let key in selector) {
    switch (key) {
      case 'saveCode':
        cy.checkEl(selector[key])
        break
      case 'code':
        //waiting for SMS OTP text message and extracting verification code
        cy.wait(3000)
        cy.getOtp(Cypress.env('accountSid'), Cypress.env('authToken')).then(otp => {
          cy.inputText(selector[key], otp)
        })
        break
      default:
        cy.inputText(selector[key], data[key])
        userCredentials[key] = data[key]
    }
    cy.clickOnElByText(buttons.continue)
  }
  //interception and aliasing API call with response containing Bearer token
  cy.intercept('POST', apiUrl.token).as('signUp')
  cy.clickOnElByText(itemNames.refusal)
  //veryfying successful registration
  cy.wait('@signUp').its('response.statusCode').should('eq', 200)
  //extracting Bearer token returned from backend and add it to user credentials
  cy.get('@signUp')
    .its('response.body')
    .then(body => {
      userCredentials['token'] = body.access_token
      //writing valid user credentials in fixture file for future use
      cy.writeFile('cypress/fixtures/registeredUser.json', userCredentials)
    })
}

describe('User Registration Flow', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.clickOnElByText(itemNames.signUp)
  })

  context('Positive Scenarios', () => {
    it('TC1 - should successfully registered a new user with valid credentials', () => {
      registerNewUser(signUpForm, testUser)
      //verifying url
      cy.verifyUrl(urlEndPoints.dashboardEndpoint)
      //verifying main header with greeting sign
      cy.verifyTextOfEl(headers.mainHeader, headerText.dashboardHeader)
    })
  })

  context('Negative Scenarios', () => {
    it.only('TC2 - should prevent registration of an existing user', () => {
      cy.fixture('registeredUser').then(user => {
        //partial filling out the user registration form
        cy.inputText(signUpForm.email, user.email)
        cy.clickOnElByText(buttons.continue)
        cy.inputText(signUpForm.password, user.password)
        cy.clickOnElByText(buttons.continue)
        //error verification
        cy.verifyTextOfEl(errorEl.email, messages.errorMessages.invalidUser)
      })
    })

    //other tests for possible negative scenarios...
  })
})
