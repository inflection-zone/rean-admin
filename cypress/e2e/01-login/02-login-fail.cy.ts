/// <reference types="cypress" />

import login from "../pageObjects/login/login-test-fail";

describe('test', () => {

  it.only('LoginTest', function() {
    cy.visit('http://localhost:5173/')

    cy.fixture('login-fail').then((data) => {
    const ln = new login();
    ln.setUserName(data.username)
    ln.setPassword(data.password)
    ln.clickLogin();
    })
  })
})
