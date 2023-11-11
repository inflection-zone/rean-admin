/// <reference types="cypress" />

import login from '../pageObjects/login/login-test';

describe('test', () => {
	it.only('LoginTest', function () {
		cy.visit('http://localhost:5173/');

		cy.fixture('login').then((data) => {
			const ln = new login();
      cy.wait(3000)
			ln.setUserName(data.username);
			ln.setPassword(data.password);
			ln.clickLogin();
		});
    cy.wait(3000)
      cy.get('.app-bar-slot-lead > .flex').click()
      cy.wait(2000)
      // eslint-disable-next-line no-useless-escape
      cy.contains('Types').click()
      cy.wait(2000)
      cy.contains('Priorities').click()
      cy.wait(5000)
      cy.contains('Add New').click()
      cy.wait(2000)
      cy.get('input[name=type]').type('Weight by loss')
      cy.wait(2000)
      cy.get('input[placeholder="Enter a tags here..."]').type('gtags').type('{enter}')
      cy.wait(2000)
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Edit').click()
      cy.wait(2000)
      cy.get('button[type=submit]').click()
      cy.wait(2000)
      cy.contains('Priorities').click()
    })
	});
 

