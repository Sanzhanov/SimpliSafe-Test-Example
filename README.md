# SimpliSafe-Test-Example 🚀 [![Cypress.io](https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg)](https://www.cypress.io/)

This repository contains example of automated end-to-end tests for registering a new user in the **SimpliSafe** web-app. This is just a very short example of only two smoke tests for positive and negative scenarios, created only to demonstrate the use of _Cypress_ for testing the app.

## Install

- Clone this repository to your local machine.
- Install the required dependencies in the project running command: `npm i`.

## Usage

Before running the tests, I recommend viewing their code in the _spec_ file `cypress/e2e/userRegister.cy.js`. To make the logic easier to understand, some comments have been added to the code.

- I would recommend running the tests in the Cypress test runner to track their execution step by step. To do this, just simply run the `npm run cy:open` command in your terminal. The project settings provide the ability to bypass initial Cypress windows and run tests in the _Chrome_ browser in _incognito mode_.

- To run the tests _headlessly_ use the command `npm run cy:run`. Then in the `cypress/reports` folder that will appear, you can view an html report on the tests run performed by the installed _Cypress Mochawesome reporter_.

- The project also has a workflow file configured for running tests in **_CI_** using _GitHub Actions_ and saving testing artifacts (`.github/workflows/ci.yml`). You can view the runs in the Actions section of this repository.

To receive a _one-time password (OTP)_ via SMS as part of the _Two-factor authentication (2FA)_ workflow, I used the third-party service <a rel="Twilio" href="https://www.twilio.com/en-us">Twilio</a>. Receiving OTP is implemented using an API call and wrapped in a custom command.

> Due to lack of sufficient time, beyond the scope of testing I left checking the data sent by the backend when registering a new user and his further authentication (calls `'token'`, `'authCheck'`, `'loginInfo'`). This could also be the subject of writing API tests for authenticating a registered user in an application.

<div align='center'>

_Happy testing! Thanks for your attention!_

</div>
